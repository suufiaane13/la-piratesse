# La Piratesse

Landing page one-page pour le roman **La Piratesse** de Gérard Hubert-Richou (collection Lire c'est partir). Présentation du livre, des personnages, du résumé et des thèmes, avec une identité visuelle adaptée aux jeunes lecteurs (~11 ans).

## Stack

- **React 19** + **Vite 7**
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **Lucide React** (icônes)

## Prérequis

- Node.js 18+
- npm (ou pnpm / yarn)

## Installation

```bash
npm install
```

## Scripts

| Commande        | Description                |
|-----------------|----------------------------|
| `npm run dev`   | Lance le serveur de dev    |
| `npm run build` | Build de production (`dist`) |
| `npm run preview` | Prévisualise le build    |
| `npm run lint`  | Vérification ESLint        |

## Déploiement (Netlify)

Le projet est prêt pour Netlify :

- **Build** : `npm run build`
- **Dossier à publier** : `dist`
- Un fichier `netlify.toml` et `public/_redirects` gèrent la redirection SPA (toutes les routes → `index.html`).

Connecter le dépôt à Netlify ou déployer manuellement en pointant sur `dist` après un build.

## Structure du site

- **Hero** — Couverture, titre, sous-titre (animation flip, hover/click pour couverture sans fond)
- **Fiche du livre** — Métadonnées (titre, auteur, éditeur, genre, public)
- **Auteur & inspiratrice** — Gérard Hubert-Richou et Louise Antonini
- **Personnages principaux** — Cartes des personnages
- **Résumé** — Intro + 5 actes en accordéons (grille 2 colonnes tablette/desktop)
- **Thèmes & messages** — 5 thèmes en accordéons + citation morale avec tooltip
- **Footer** — Éditeur, lien Lire c'est partir

Contenu centralisé dans `src/data/content.js` (hero, bookInfo, summaryActs, characters, themes, author, louiseAntonini, glossaire, etc.).

## Design

- **Public** : enfants ~11 ans, parents, enseignants.
- **Couleurs** : jaune doré (#F5C518), rouge pirate (#C0392B), brun bois (#8B5E3C), noir encre (#1A1A1A), blanc cassé (#F8F4EC).
- **Typo** : Cinzel Decorative (titres), Playfair Display (sous-titres / citations), Lora (corps), Space Mono (labels).
- **Accessibilité** : lien « Aller au contenu », tooltips clavier/tactile, `prefers-reduced-motion` respecté.

## Licence

Projet privé — © Lire c'est partir / auteur.
