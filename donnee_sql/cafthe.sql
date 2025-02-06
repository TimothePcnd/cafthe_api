-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : jeu. 06 fév. 2025 à 08:15
-- Version du serveur : 8.0.30
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cafthe`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id_categorie` int NOT NULL,
  `type_tva` int NOT NULL,
  `type_categorie` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `type_tva`, `type_categorie`) VALUES
(1, 6, 'Thé'),
(2, 6, 'Café'),
(3, 20, 'Accessoires');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id_client` int NOT NULL,
  `nom_prenom_client` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Telephone_client` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Date_inscription_client` date NOT NULL,
  `Mail_client` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `mdp_client` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adresse_client` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id_client`, `nom_prenom_client`, `Telephone_client`, `Date_inscription_client`, `Mail_client`, `mdp_client`, `adresse_client`) VALUES
(1, 'Alice Martin', '0612345678', '2025-01-10', 'alice.martin@mail.com', 'password1', '12 Rue des Lilas'),
(2, 'Bob Dupont', '0623456789', '2024-11-12', 'bob.dupont@mail.com', 'password2', '45 Avenue Victor Hugo'),
(3, 'Chloé Bernard', '0634567890', '2024-12-15', 'chloe.bernard@mail.com', 'password3', '78 Boulevard Saint-Michel'),
(4, 'David Simon', '0645678901', '2025-01-06', 'david.simon@mail.com', 'password4', '56 Rue de la République'),
(5, 'Emma Lefevre', '0656789012', '2024-12-20', 'emma.lefevre@mail.com', 'password5', '89 Place Bellecour'),
(6, 'Benoit Paire', '0774392105', '2025-01-28', 'benoit.paire@mail.com', '$2b$10$dl3YwUx9H3/2OVY7mTeX7u5NH2gEXTBvWHJauM9hvlv5rOPlZmEHK', '1 Rue du Tennis');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id_commande` int NOT NULL,
  `Date_prise_commande` date NOT NULL,
  `statut_commande` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Montant_ht` decimal(15,2) NOT NULL,
  `Montant_tva` decimal(15,2) NOT NULL,
  `montant_ttc` decimal(15,2) NOT NULL,
  `adresse_livraison_commande` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `id_client` int NOT NULL,
  `id_vendeur` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id_commande`, `Date_prise_commande`, `statut_commande`, `Montant_ht`, `Montant_tva`, `montant_ttc`, `adresse_livraison_commande`, `id_client`, `id_vendeur`) VALUES
(1, '2025-01-11', 'Expédiée', 45.00, 2.25, 47.25, '12 Rue des Lilas', 1, 2),
(2, '2024-11-15', 'Livrée', 60.00, 3.00, 63.00, '45 Avenue Victor Hugo', 2, 2),
(3, '2024-12-18', 'Préparation', 75.00, 3.75, 78.75, '78 Boulevard Saint-Michel', 3, 2),
(4, '2025-01-10', 'Expédiée', 90.00, 4.50, 94.50, '56 Rue de la République', 4, 2),
(5, '2024-12-23', 'Livrée', 30.00, 1.50, 31.50, '89 Place Bellecour', 5, 2),
(6, '2024-11-18', 'Livrée', 50.00, 2.50, 52.50, '12 Rue des Lilas', 2, 2),
(7, '2024-01-20', 'Expédiée', 75.00, 3.75, 78.75, '45 Avenue Victor Hugo', 2, 3),
(8, '2024-12-31', 'Préparation', 30.00, 1.50, 31.50, '78 Boulevard Saint-Michel', 3, 4),
(9, '2025-01-15', 'Préparation', 45.00, 2.25, 47.25, '12 Rue des Lilas', 1, 3),
(10, '2024-12-22', 'Livrée', 120.00, 6.00, 126.00, '78 Boulevard Saint-Michel', 3, 2),
(11, '2024-12-22', 'Livrée', 120.00, 6.00, 126.00, '78 Boulevard Saint-Michel', 3, 2),
(12, '2024-12-21', 'Livrée', 150.00, 7.50, 157.50, '56 Rue de la République', 3, 5),
(13, '2024-12-28', 'Expédiée', 80.00, 4.00, 84.00, '89 Place Bellecour', 5, 1);

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

CREATE TABLE `panier` (
  `id_panier` int NOT NULL,
  `nombre_ligne_panier` int NOT NULL,
  `Prix_unitaire_produit_ligne` decimal(15,2) NOT NULL,
  `Quantite_produit_ligne_panier` int NOT NULL,
  `id_produit` int NOT NULL,
  `id_commande` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `panier`
--

INSERT INTO `panier` (`id_panier`, `nombre_ligne_panier`, `Prix_unitaire_produit_ligne`, `Quantite_produit_ligne_panier`, `id_produit`, `id_commande`) VALUES
(1, 3, 15.00, 2, 1, 1),
(2, 5, 12.00, 3, 2, 2),
(3, 2, 8.00, 5, 3, 3),
(4, 7, 20.00, 4, 4, 4),
(5, 4, 5.00, 4, 5, 5),
(19, 3, 18.00, 1, 7, 9);

--
-- Déclencheurs `panier`
--
DELIMITER $$
CREATE TRIGGER `UpdateStock` AFTER INSERT ON `panier` FOR EACH ROW BEGIN
	DECLARE idtf_produit INT;
    DECLARE Qte_produit INT;
    SELECT id_produit INTO idtf_produit FROM panier
    WHERE id_panier = NEW.id_panier;
    SELECT Quantite_produit_ligne_panier INTO Qte_produit FROM panier
    WHERE id_panier = NEW.id_panier;
    UPDATE produit SET produit.stock_produit = produit.stock_produit - Qte_produit
    WHERE produit.id_produit = idtf_produit;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id_produit` int NOT NULL,
  `prix_ht_produit` decimal(15,2) NOT NULL,
  `description_produit` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `designation_produit` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `stock_produit` int NOT NULL,
  `Type_conditionnement` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `id_categorie` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id_produit`, `prix_ht_produit`, `description_produit`, `designation_produit`, `stock_produit`, `Type_conditionnement`, `id_categorie`) VALUES
(1, 15.00, 'Thé vert bio en vrac', 'Thé Vert Bio', 50, 'Vrac', 1),
(2, 12.00, 'Café arabica en sachets', 'Café Arabica', 100, 'sachets', 2),
(3, 8.00, 'Thé noir Assam en sachets', 'Thé Noir Assam', 75, 'Sachets', 1),
(4, 20.00, 'Cafetière italienne 6 tasses', 'Cafetière Italienne', 30, 'Boîte', 3),
(5, 5.00, 'Filtre à thé en inox', 'Filtre à Thé', 200, 'Boîte', 3),
(6, 10.00, 'Thé blanc de Chine en sachets', 'Thé Blanc Sachets', 40, 'Sachets', 1),
(7, 18.00, 'Café robusta en boite', 'Café Robusta', 79, 'Boite', 2),
(8, 25.00, 'Boîte de thé japonais matcha', 'Thé Matcha Japon', 25, 'Boîte', 1),
(9, 7.00, 'Thé rooibos bio en vrac', 'Thé Rooibos', 60, 'Vrac', 1),
(10, 22.00, 'Cafetière filtre programmable', 'Cafetière Filtre', 15, 'Boîte', 3),
(11, 12.50, 'Mug en céramique artisanale', 'Mug Céramique', 50, 'Boîte', 3),
(13, 15.50, 'Café décaféiné moulu 250g', 'Café Décaféiné', 70, 'Boite', 2),
(14, 9.00, 'Café Buena du Brésil en sachets', 'Café Buena do Brésil ', 60, 'sachets', 2);

-- --------------------------------------------------------

--
-- Structure de la table `vendeur`
--

CREATE TABLE `vendeur` (
  `id_vendeur` int NOT NULL,
  `role_vendeur` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Nom_prenom_vendeur` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `mail_vendeur` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Telephone_vendeur` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Mdp_vendeur` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vendeur`
--

INSERT INTO `vendeur` (`id_vendeur`, `role_vendeur`, `Nom_prenom_vendeur`, `mail_vendeur`, `Telephone_vendeur`, `Mdp_vendeur`) VALUES
(1, 'Administrateur', 'Sophie Gérard', 'sophie.gerard@mail.com', '0679876543', 'sophiepass'),
(2, 'Vendeur', 'Paul Morel', 'paul.morel@mail.com', '0688765432', 'paulpass'),
(3, 'Vendeur', 'Julie Perrin', 'julie.perrin@mail.com', '0673459871', 'juliepass'),
(4, 'Vendeur', 'Maxime Rolland', 'maxime.rolland@mail.com', '0694567821', 'maximepass'),
(5, 'Vendeur', 'Claire Dubois', 'claire.dubois@mail.com', '0662345678', 'clairepass');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id_categorie`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id_commande`),
  ADD KEY `id_client` (`id_client`),
  ADD KEY `id_vendeur` (`id_vendeur`);

--
-- Index pour la table `panier`
--
ALTER TABLE `panier`
  ADD PRIMARY KEY (`id_panier`),
  ADD KEY `id_produit` (`id_produit`),
  ADD KEY `id_commande` (`id_commande`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id_produit`),
  ADD KEY `id_categorie` (`id_categorie`);

--
-- Index pour la table `vendeur`
--
ALTER TABLE `vendeur`
  ADD PRIMARY KEY (`id_vendeur`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id_categorie` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id_commande` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `panier`
--
ALTER TABLE `panier`
  MODIFY `id_panier` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id_produit` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `vendeur`
--
ALTER TABLE `vendeur`
  MODIFY `id_vendeur` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`),
  ADD CONSTRAINT `commande_ibfk_2` FOREIGN KEY (`id_vendeur`) REFERENCES `vendeur` (`id_vendeur`);

--
-- Contraintes pour la table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `panier_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produit` (`id_produit`),
  ADD CONSTRAINT `panier_ibfk_2` FOREIGN KEY (`id_commande`) REFERENCES `commande` (`id_commande`);

--
-- Contraintes pour la table `produit`
--
ALTER TABLE `produit`
  ADD CONSTRAINT `produit_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
