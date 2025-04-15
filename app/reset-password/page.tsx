import { PasswordReset } from '@/components/auth/PasswordReset';

interface ResetPasswordPageProps {
  searchParams: {
    id?: string;
    token?: string;
  };
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { id, token } = searchParams;
  const hasResetParams = id && token;

  return (
    <div className="container mx-auto max-w-md py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {hasResetParams ? 'Réinitialiser votre mot de passe' : 'Mot de passe oublié'}
      </h1>

      {hasResetParams ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4 text-sm text-gray-600">
            Veuillez entrer votre nouveau mot de passe ci-dessous.
          </p>
          <PasswordReset customerId={id} resetToken={token} />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4 text-sm text-gray-600">
            Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe.
          </p>
          <PasswordReset />
        </div>
      )}
    </div>
  );
}
