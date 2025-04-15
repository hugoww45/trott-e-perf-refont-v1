import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: string, currencyCode: string) {
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currencyCode,
  })

  return formatter.format(parseFloat(amount))
}

/**
 * Formate un numéro de téléphone au format international
 * @param phone Le numéro de téléphone à formater
 * @returns Le numéro formaté (ex: +33612345678)
 */
export function formatPhoneNumber(phone: string): string {
  // Supprime tous les caractères non numériques
  let cleaned = phone.replace(/\D/g, '')

  // Si le numéro ne commence pas par +, ajouter +33 (France)
  if (cleaned.length > 0 && !phone.startsWith('+')) {
    // Si commence par 0, remplacer par +33
    if (cleaned.startsWith('0')) {
      cleaned = '33' + cleaned.substring(1)
    } else {
      cleaned = '33' + cleaned
    }
  }

  // Ajouter le + si nécessaire
  if (cleaned.length > 0 && !cleaned.startsWith('+')) {
    cleaned = '+' + cleaned
  }

  return cleaned
}
