# Atlas des Rêves

Atlas des Rêves est une expérience web interactive et immersive qui vous invite à explorer un univers 3D où chaque étoile représente un rêve partagé par un visiteur. Le projet vise à créer une cartographie onirique collective, poétique et participative, favorisant la découverte et l'entraide à travers les cultures.

## Objectif du projet

- Offrir un espace d'expression et de partage autour des rêves.
- Visualiser les rêves sous forme d'étoiles dans un cosmos 3D interactif.
- Favoriser la découverte, la navigation et l'inspiration à travers les rêves des autres.
- Proposer une expérience multilingue et accessible à tous.
- Assurer la persistance et la sécurité des données grâce à un service de base de données moderne.

## Technologies utilisées

- **Three.js** : Moteur de rendu 3D temps réel pour l'univers onirique.
- **JavaScript Vanilla** : Logique de l'application, interactions, et mise en œuvre des principes de Clean Architecture.
- **HTML5 & CSS3** : Structure, design responsive et animations cosmiques.
- **Supabase (BaaS)** : Solution Backend-as-a-Service pour la base de données PostgreSQL et la gestion des règles de sécurité au niveau des lignes (RLS).

## Fonctionnalités principales

- Navigation libre dans l'univers 3D (rotation, zoom, déplacement).
- Ajout de votre propre rêve (sous forme d'étoile personnalisée) **avec persistance des données dans le cloud**.
- Découverte des rêves des autres en cliquant sur les étoiles.
- Tutoriel interactif au premier lancement et lors du changement de langue.
- Interface multilingue (français, anglais, allemand, etc).
- Interface responsive et accessible.

## Utilisation du site

1. **Navigation** :
   - Utilisez la souris pour faire pivoter la vue (clic gauche), zoomer (molette) et déplacer la caméra (clic droit).
   - Cliquez sur une étoile pour lire le rêve associé.

2. **Ajouter un rêve** :
   - Cliquez sur "Ajouter mon rêve" dans le menu.
   - Remplissez le formulaire et validez pour voir votre rêve apparaître dans le cosmos.

3. **Changer de langue** :
   - Utilisez le bouton de sélection de langue en haut à droite.

4. **Tutoriel** :
   - Un tutoriel interactif s'affiche au premier lancement ou après un changement de langue pour vous guider.

## Lancer le projet

1. **Préparation Supabase** : Avant de lancer, assurez-vous d'avoir remplacé les valeurs `SUPABASE_URL` et `SUPABASE_ANON_KEY` par vos propres clés publiques dans le fichier `script.js`.
2. **Lancement Local** : Après avoir cloné le projet, ouvrez simplement le fichier `index.html` dans votre navigateur moderne (Chrome, Firefox, Edge, etc.).

---

*Projet réalisé par Mathias Essowaza ALEDI , 2025.*
