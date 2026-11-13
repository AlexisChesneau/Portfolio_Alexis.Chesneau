import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { site, profile } from './src/data/cv.ts'

/**
 * Chemin de base du site.
 * - Vercel / Netlify : "/" (par défaut)
 * - GitHub Pages     : "/<nom-du-repo>/" (défini automatiquement par le workflow)
 */
const base = process.env.BASE_PATH ?? '/'

/** Échappe une chaîne pour l'insérer dans un attribut HTML. */
const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Injecte les métadonnées SEO / Open Graph de src/data/cv.ts dans index.html,
 * pour garder une seule source de vérité pour le contenu.
 */
function cvMetaPlugin(): Plugin {
  const pageUrl = site.url ? `${site.url}/` : ''
  const ogImage = site.url ? `${site.url}/og-image.png` : `${base}og-image.png`
  const values: Record<string, string> = {
    lang: site.lang,
    title: site.title,
    description: site.description,
    author: `${profile.firstName} ${profile.lastName}`,
    ogImage,
    pageUrl,
  }
  return {
    name: 'cv-meta',
    transformIndexHtml(html) {
      let out = html.replace(/\{\{(\w+)\}\}/g, (_, key: string) => escapeHtml(values[key] ?? ''))
      // Supprime les balises URL si aucune URL publique n'est renseignée
      if (!pageUrl) out = out.replace(/\s*<(?:meta property="og:url"|link rel="canonical")[^>]*>/g, '')
      return out
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), cvMetaPlugin()],
  build: {
    target: 'es2022',
  },
})
