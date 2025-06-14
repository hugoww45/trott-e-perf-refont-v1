# IntroGate - Page d'intro animée

## Description
L'IntroGate est une page d'introduction animée qui s'affiche uniquement lors de la première visite d'un utilisateur sur le site Trott e-Perf.

## Fonctionnalités

### ✨ Animations
- **Effet de construction** : Le bouton "🚀 Accéder au site" apparaît avec un effet de construction holographique
- **Effet fusée au survol** : Animation de décollage progressive qui reste en position élevée avec léger tremblement
- **Fondu de transition rapide** : Effet de fondu noir accéléré lors du clic
- **Confettis argentés** : Explosion de confettis dans les couleurs argentées demandées
- **Transition fluide** : Passage rapide vers le site principal

### 🔐 Gestion des cookies
- **Cookie `seenIntro`** : Stocké pendant 1 an
- **Affichage unique** : L'intro ne s'affiche qu'une seule fois par utilisateur
- **Skip automatique** : Si le cookie existe, affichage direct du site

### 🎨 Design
- **Reprend exactement** le design de la page `/coming-soon`
- **Fond sombre premium** avec effets visuels
- **Typographie argentée** avec le système de classes existant
- **Responsive** : Adapté aux mobiles et desktop

## Utilisation

### Pour les tests
Un bouton "Reset Intro" est disponible en bas à droite pendant le développement pour effacer le cookie et retester l'intro.

### En production
Retirez le composant `ResetIntroButton` du `layout.tsx` :

```typescript
// Retirer cette ligne pour la production
import ResetIntroButton from '@/components/ResetIntroButton'

// Et retirer cette ligne aussi
<ResetIntroButton />
```

## Structure des fichiers

```
components/
├── IntroGate.tsx          # Composant principal
└── ResetIntroButton.tsx   # Utilitaire de test (à retirer en prod)

app/
├── layout.tsx             # Intégration de l'IntroGate
└── globals.css            # Styles des animations glitch
```

## Dépendances
- `canvas-confetti` : Pour les effets de confettis
- `@types/canvas-confetti` : Types TypeScript

## Timing des animations
1. **Chargement** : Apparition du bouton avec effet de construction (2s)
2. **Clic** : Début du fondu rapide (immédiat)
3. **Confettis** : Déclenchement après 500ms
4. **Transition** : Fin complète après 1.8s (optimisé)

## Configuration
Toutes les couleurs de confettis et timings sont configurables dans le composant `IntroGate.tsx`.

## Performance
- **Lazy loading** : Le composant ne se charge que si nécessaire
- **Cleanup automatique** : Suppression des timers et animations
- **Cache optimisé** : Utilisation du système de cookies natif
