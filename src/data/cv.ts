/**
 * ============================================================================
 *  CONTENU DU CV — fichier unique à modifier
 * ============================================================================
 *  Tout le texte du site vient d'ici : modifiez ce fichier, les composants
 *  se mettent à jour automatiquement.
 *
 *  ⚠️ Ce fichier ne doit contenir QUE des données (pas d'import React/icônes) :
 *  il est aussi lu par vite.config.ts pour générer les balises SEO.
 *
 *  Icônes : utilisez une des clés de type `IconKey` ci-dessous ; la
 *  correspondance avec les icônes lucide-react est faite dans
 *  src/components/ui/Icon.tsx.
 * ============================================================================
 */

/** Clés d'icônes disponibles (voir src/components/ui/Icon.tsx). */
export type IconKey =
  | 'monitor'
  | 'users'
  | 'hard-drive-download'
  | 'network'
  | 'headset'
  | 'cpu'
  | 'shield'
  | 'code'
  | 'plane'
  | 'cake'
  | 'award'
  | 'graduation'
  | 'zap'

export interface Stat {
  /** Valeur numérique animée par le compteur. */
  value: number
  /** Texte affiché juste après le nombre (ex. « mois »). */
  suffix?: string
  /** Libellé principal sous le nombre. */
  label: string
  /** Précision facultative (petite ligne en police mono). */
  detail?: string
}

export interface SkillCategory {
  title: string
  icon: IconKey
  items: string[]
}

export interface Experience {
  role: string
  company: string
  period: string
  /** Type de contrat affiché en badge (facultatif). */
  type?: string
  /** 'it' = expérience informatique ; 'autre' = parcours précédent (affichage atténué). */
  domain: 'it' | 'autre'
  missions: string[]
}

export interface Education {
  title: string
  school?: string
  period?: string
  details?: string
}

export interface Interest {
  title: string
  icon: IconKey
  details?: string
}

export interface TerminalLine {
  command: string
  output: string
  /** Affiche la sortie en couleur d'accent (ex. ligne de succès). */
  highlight?: boolean
}

// ---------------------------------------------------------------------------
//  SEO / métadonnées du site
// ---------------------------------------------------------------------------
export const site = {
  /** Titre de l'onglet et des partages (Open Graph). */
  title: 'Alexis Chesneau — Technicien Informatique · Support N1/N2, Systèmes et Réseaux',
  description:
    "CV en ligne d'Alexis Chesneau, technicien informatique Support N1/N2, Systèmes et Réseaux. Recherche d'alternance Technicien Supérieur Systèmes et Réseaux (TSSR – Bac+2) à Pau / Nay (64).",
  /**
   * URL publique du site, SANS slash final (ex. https://alexis-chesneau.vercel.app).
   * Utilisée pour l'image Open Graph absolue. Laisser vide si inconnue.
   */
  url: 'https://alexischesneau.github.io/cv',
  lang: 'fr',
}

// ---------------------------------------------------------------------------
//  Identité
// ---------------------------------------------------------------------------
export const profile = {
  firstName: 'Alexis',
  lastName: 'CHESNEAU',
  /** Identifiant affiché dans le terminal (`whoami`). */
  handle: 'alexis.chesneau',
  initials: 'AC',
  title: 'Technicien Informatique – Support N1/N2, Systèmes et Réseaux',
  tagline: "Recherche d'alternance Technicien Supérieur Systèmes et Réseaux (TSSR – Bac+2)",
  /** Rôles qui défilent en boucle sous le nom. */
  roles: ['Technicien Informatique', 'Support N1/N2', 'Systèmes & Réseaux', 'Futur TSSR'],
  /** Badge de disponibilité affiché en haut du hero. */
  availability: 'Disponible pour une alternance TSSR',
  /** Fichier à placer dans le dossier /public. */
  cvFile: 'CV_Alexis_Chesneau.pdf',
}

// ---------------------------------------------------------------------------
//  Contact
// ---------------------------------------------------------------------------
export const contact = {
  phone: '06 29 59 28 44',
  /** Format international pour le lien tel: */
  phoneHref: '+33629592844',
  email: 'chesneaualexis64@gmail.com',
  location: 'Nay (64) – Pau, Béarn',
  /** URL complète du profil LinkedIn. Laissez vide pour masquer le lien. */
  linkedin: '',
}

// ---------------------------------------------------------------------------
//  Terminal animé du hero
// ---------------------------------------------------------------------------
export const terminal: TerminalLine[] = [
  { command: 'whoami', output: 'alexis.chesneau' },
  { command: 'cat skills.txt', output: 'Active Directory · GLPI · Windows Server · VLAN…' },
  { command: 'ping recruteur', output: 'Disponible pour une alternance TSSR ✔', highlight: true },
]

// ---------------------------------------------------------------------------
//  Chiffres clés
// ---------------------------------------------------------------------------
export const stats: Stat[] = [
  { value: 13, suffix: 'mois', label: "d'alternance", detail: 'Support N1/N2' },
  { value: 3, label: 'expériences IT', detail: 'alternance · stages' },
  { value: 3, label: 'formations tech', detail: 'infra · dev web' },
  { value: 2, label: 'Double profil', detail: 'Infra + Dev' },
]

// ---------------------------------------------------------------------------
//  À propos
// ---------------------------------------------------------------------------
export const about = {
  text: "Technicien informatique de proximité avec 13 mois d'expérience en alternance en support utilisateurs N1/N2 : gestion des incidents sous GLPI, administration Active Directory, déploiement et maintenance de postes Windows 10/11 et d'imprimantes réseau. Double compétence en développement web (JavaScript, React, MySQL) et ancien artisan pâtissier : rigueur, respect des process et sens du service client. Je recherche une alternance Technicien Supérieur Systèmes et Réseaux (TSSR) pour contribuer à l'administration et à la sécurisation de votre infrastructure.",
  /** Infos clés affichées à côté du texte. */
  facts: [
    { label: 'Localisation', value: 'Nay (64) – Pau, Béarn' },
    { label: 'Objectif', value: 'Alternance TSSR (Bac+2)' },
    { label: 'Profil', value: 'Double compétence Infra + Dev' },
  ],
  softSkills: ['Rigueur', 'Autonomie', 'Sens du service client', 'Gestion des priorités', 'Curiosité technique'],
}

// ---------------------------------------------------------------------------
//  Compétences
// ---------------------------------------------------------------------------
export const skills: SkillCategory[] = [
  { title: 'Systèmes', icon: 'monitor', items: ['Windows 10 / 11', 'Windows Server', 'Linux', 'BIOS / UEFI'] },
  {
    title: 'Annuaire',
    icon: 'users',
    items: ['Active Directory', 'Comptes utilisateurs', 'Groupes', "Unités d'organisation (OU)"],
  },
  {
    title: 'Déploiement',
    icon: 'hard-drive-download',
    items: ['FOG Project', 'Boot PXE', 'Masterisation et images système', 'Préparation de postes'],
  },
  {
    title: 'Réseaux',
    icon: 'network',
    items: ['TCP/IP', 'DHCP', 'DNS', 'VLAN', 'LAN / Wi-Fi', 'Cisco Packet Tracer'],
  },
  {
    title: 'Support / ITSM',
    icon: 'headset',
    items: ['Support N1/N2', 'Helpdesk', 'GLPI (ticketing)', 'AnyDesk', 'Procédures techniques'],
  },
  {
    title: 'Matériel',
    icon: 'cpu',
    items: ['Montage et upgrade PC', 'Diagnostic de pannes', 'Imprimantes réseau', 'Konica Minolta'],
  },
  {
    title: 'Cybersécurité',
    icon: 'shield',
    items: ['Sécurisation de postes', 'Suppression de malwares', 'Antivirus', 'Bonnes pratiques ANSSI'],
  },
  {
    title: 'Développement',
    icon: 'code',
    items: ['JavaScript', 'React', 'HTML / CSS', 'Tailwind', 'MySQL', 'WordPress', 'Figma', 'Scripting'],
  },
]

// ---------------------------------------------------------------------------
//  Expériences (ordre d'affichage = ordre du tableau)
// ---------------------------------------------------------------------------
export const experiences: Experience[] = [
  {
    role: 'Technicien informatique de proximité',
    company: 'FaCylities Multi Services',
    period: '10/2025 – 11/2026',
    type: 'Alternance',
    domain: 'it',
    missions: [
      'Assuré le support utilisateurs N1/N2 : diagnostic et résolution des incidents postes de travail et périphériques',
      'Géré le cycle de vie des tickets dans GLPI, de la prise en charge à la clôture',
      'Administré Active Directory : création de comptes, affectation aux groupes, organisation des OU',
      'Installé, configuré et maintenu les postes Windows 10 / 11 et les imprimantes réseau',
    ],
  },
  {
    role: 'Technicien informatique de proximité',
    company: 'Béarnais Connecté',
    period: '08/2026 – 09/2026',
    type: 'Stage',
    domain: 'it',
    missions: [
      'Dépanné, monté et maintenu des PC ; remplacé des composants matériels défectueux',
      'Migré des postes et sécurisé des postes infectés par des logiciels malveillants',
      'Réalisé des scripts et installé des caméras',
      'Conseillé et accompagné les clients en expliquant chaque intervention',
    ],
  },
  {
    role: 'Développeur web et technicien de maintenance',
    company: 'Groupe Alvarez',
    period: '03/2025 – 05/2025',
    type: 'Stage',
    domain: 'it',
    missions: [
      'Développé 5 outils en JavaScript',
      "Monté et installé des composants ; assuré la maintenance d'imprimantes via le logiciel Konica Minolta",
    ],
  },
  {
    role: 'Apprenti pâtissier-boulanger, puis pâtissier',
    company: 'Cazalet / Constanti · Artigared',
    period: '2011 – 2014 · 2015 – 2016',
    domain: 'autre',
    missions: [
      "Respecté des process, normes d'hygiène et délais stricts ; travaillé en équipe lors des pics d'activité",
    ],
  },
]

// ---------------------------------------------------------------------------
//  Formation & certifications
// ---------------------------------------------------------------------------
export const education: Education[] = [
  { title: 'Technicien Informatique de Proximité', school: 'Formation en alternance', period: '2025 – 2026' },
  {
    title: 'Développeur Web',
    school: 'Wild Code School',
    period: '03/2023 – 07/2023',
    details: 'Projet full-stack React, MySQL, Tailwind',
  },
  {
    title: 'Bootcamp Développement Web',
    school: 'Fabrique du Numérique Paloise',
    period: '08/2022 – 12/2022',
    details: 'HTML/CSS/JS, WordPress, Figma',
  },
  { title: 'CAP Pâtissier' },
]

export const certifications: { title: string; details?: string; icon: IconKey }[] = [
  { title: 'MOOC SecNumacadémie – ANSSI', details: 'Cybersécurité', icon: 'shield' },
  { title: 'Certification électrique', icon: 'zap' },
]

// ---------------------------------------------------------------------------
//  Centres d'intérêt
// ---------------------------------------------------------------------------
export const interests: Interest[] = [
  { title: 'Informatique et nouvelles technologies', icon: 'cpu' },
  { title: 'Voyages', icon: 'plane', details: 'Japon, Norvège, Martinique, Portugal' },
  { title: 'Pâtisserie', icon: 'cake' },
]

// ---------------------------------------------------------------------------
//  Navigation (id = ancre de la section)
// ---------------------------------------------------------------------------
export const navigation = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'experiences', label: 'Expériences' },
  { id: 'formation', label: 'Formation' },
  { id: 'contact', label: 'Contact' },
] as const
