# Portfolio — Data Scientist

Portfolio one-page inspiré de la structure du portfolio de Zain Ahmad Fahrezi
(nav flottante, hero plein écran, sections About / Skills / Projects /
Experience / Contact, animations au scroll), mais avec un code et un contenu
**originaux**, et une direction visuelle orientée data science / IA :

- **Élément signature** : un nuage de points 3D en arrière-plan du hero,
  façon projection d'embeddings (t-SNE / PCA), avec 3 "clusters" colorés,
  axes et grille, rotation automatique + rotation à la souris (Three.js).
  Il s'adapte aussi au mode clair/sombre.
- **Mode clair / sombre** : bouton soleil/lune dans la nav, préférence
  mémorisée (localStorage) et détection de la préférence système au premier
  chargement.
- **Palette** : fond quasi-noir bleuté, accent principal **violet**, avec
  ambre et rose en accents secondaires (plus de turquoise).
- **Photo / vidéo de présentation** dans le hero, à droite du nom : une
  photo par défaut, ou une vidéo qui se lance automatiquement (en muet,
  contrainte des navigateurs) à l'ouverture du portfolio, avec un bouton
  "Activer le son". Idéal pour un avatar parlant généré par IA
  (HeyGen, D-ID, Synthesia...) à partir de ta photo + ta voix, qui dit par
  exemple "Hello, I'm ..., a data science enthusiast...".
- **Typographie** : Space Grotesk (titres), Inter (texte courant),
  JetBrains Mono (métriques, labels, terminal).
- **Sections** pensées "data" : About en forme de *model card*, Skills en
  badges avec indicateur de niveau (sans pourcentage), Certifications avec
  aperçu + téléchargement du PDF, Projects avec fiche détaillée en modal
  (capture d'écran, tags, Live Demo, Source Code), Experience en journal de
  bord, Contact en terminal.
- **Bouton "CV"** dans la nav, qui télécharge `public/cv.pdf`.

## Stack

React 19 + Vite, Tailwind CSS v4, Framer Motion (animations), Three.js
(scène 3D du hero), lucide-react (icônes).

## Démarrer en local

```bash
npm install
npm run dev
```

Puis ouvrir l'URL affichée (par défaut http://localhost:5173).

## Build de production

```bash
npm run build
npm run preview   # pour tester le build localement
```

Le dossier `dist/` généré peut être déployé tel quel sur Vercel, Netlify,
GitHub Pages, etc.

## Personnaliser le contenu

Tout le texte est centralisé dans un seul fichier :
`src/data/content.js`. Modifie ton nom, ta bio, tes compétences, tes projets,
tes certifications, ton expérience et tes liens sociaux à cet endroit —
aucun autre fichier n'a besoin d'être touché pour changer le contenu.

- **CV** : remplace `public/cv.pdf` par ton vrai CV (même nom de fichier,
  ou change `profile.resumeUrl` dans `content.js`).
- **Photo** : remplace `public/profile/avatar-placeholder.svg` par ta
  photo (ex. `public/profile/photo.jpg`) et mets à jour `profile.photo`
  dans `content.js`. Cadrage portrait conseillé (ratio ~3:4).
- **Vidéo de présentation** : dépose ton fichier (ex.
  `public/profile/intro.mp4`) et renseigne `profile.introVideo` dans
  `content.js` avec ce chemin (laisse `null` pour n'afficher que la photo).
  Cette vidéo n'est pas générée par ce projet : enregistre-toi, ou génère
  un avatar parlant avec un outil comme HeyGen, D-ID ou Synthesia à partir
  de ta photo et d'un script (ex. "Hello, I'm Yasmine, a data science and
  AI enthusiast who loves turning data into decisions. Welcome to my
  portfolio."), puis exporte le .mp4 ici.

  **Son automatique** : le site tente de lancer la vidéo avec le son dès
  le chargement ; si le navigateur du visiteur bloque cette tentative
  (règle de sécurité qu'aucun site ne peut totalement contourner), elle
  bascule automatiquement en muet avec un petit bouton "Activer le son".

  **Fond transparent** : pour que ton visage apparaisse directement sur le
  fond du portfolio (sans rectangle blanc/studio autour), exporte ta vidéo
  en **WebM avec canal alpha**. Une balise `<video>` HTML l'affiche nativement
  en transparence, sans code supplémentaire. Si ton outil d'avatar ne
  propose pas cet export, passe la vidéo dans un service de suppression de
  fond vidéo (ex. unscreen.com) qui exporte directement en WebM
  transparent, puis renseigne ce fichier (ex. `/profile/me.webm`) dans
  `introVideo`.
- **Certifications** : remplace les fichiers dans `public/certificates/`
  (une image pour l'aperçu + un PDF pour le téléchargement) et mets à jour
  `certifications` dans `content.js` (`image`, `fileUrl`, `title`, `issuer`,
  `date`).
- **Captures de projets** : remplace les fichiers dans `public/projects/`
  par de vraies captures d'écran de tes projets, et mets à jour le champ
  `image` de chaque projet dans `content.js`.

## Personnaliser le design

- Couleurs, polices, tokens (mode sombre) : `src/index.css` (bloc `@theme`).
- Couleurs du mode clair : `src/index.css`
  (bloc `:root[data-theme="light"]`).
- Nuage de points 3D du hero : `src/components/EmbeddingScene.jsx`
  (nombre de clusters, couleurs, dispersion, vitesse de rotation).
- Le formulaire de contact (`src/components/Contact.jsx`) est un
  placeholder sans backend : branche un service comme Formspree, EmailJS,
  ou ta propre API dans `handleSubmit`.

## Structure

```
src/
  data/content.js         -> tout le contenu texte (+ certifications, CV)
  context/ThemeContext.jsx -> mode clair/sombre
  components/
    Nav.jsx                -> nav flottante, scroll-spy, CV, theme toggle
    Hero.jsx                -> hero + effet machine a ecrire
    EmbeddingScene.jsx      -> scene 3D (element signature, adapte au theme)
    Reveal.jsx              -> wrapper d'animation au scroll
    Modal.jsx               -> modale reutilisable (flip a l'ouverture)
    About.jsx, Skills.jsx, Certifications.jsx, Projects.jsx,
    Experience.jsx, Contact.jsx, Footer.jsx, CursorGlow.jsx, ThemeToggle.jsx
  App.jsx, main.jsx, index.css
public/
  cv.pdf                   -> CV telechargeable (placeholder a remplacer)
  certificates/            -> images d'apercu + PDF des certifications
  projects/                -> captures d'ecran des projets (placeholders)
```
