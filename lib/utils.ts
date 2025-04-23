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
  // Si vide, retourner une chaîne vide
  if (!phone || phone.trim() === '') {
    return '';
  }

  // Supprime tous les caractères non numériques et le + (on le rajoutera après)
  let cleaned = phone.replace(/[^0-9]/g, '');

  // Pour les numéros français
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    // Remplacer le 0 initial par 33
    cleaned = '33' + cleaned.substring(1);
  }
  // Si le numéro commence déjà par 33 et a la bonne longueur
  else if (cleaned.startsWith('33') && cleaned.length === 11) {
    // On le laisse tel quel
  }
  // Si le numéro a 9 chiffres et commence probablement par un 6 ou 7 (mobile français)
  else if ((cleaned.startsWith('6') || cleaned.startsWith('7')) && cleaned.length === 9) {
    cleaned = '33' + cleaned;
  }

  // Ajouter le + au début
  return '+' + cleaned;
}
