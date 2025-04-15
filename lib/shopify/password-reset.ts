import { shopifyFetch } from './shopify-fetch';
import { getPasswordResetRedirectUrl } from './shopify-config';

interface CustomerResetInput {
  password: string;
  resetToken: string;
}

interface CustomerResetResponse {
  customerReset: {
    customer: {
      id: string;
      email: string;
    };
    customerAccessToken: {
      accessToken: string;
    };
    customerUserErrors: Array<{
      field: string;
      message: string;
    }>;
  };
}

export async function requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  const redirectUrl = getPasswordResetRedirectUrl();

  const mutation = `
    mutation customerRecover($email: String!, $redirectUrl: String) {
      customerRecover(email: $email, redirectUrl: $redirectUrl) {
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({
      query: mutation,
      variables: {
        email,
        redirectUrl
      },
    });

    if (response.customerRecover?.customerUserErrors?.length > 0) {
      return {
        success: false,
        error: response.customerRecover.customerUserErrors[0].message,
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    return {
      success: false,
      error: 'Une erreur est survenue lors de la demande de réinitialisation',
    };
  }
}

export async function resetPassword(
  customerId: string,
  input: CustomerResetInput
): Promise<{ success: boolean; error?: string; accessToken?: string }> {
  const mutation = `
    mutation customerReset($id: ID!, $input: CustomerResetInput!) {
      customerReset(id: $id, input: $input) {
        customer {
          id
          email
        }
        customerAccessToken {
          accessToken
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<CustomerResetResponse>({
      query: mutation,
      variables: {
        id: customerId,
        input,
      },
    });

    if (response.customerReset?.customerUserErrors?.length > 0) {
      return {
        success: false,
        error: response.customerReset.customerUserErrors[0].message,
      };
    }

    return {
      success: true,
      accessToken: response.customerReset.customerAccessToken.accessToken,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Une erreur est survenue lors de la réinitialisation du mot de passe',
    };
  }
}

/**
 * Extrait l'ID du client et le token de réinitialisation à partir du lien reçu par email
 * @param resetLink Le lien de réinitialisation reçu par email
 * @returns Un objet contenant l'ID du client et le token de réinitialisation, ou null si le lien est invalide
 */
export function extractResetParams(resetLink: string): { customerId: string; resetToken: string } | null {
  try {
    console.log('Traitement du lien de réinitialisation:', resetLink);

    // Le lien Shopify contient généralement un paramètre "l" qui est encodé en base64
    const url = new URL(resetLink);
    const encodedParam = url.searchParams.get('l');

    if (!encodedParam) {
      console.error('Paramètre "l" non trouvé dans le lien');
      return null;
    }

    // Décoder le paramètre
    const decodedParam = decodeURIComponent(encodedParam);
    console.log('Paramètre décodé:', decodedParam);

    // Le format du paramètre décodé est généralement: base64(token) + ":" + base64(customerId)
    // Mais il peut aussi être un objet JSON encodé en base64
    try {
      // Essayer de décoder comme JSON
      const jsonStr = atob(decodedParam);
      const jsonData = JSON.parse(jsonStr);

      if (jsonData.token && jsonData.id) {
        return {
          customerId: jsonData.id,
          resetToken: jsonData.token
        };
      }
    } catch (jsonError) {
      console.log('Le paramètre n\'est pas un JSON valide, essai d\'un autre format');
    }

    // Essayer le format token:id
    const parts = decodedParam.split(':');

    if (parts.length === 2) {
      try {
        // Décoder les parties en base64
        const resetToken = atob(parts[0]);
        const customerId = atob(parts[1]);

        return { customerId, resetToken };
      } catch (base64Error) {
        console.error('Erreur lors du décodage base64:', base64Error);
      }
    }

    // Si nous arrivons ici, nous n'avons pas pu extraire les paramètres
    console.error('Format de lien non reconnu');
    return null;
  } catch (error) {
    console.error('Erreur lors de l\'extraction des paramètres de réinitialisation:', error);
    return null;
  }
}

/**
 * Génère un lien de réinitialisation de mot de passe personnalisé
 * @param customerId L'ID du client
 * @param resetToken Le token de réinitialisation
 * @returns Un lien de réinitialisation personnalisé
 */
export function generateResetLink(customerId: string, resetToken: string): string {
  const redirectUrl = getPasswordResetRedirectUrl();
  return `${redirectUrl}?id=${encodeURIComponent(customerId)}&token=${encodeURIComponent(resetToken)}`;
}
