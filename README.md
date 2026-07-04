<div align="center">

# Willy Alfred Matoumba — Portfolio

### *Building the Future of Digital Innovation*
*Le savoir-faire crée la différence.*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](#)
[![Status](https://img.shields.io/badge/status-actif-brightgreen?style=flat-square)](#)
[![License](https://img.shields.io/badge/licence-MIT-blue?style=flat-square)](#licence)

[Voir le site](#) · [Signaler un bug](#contact) · [Proposer une amélioration](#contact)

</div>

---

## Sommaire

- [À propos](#à-propos)
- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Sections du site](#sections-du-site)
- [Site bilingue (FR / TR)](#site-bilingue-fr--tr)
- [Formulaire de contact](#formulaire-de-contact)
- [Accessibilité & performance](#accessibilité--performance)
- [Roadmap](#roadmap)
- [Contact](#contact)
- [Licence](#-licence)

---

## À propos

Portfolio personnel de **Willy Alfred Matoumba**, étudiant en 3ᵉ année de Génie Informatique, passionné d'**intelligence artificielle** et de **cybersécurité**, spécialisé dans la **détection d'anomalies par machine learning** et la **sécurité applicative**.

Ce site présente son parcours, ses projets, ses compétences techniques et ses certifications, à travers une interface moderne, fluide et entièrement responsive — avec prise en charge native du **mode sombre**.

---

## Aperçu

Un site one-page structuré en plusieurs sections, avec :

- Un **écran d'intro animé** (chargement + apparition du nom lettre par lettre)
- Un **hero** avec animation manuscrite SVG et un halo de logos tech en orbite
- Un **thème clair / sombre** persistant avec transition fluide
- Des **animations au scroll** (reveal, easing personnalisé)
- Un design **responsive**, pensé mobile-first sur les composants clés

---

## Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Mode sombre / clair** | Bascule de thème avec variables CSS (`--bg-page`, `--text-1`, etc.) |
| **Site bilingue FR / TR** | Bouton de bascule de langue (style Apple, effet verre dépoli) qui traduit dynamiquement tout le contenu du site en turc |
| **Orbite de technologies** | Logos tech animés en rotation autour du hero |
| **Signature manuscrite animée** | Effet d'écriture SVG au chargement de la page |
| **Certifications interactives** | Cartes avec actions *Voir*, *Télécharger* (PDF), *Partager* (Web Share API) |
| **Barres de compétences animées** | Niveaux (*Intermédiaire*, *Avancé*, *Expert*) avec progression au scroll |
| **Formulaire de contact** | Email + message, envoyé via un lien `mailto:` prérempli |
| **Navigation fluide** | Scroll animé (easing cubique) vers les ancres |
| **Respect des préférences utilisateur** | `prefers-reduced-motion` pris en charge |

---

## Stack technique

**Frontend**
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

Le site est développé en **HTML / CSS / JavaScript vanilla**, sans framework ni dépendance de build — un seul fichier `index.html` autonome, facile à héberger n'importe où (GitHub Pages, Netlify, Vercel, etc.). La traduction FR/TR est également gérée en JavaScript pur (`TreeWalker` + dictionnaire), sans librairie i18n externe.

**Compétences mises en avant sur le site**

| Domaine | Technologies |
|---|---|
| IA & Data Science | Python, JavaScript, Java, SQL, HTML/CSS |
| Développement Web | Node.js / Express, Supabase / PostgreSQL, Git / GitHub, Docker, Stripe / API REST, n8n |
| Expertise | Cybersécurité, Intelligence Artificielle, Développement Full-Stack |

---

## Structure du projet

```
portfolio/
├── index.html              # Page unique (HTML + CSS + JS inline)
├── certifications/          # PDF des certifications téléchargeables
└── README.md                # Ce fichier
```

> Le site est volontairement mono-fichier pour rester simple à déployer et à maintenir.

---

## Installation

Aucune dépendance ni étape de build n'est nécessaire.

```bash
# Cloner le dépôt
git clone https://github.com/matoumbaalfred1-debug/<nom-du-repo>.git
cd <nom-du-repo>

# Lancer en local (n'importe quel serveur statique convient)
npx serve .
# ou simplement ouvrir index.html dans le navigateur
```

### Déploiement (GitHub Pages)

```bash
git add index.html
git commit -m "Mise à jour du portfolio"
git push origin main
```

Puis activer **GitHub Pages** dans *Settings → Pages* du dépôt, sur la branche `main`.

---

## Sections du site

| # | Section | Ancre |
|---|---|---|
| 01 | À propos | `#about` |
| — | Guide / présentation | `#guide` |
| 02 | Projets | `#projects` |
| 03 | Compétences | `#skills` |
| 04 | Certifications | `#certifications` |
| — | Parcours | `#parcours` |
| 05 | Contact | `#contact` |

### Projets mis en avant

- **InvestWorld** *(en développement)* — Plateforme de mise en relation startups × investisseurs, matching pondéré sur 6 critères, workflow NDA automatisé, messagerie chiffrée.
- **IA Academy** — Plateforme e-learning dédiée aux métiers de l'IA, parcours adaptatif, tuteur IA intégré, certifications progressives.
- **FlowMind** *(en développement)* — SaaS d'automatisation de workflows no-code, canvas drag-and-drop, exécution topologique, génération de workflow via l'API Claude.
- **Nike Concept** — Landing page premium, typographie kinetic, animations de scroll cinématiques, mise en page éditoriale sombre inspirée d'Apple.

---

## Site bilingue (FR / TR)

Un bouton dédié, dans le style Apple (pilule avec effet verre dépoli, animation ressort), permet de basculer l'intégralité du site du français vers le turc, et inversement.

**Fonctionnement :**

- Un dictionnaire de traduction `DICT` associe chaque texte français à sa traduction turque
- Un `TreeWalker` parcourt les nœuds de texte des sections du site et les remplace à la volée
- Les attributs (`placeholder`, `aria-label`) sont traduits séparément via une table dédiée
- La préférence de langue est mémorisée (`localStorage`) et réappliquée à chaque visite
- Le texte original est conservé en mémoire pour revenir au français sans recharger la page

---

## Formulaire de contact

Le formulaire de la section *Contact* :

1. Récupère l'**email** et le **message** du visiteur
2. Valide le format de l'email côté client
3. Ouvre le client mail par défaut du visiteur via un lien `mailto:` prérempli avec le sujet et le corps du message

Aucune donnée n'est stockée ni transmise à un serveur tiers — tout se passe côté client.

---

## Accessibilité & performance

- Respect de `prefers-reduced-motion` pour désactiver les animations non essentielles
- Contraste des couleurs adapté au mode sombre (`color-scheme`, variables CSS dédiées)
- Attributs ARIA sur les éléments décoratifs et interactifs
- `Content-Security-Policy` défini en meta pour renforcer la sécurité du site

---

## Roadmap

- [ ] Finaliser **InvestWorld** et **FlowMind**
- [ ] Ajouter de nouveaux projets
- [ ] Étoffer la section certifications
- [ ] Améliorer le SEO (structured data, sitemap)

---

## Contact

- **GitHub** : [@matoumbaalfred1-debug](https://github.com/matoumbaalfred1-debug)
- **LinkedIn** : [willy-alfred-matoumba](https://www.linkedin.com/in/willy-alfred-matoumba)
- **Email** : matoumbaalfred1@gmail.com

---

## Licence

Ce projet est distribué sous licence **MIT** — libre à toi de t'en inspirer, mais merci de ne pas réutiliser le contenu personnel (photos, textes, certifications) tel quel.

<div align="center">

Fait avec passion et beaucoup de `console.log()` par **Willy Alfred Matoumba**

</div>
