# CV en ligne — Alexis CHESNEAU

Site vitrine « CV en ligne » au thème cyber / tech : fond de particules interactif, nom tapé à la machine à écrire, faux terminal, frise chronologique animée, cartes en tilt 3D…

**Stack :** Vite · React · TypeScript · Tailwind CSS v4 · Framer Motion · tsParticles · lucide-react
100 % statique, sans backend.

---

## 🚀 Démarrage rapide

Prérequis : **Node.js 22** ou plus récent.

```bash
npm install        # installe les dépendances
npm run dev        # lance le site en local → http://localhost:5173
npm run build      # vérifie les types + génère le site final dans dist/
npm run preview    # sert le dossier dist/ pour tester le build
```

---

## ✏️ Modifier le contenu

**Tout le texte du site se trouve dans un seul fichier : [`src/data/cv.ts`](src/data/cv.ts).**
Pas besoin de toucher aux composants.

| Je veux…                         | Où ?                                              |
| -------------------------------- | ------------------------------------------------- |
| Changer mon titre, mon accroche  | `profile`                                         |
| Ajouter mon LinkedIn             | `contact.linkedin` (le lien est masqué s'il est vide) |
| Modifier les rôles qui défilent  | `profile.roles`                                   |
| Modifier le terminal du hero     | `terminal`                                        |
| Ajouter une compétence           | `skills` → `items` de la bonne catégorie          |
| Ajouter une expérience           | `experiences` (ordre du tableau = ordre affiché)  |
| Modifier le titre / la description Google | `site`                                   |

Les icônes s'indiquent par une clé texte (`'network'`, `'shield'`…). La liste des clés est dans le type `IconKey`, et la correspondance avec les icônes dans [`src/components/ui/Icon.tsx`](src/components/ui/Icon.tsx).

### Fichiers à fournir dans `public/`

| Fichier                     | Rôle                                               |
| --------------------------- | -------------------------------------------------- |
| `CV_Alexis_Chesneau.pdf`    | **À déposer** : téléchargé par le bouton « Télécharger mon CV » |
| `favicon.svg`               | Favicon « AC » (déjà fourni)                       |
| `og-image.png`              | Image d'aperçu lors d'un partage (déjà générée)    |

Pour régénérer `og-image.png` après avoir modifié votre nom ou votre titre :

```bash
npx playwright install chromium   # une seule fois
npm run og
```

### Une fois le site en ligne

Renseignez l'URL publique dans `site.url` (dans `cv.ts`, sans slash final), puis redéployez.
Cela active la balise `canonical`, `og:url` et une URL absolue pour l'image de partage (nécessaire pour LinkedIn).

---

## 🌍 Déploiement

### Option 1 — Vercel (le plus simple)

1. Poussez le projet sur GitHub.
2. Sur [vercel.com](https://vercel.com) : **Add New → Project**, puis importez le dépôt.
3. Vercel détecte Vite automatiquement (config dans [`vercel.json`](vercel.json)). Cliquez sur **Deploy**.

### Option 2 — Netlify

1. Poussez le projet sur GitHub.
2. Sur [netlify.com](https://netlify.com) : **Add new site → Import an existing project**.
3. La configuration est lue depuis [`netlify.toml`](netlify.toml) (build `npm run build`, dossier `dist`).

> Variante sans Git : lancez `npm run build`, puis glissez-déposez le dossier `dist/` sur [app.netlify.com/drop](https://app.netlify.com/drop).

### Option 3 — GitHub Pages

Un workflow prêt à l'emploi est fourni : [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Poussez le projet sur la branche `main` d'un dépôt GitHub.
2. Dans le dépôt : **Settings → Pages → Source : GitHub Actions**.
3. Chaque push sur `main` reconstruit et publie le site sur `https://<utilisateur>.github.io/<nom-du-repo>/`.

Le workflow règle automatiquement le chemin de base (`BASE_PATH=/<nom-du-repo>/`).
Si votre dépôt s'appelle `<utilisateur>.github.io`, remplacez cette valeur par `/` dans le workflow.

---

## 🗂️ Structure

```
src/
├── data/cv.ts                 ★ tout le contenu du CV
├── hooks/                     useActiveSection, useMediaQuery, useTypewriter
├── components/
│   ├── ui/                    briques réutilisables : Section, Card, TiltCard, Reveal,
│   │                          Counter, Button, GlitchText, Terminal, Timeline, Icon
│   ├── layout/                Navbar, Footer, ScrollProgress, CustomCursor, ParticlesBackground
│   └── sections/              Hero, Stats, About, Skills, Experience, Education, Interests, Contact
├── App.tsx                    assemblage de la page
└── index.css                  palette (Tailwind @theme) + effets (glass, glitch…)
```

## ♿ Accessibilité & performances

- `prefers-reduced-motion` respecté : pas de particules, pas de curseur personnalisé, pas de tilt ; le texte s'affiche directement.
- Navigation au clavier, lien « Aller au contenu », focus visibles, textes alternatifs pour les lecteurs d'écran.
- Particules chargées en différé, quand le navigateur est inactif : 64 sur desktop (79 max après les clics), 22 sur mobile (29 max).
- Polices auto-hébergées (`@fontsource`) : aucune requête vers Google.
- Lighthouse mesuré en local : mobile 97 / 100 / 100 / 100 · desktop 100 / 100 / 100 / 100 (performance / accessibilité / bonnes pratiques / SEO).

## 🎨 Palette

| Rôle              | Couleur   | Classe Tailwind   |
| ----------------- | --------- | ----------------- |
| Fond              | `#0A1020` | `bg-bg`           |
| Surfaces          | `#111A2E` | `bg-surface`      |
| Accent cyan       | `#06B6D4` | `text-accent`     |
| Accent clair      | `#67E8F9` | `text-accent-light` |
| Bleu secondaire   | `#3B82F6` | `text-blue`       |
| Texte             | `#E2E8F0` | `text-text`       |
| Texte secondaire  | `#94A3B8` | `text-muted`      |

La palette Tailwind par défaut est désactivée : seules ces couleurs existent dans le projet.
