# Backbone Agency - Site Web Professionnel

## Présentation du projet

Backbone Agency est un site web professionnel pour une entreprise spécialisée dans la commercialisation de services numériques à destination des entreprises. Le site est conçu avec un design moderne, futuriste et professionnel, en utilisant une architecture statique optimisée pour Cloudflare Pages.

## Caractéristiques principales

- Design responsive et moderne avec palette de couleurs tech (#1a2a44, #00d4ff, #f4f7fa, #ffffff)
- Typographie Poppins (Bold pour titres, Regular pour texte)
- Animations et effets visuels (fade-in, hover effects, compteurs animés)
- Mode sombre/clair avec toggle
- Easter Egg (triple clic sur le logo)
- Formulaire de contact intégré via Formspree
- Optimisé pour les performances (fichiers minifiés, SVG optimisés)
- Compatible mobile et tablette

## Structure du projet

```
backbone-agency/
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── style.min.css
│   ├── js/
│   │   ├── main.js
│   │   └── main.min.js
│   ├── images/
│   │   ├── favicon.svg
│   │   └── hero-bg.svg
│   └── fonts/
├── index.html
├── thanks.html
├── cloudflare-deploy.md
├── todo.md
└── README.md
```

## Pages

- **index.html** : Page principale avec toutes les sections (Accueil, Services, Compteur, Projet du moment, Boutique, Contact)
- **thanks.html** : Page de remerciement après soumission du formulaire

## Fonctionnalités spécifiques

1. **Animations fade-in** : Les éléments apparaissent progressivement lors du défilement
2. **Compteurs animés** : Statistiques qui s'incrémentent automatiquement
3. **Toggle thème** : Bouton pour basculer entre mode clair et sombre
4. **Texte rotatif** : Affichage alterné des projets du moment
5. **Easter Egg** : Triple clic sur le logo pour afficher un code promo
6. **Formulaire de contact** : Intégré via Formspree (à configurer avec votre ID)
7. **Chatbot** : Préparé pour intégration avec Tawk.to (à configurer avec votre ID)

## Déploiement

Le site est conçu pour être déployé sur Cloudflare Pages. Consultez le fichier `cloudflare-deploy.md` pour les instructions détaillées de déploiement.

## Personnalisation

### Formulaire de contact

Pour activer le formulaire de contact, remplacez l'URL Formspree dans `index.html` :
```html
<form id="contact-form" action="https://formspree.io/f/VOTRE_ID_FORMSPREE" method="POST" class="contact-form">
```

### Chatbot Tawk.to

Pour activer le chatbot, décommentez et modifiez la fonction `initChatbot()` dans `main.js` avec votre ID Tawk.to.

## Optimisation

Les fichiers CSS et JavaScript sont disponibles en versions normales et minifiées. Pour une performance optimale en production, utilisez les versions minifiées en modifiant les liens dans `index.html` et `thanks.html`.

## Crédits

- Polices : Google Fonts (Poppins)
- Icônes : Feather Icons
- Animations : CSS personnalisé et JavaScript vanilla
