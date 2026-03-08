# 📋 PRD — Site Web « La Piratesse »
**Version** : 1.0  
**Date** : Mars 2026  
**Stack** : React + Vite · TailwindCSS · Mobile-first

---

## 1. Vue d'ensemble

### 1.1 Objectif produit
Créer une **landing page éditoriale immersive** présentant le roman *La Piratesse* de Gérard Hubert-Richou (éditions Lire c'est partir). Le site doit donner envie de lire le livre, informer sur l'œuvre et son auteur, et refléter l'univers maritime/aventurier du roman.

### 1.2 Public cible
| Segment | Comportement attendu |
|---|---|
| Enfants 10–14 ans | Navigation tactile, visuels forts, textes courts |
| Parents & enseignants | Recherche d'infos fiables sur le livre, thèmes pédagogiques |
| Bibliothécaires / libraires | Fiche complète pour recommandation ou commande |

### 1.3 Métriques de succès
- Temps moyen sur page : **> 2 min**
- Scroll depth moyen : **> 70 %**
- Clics sur le CTA « Acheter / Découvrir » : **> 15 %** des visiteurs

---

## 2. Identité visuelle & Design System

### 2.1 Aesthetic Direction — *"Carte au trésor éditoriale"*
Mélange entre un **vieux parchemin marin** et une **couverture de magazine jeunesse haut de gamme**. Contraste marqué entre des fonds profonds (bleu nuit océan, brun sépia) et des accents lumineux (or antique, ambre chaud). Tout le design évoque la mer, l'aventure et le XVIIIe siècle — sans tomber dans le kitsch.

### 2.2 Palette de couleurs
```css
--color-blue:     #1857A3;   /* Bleu pro — bleu medium soutenu */
--color-green:    #23A479;   /* Vert pro — vert riche et équilibré */
--color-white:    #F7FAFE;   /* Blanc pro — clair et net, subtil ton bleuté */
--color-red:      #CA3535;   /* Rouge pro — rouge franc, profond et dynamique */
```
/* Conseil : combinez ces couleurs avec accents doré/marine pour une palette raffinée */

### 2.3 Typographie
| Rôle | Police | Usage |
|---|---|---|
| Display / Titres | **Cinzel Decorative** (Google Fonts) | Hero, nom du livre, titres de section |
| Sous-titres | **Playfair Display Italic** | Sous-titres, citations, noms des personnages |
| Corps | **Lora** | Paragraphes, résumé, descriptions |
| Labels / Badges | **Space Mono** | Métadonnées, tags, numéros de page |

### 2.4 Iconographie & ornements
- Icônes Lucide React pour les métadonnées (livre, auteur, genre…)
- Séparateurs de section : **lignes ornementales SVG** style cartographie maritime
- Textures de fond : **bruit CSS grain** subtil sur les fonds sombres
- Éléments décoratifs : ancres, rose des vents, vagues stylisées (SVG inline)

### 2.5 Effets & animations
- **Page load** : fade-in staggeré (hero → métadonnées → sections) avec `animation-delay`
- **Scroll reveal** : chaque section apparaît avec un `translateY` + `opacity` au scroll (`IntersectionObserver`)
- **Hover cards** (personnages) : élévation + bordure dorée animée
- **Parallax léger** sur l'image hero (CSS `transform` sur scroll)
- Aucune animation non essentielle sur mobile bas de gamme (respecter `prefers-reduced-motion`)

---

## 3. Architecture & Structure des pages

### 3.1 Route unique (SPA one-page)
```
/
├── <Header>        Navigation sticky + logo
├── <HeroSection>   Accroche visuelle principale
├── <BookInfo>      Fiche technique du livre
├── <Summary>       Résumé narratif
├── <Characters>    Galerie des personnages
├── <Themes>        Thèmes & messages du livre
├── <AuthorSection> Auteur + inspiratrice historique
├── <Moral>         Citation finale
└── <Footer>        Liens + crédits
```

### 3.2 Navigation
- **Header sticky** avec logo + ancres de navigation (masqué sur mobile, hamburger menu)
- Smooth scroll vers chaque section
- Indicateur de section active dans la nav (highlight doré)

---

## 4. Spécifications des composants

### 4.1 `<HeroSection>`
**Contenu :**
- Image de couverture du livre (grand format, ombre portée)
- Titre principal : *La Piratesse* (Cinzel Decorative, très grand)
- Sous-titre : *"Librement inspiré de la vie de Louise Antonini (1771–1861)"*
- Badge collection : *Lire c'est partir*
- CTA principal : **« Découvrir le livre »** (bouton doré)
- Fond : dégradé océan avec texture grain

**Layout mobile :** colonne centrée, image en haut  
**Layout tablette :** colonne centrée, image + texte côte à côte

---

### 4.2 `<BookInfo>` — Fiche technique
**Contenu :** grille de métadonnées avec icônes

| Champ | Valeur |
|---|---|
| Titre | La Piratesse |
| Auteur | Gérard Hubert-Richou |
| Illustrateur | Antoane Rivalan |
| Éditeur | Lire c'est partir |
| Genre | Roman historique / Aventure |
| Public | À partir de 10 ans |
| Pages | 155 pages |

**Layout :** grille `2 colonnes` sur mobile · `3–4 colonnes` sur tablette  
**Style :** cards semi-transparentes sur fond ocean, bordure dorée subtile

---

### 4.3 `<Summary>` — Résumé
**Contenu :** paragraphes du résumé découpés en **actes narratifs** visuels

| Acte | Titre affiché | Icône |
|---|---|---|
| 1 | L'appel de la mer | 🌊 |
| 2 | Le déguisement | 🎭 |
| 3 | La Revanche | ⚓ |
| 4 | Les épreuves | ⚔️ |
| 5 | La capitaine | 🏴‍☠️ |

**Layout :** timeline verticale sur mobile · timeline horizontale sur tablette  
**Interaction :** clic/tap sur un acte → expand pour lire le détail

---

### 4.4 `<Characters>` — Personnages
**Contenu :** 4 cards (Louise, Léonce, Le Capitaine, L'Équipage)

Chaque card contient :
- Emoji / illustration symbolique
- Nom + alias
- Rôle (1 ligne)
- Description (2–3 lignes)

**Layout :** scroll horizontal (swipe) sur mobile · grille 2×2 sur tablette  
**Animation :** hover → élévation + glow doré

---

### 4.5 `<Themes>` — Thèmes & messages
**Contenu :** 5 thèmes du roman

| # | Thème | Icône |
|---|---|---|
| 1 | Liberté & dépassement de soi | 💪 |
| 2 | Aventure & courage | 🏴‍☠️ |
| 3 | Ruse plutôt que violence | 🧠 |
| 4 | Égalité femmes / hommes | 🌍 |
| 5 | Histoire vraie derrière la fiction | 📜 |

**Layout :** liste accordéon sur mobile · grille 2–3 colonnes sur tablette  
**Style :** fond parchment clair sur les cards ouvertes, contraste élevé

---

### 4.6 `<AuthorSection>` — Auteur & inspiratrice
**Contenu :** deux blocs distincts

**Bloc Auteur :**
- Nom, spécialité, description
- Badge : *Littérature jeunesse*

**Bloc Louise Antonini :**
- Dates de vie : 1771–1861
- Lieu de naissance : Ajaccio, Corse
- Faits historiques clés
- Badge : *Figure historique réelle*

**Layout :** stack vertical sur mobile · 2 colonnes sur tablette  
**Style :** carte "parchemin" avec ornements latéraux

---

### 4.7 `<Moral>` — Citation finale
**Contenu :**
> *« Jamais ne dois désespérer, il faut combattre jusqu'au dernier. »*

**Style :** pleine largeur, grande typographie Playfair Italic, fond océan, ligne ornementale au-dessus/dessous  
**Animation :** apparition avec fade-in + légère montée au scroll

---

### 4.8 `<Footer>`
- Nom de l'éditeur + lien
- Crédits auteur / illustrateur
- Mention légale : *"Site non officiel à vocation éducative"*
- Logo ancre SVG

---

## 5. Responsive Breakpoints

| Breakpoint | Largeur | Comportement |
|---|---|---|
| `xs` | < 475px | Mobile portrait — stack complet, textes réduits |
| `sm` | 475–639px | Mobile paysage — légèrement aéré |
| `md` | 640–1023px | **Tablette** — cible principale, grilles 2 col |
| `lg` | ≥ 1024px | Desktop — grilles 3 col, parallax activé |

> **Priorité absolue : md (tablette) et xs/sm (mobile)**

---

## 6. Stack technique détaillée

```
react@18         — UI components
vite@5           — Bundler + HMR
tailwindcss@3    — Utility-first CSS
lucide-react     — Icônes SVG
@fontsource/…    — Fonts self-hosted (Cinzel, Playfair, Lora, Space Mono)
```

### 6.1 Structure des fichiers
```
src/
├── components/
│   ├── Header.jsx
│   ├── HeroSection.jsx
│   ├── BookInfo.jsx
│   ├── Summary.jsx
│   ├── Characters.jsx
│   ├── Themes.jsx
│   ├── AuthorSection.jsx
│   ├── Moral.jsx
│   └── Footer.jsx
├── hooks/
│   └── useScrollReveal.js     — IntersectionObserver hook
├── data/
│   └── content.js             — Toutes les données statiques centralisées
├── assets/
│   └── ornaments.svg          — Éléments décoratifs
├── App.jsx
├── main.jsx
└── index.css                  — Variables CSS + base styles
```

### 6.2 `tailwind.config.js` — extensions
```js
theme: {
  extend: {
    colors: { ocean, deepSea, gold, amber, parchment, fog, coral },
    fontFamily: { cinzel, playfair, lora, mono },
    backgroundImage: { 'grain': "url(...)" }
  }
}
```

---

## 7. Accessibilité (a11y)

| Critère | Exigence |
|---|---|
| Contraste texte/fond | ≥ 4.5:1 (WCAG AA) |
| Navigation clavier | Focus visible sur tous les éléments interactifs |
| Balises sémantiques | `<main>`, `<section>`, `<nav>`, `<article>`, `<aside>` |
| `alt` sur images | Toutes les images avec description |
| `aria-label` | Sur les boutons icônes et les accordéons |
| `prefers-reduced-motion` | Animations désactivées si demandé par l'OS |

---

## 8. Performance

| Objectif | Cible |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s sur mobile 4G |
| CLS (Cumulative Layout Shift) | < 0.1 |
| FID / INP | < 200ms |
| Poids total du bundle JS | < 150 KB gzippé |
| Images | WebP + `loading="lazy"` sur images hors hero |

**Optimisations :**
- Fonts chargées via `@fontsource` (self-hosted, pas de roundtrip Google)
- SVG ornements inline (pas de requêtes réseau)
- Animations via CSS (`transform`, `opacity`) — pas de `top/left` (pas de reflow)

---

## 9. Plan d'implémentation

| Phase | Tâches | Durée estimée |
|---|---|---|
| **Setup** | Init Vite + Tailwind + fonts + variables CSS | 1h |
| **Fondations** | App.jsx, Header, Footer, data/content.js | 1h |
| **Core sections** | Hero, BookInfo, Summary, Moral | 2h |
| **Rich sections** | Characters, Themes, AuthorSection | 2h |
| **Animations** | useScrollReveal, parallax, stagger hero | 1h |
| **Polish** | Ornements SVG, grain, responsive fine-tuning | 1h |
| **QA** | Tests mobile/tablette, a11y, perf | 1h |

**Total estimé : ~9h de développement**

---

## 10. Hors scope (v1)

- Internationalisation (FR seulement)
- Backend / base de données
- Système de commentaires
- Intégration boutique (lien externe vers l'éditeur uniquement)
- Mode sombre / clair (thème océan sombre uniquement en v1)

---

*Document rédigé pour guider le développement frontend de la landing page « La Piratesse ». Toutes les décisions de design sont guidées par l'univers du roman et la cible jeunesse/famille.*