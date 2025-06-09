"use client"

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface PasswordStrengthProps {
  password: string
  className?: string
}

interface StrengthResult {
  score: number
  label: string
  color: string
  suggestions: string[]
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const strength = useMemo(() => {
    return calculatePasswordStrength(password)
  }, [password])

  if (!password) return null

  return (
    <div className={cn("space-y-2", className)}>
      {/* Barre de progression */}
      <div className="flex space-x-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn(
              "h-2 flex-1 rounded-full transition-colors duration-200",
              level <= strength.score
                ? strength.color
                : "bg-gray-200"
            )}
          />
        ))}
      </div>

      {/* Label de force */}
      <div className="flex items-center justify-between">
        <span className={cn(
          "text-sm font-medium",
          strength.score === 1 && "text-red-600",
          strength.score === 2 && "text-orange-600",
          strength.score === 3 && "text-yellow-600",
          strength.score === 4 && "text-green-600"
        )}>
          {strength.label}
        </span>
        <span className="text-xs text-gray-500">
          {password.length}/8+ caractères
        </span>
      </div>

      {/* Suggestions d'amélioration */}
      {strength.suggestions.length > 0 && strength.score < 4 && (
        <div className="space-y-1">
          {strength.suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function calculatePasswordStrength(password: string): StrengthResult {
  if (!password) {
    return {
      score: 0,
      label: '',
      color: '',
      suggestions: []
    }
  }

  let score = 0
  const suggestions: string[] = []

  // Critères de validation
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  const hasGoodLength = password.length >= 12

  // Calcul du score
  if (hasMinLength) score++
  if (hasUpperCase && hasLowerCase) score++
  if (hasNumbers) score++
  if (hasSpecialChars) score++

  // Bonus pour longueur
  if (hasGoodLength) score = Math.min(score + 1, 4)

  // Suggestions d'amélioration
  if (!hasMinLength) {
    suggestions.push('Au moins 8 caractères')
  }
  if (!hasUpperCase || !hasLowerCase) {
    suggestions.push('Majuscules et minuscules')
  }
  if (!hasNumbers) {
    suggestions.push('Au moins un chiffre')
  }
  if (!hasSpecialChars) {
    suggestions.push('Caractères spéciaux (!@#$%...)')
  }
  if (!hasGoodLength && score >= 3) {
    suggestions.push('12+ caractères pour plus de sécurité')
  }

  // Détermination du label et de la couleur
  let label = ''
  let color = ''

  switch (score) {
    case 0:
    case 1:
      label = 'Très faible'
      color = 'bg-red-500'
      break
    case 2:
      label = 'Faible'
      color = 'bg-orange-500'
      break
    case 3:
      label = 'Moyen'
      color = 'bg-yellow-500'
      break
    case 4:
      label = 'Fort'
      color = 'bg-green-500'
      break
  }

  return {
    score,
    label,
    color,
    suggestions
  }
}

// Hook utilitaire pour valider un mot de passe
export function usePasswordValidation(password: string) {
  return useMemo(() => {
    const strength = calculatePasswordStrength(password)
    return {
      isValid: strength.score >= 2 && password.length >= 8,
      strength,
      errors: strength.suggestions
    }
  }, [password])
}
