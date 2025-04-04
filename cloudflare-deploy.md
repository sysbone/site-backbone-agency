# Backbone Agency - Configuration Cloudflare Pages

Ce fichier contient les instructions pour déployer le site Backbone Agency sur Cloudflare Pages.

## Prérequis

- Un compte Cloudflare
- Le domaine backboneagency.tech configuré chez IONOS
- Les serveurs DNS pointant vers Cloudflare

## Étapes de déploiement

1. Se connecter à Cloudflare Dashboard
2. Aller dans "Pages" > "Create a project" > "Connect to Git"
3. Sélectionner le repository contenant le code du site
4. Configurer les paramètres de build:
   - Build command: (laisser vide, pas besoin de build pour un site statique)
   - Build output directory: / (racine du projet)
   - Root directory: / (racine du projet)
5. Cliquer sur "Save and Deploy"

## Configuration DNS

1. Dans Cloudflare, aller dans la section "DNS"
2. Ajouter un enregistrement CNAME:
   - Type: CNAME
   - Name: @ (apex domain)
   - Target: [nom-du-projet].pages.dev
   - Proxy status: Proxied
3. Ajouter un enregistrement CNAME pour le sous-domaine www:
   - Type: CNAME
   - Name: www
   - Target: [nom-du-projet].pages.dev
   - Proxy status: Proxied

## Configuration chez IONOS

1. Se connecter au panneau d'administration IONOS
2. Aller dans la section "Domaines & SSL"
3. Sélectionner le domaine backboneagency.tech
4. Modifier les serveurs DNS pour pointer vers les serveurs DNS de Cloudflare:
   - ns1.cloudflare.com
   - ns2.cloudflare.com

## Vérification

Après le déploiement, vérifier que:
- Le site est accessible via https://backboneagency.tech
- Le certificat SSL est correctement installé
- Toutes les pages et fonctionnalités sont opérationnelles
