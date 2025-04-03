const express = require("express");
const db = require("./db");
//const {response} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sign} = require("jsonwebtoken")
require("dotenv").config(); //Permet de charger les variables d'environnement
const {verifyToken} = require ("./middleware")
const {query} = require("express");
const router = express.Router();

/* npm install jsonwebtoken
*   npm install --save dev jest
*/


/*
 * Afficher tous les cafés
 * GET /api/produit/café
 */
router.get("/produits/cafes", (req, res) => {
    db.query("SELECT * FROM produit WHERE id_categorie = ?", [2], (err, result) => {
        if (err) {
            return res.status(500).json({message: "Erreur du serveur"});
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Catégorie non trouvé"});
        }
        res.json(result); // Retournera uniquement le premier résultat
    });
});


/*
 * Afficher tous les thés
 * GET /api/produit/thé
 */
router.get("/produits/thes", (req, res) => {
    db.query("SELECT * FROM produit WHERE id_categorie = ?", [1], (err, result) => {
        if (err) {
            return res.status(500).json({message: "Erreur du serveur"});
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Catégorie non trouvé"});
        }
        res.json(result); // Retournera uniquement le premier résultat
    });
});


/*
 * Afficher tous les accessoires
 * GET /api/produit/accessoire
 */
router.get("/produits/accessoires", (req, res) => {
    db.query("SELECT * FROM produit WHERE id_categorie = ?", [3], (err, result) => {
        if (err) {
            return res.status(500).json({message: "Erreur du serveur"});
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Catégorie non trouvé"});
        }
        res.json(result); // Retournera uniquement le premier résultat
    });
});


/* Route : Lister les produits
 * GET /api/produits
 */
router.get("/produit", (req, res) =>{
    db.query("SELECT * FROM produit", (err, result) => {
        if (err) {
            return res.status(500).json({message: "Erreur du serveur"});
        }
        res.json(result);
    });
});

/* Route : Récupérer un produit par son ID
 * GET /api/produit/:id
 * Exemple : GET /api/produit/3
 */
router.get("/produit/:id", (req, res) =>{
    const {id} = req.params; //const id = req.params.id;
    db.query("SELECT * FROM produit WHERE id_produit = ?", [id], (err, result)=> {
        if (err) {
            return res.status(500).json({message: "Erreur du serveur"});
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Produit non trouvé"});
        }
        res.json(result[0]); // Retournera uniquement le premier résultat
    });
});

/* Route : Récupérer un client par son ID
 * GET /api/client
 */

router.get("/client/:id", (req, res) =>{
    const {id} = req.params;
    db.query("SELECT * FROM client WHERE id_client = ?", [id], (err, result)=> {
        if (err) {
            return res.status(500).json({message: "Erreur du serveur"});
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Client non trouvé"});
        }
        res.json(result[0]);
    });
});


/*
 * Route : Inscription d'un client
 * POST /api/client/register
 * Exemple JSON
 * {
* "nom_prenom_client" : "Dupont",
*"Date_inscription_client" : "2025-02-13",
* "Mail_client" : "jean.dupont@email.com",
* "Telephone_client" : "0793625147",
* "adresse_client" : "13 Rue Des Roses, Nice, 06004",
* "mdp_client" : "monMotDePasse"
}
 */
router.post("/register", (req, res) => {
    const{ nom_prenom_client, Telephone_client, Date_inscription_client, Mail_client, mdp_client, adresse_client } = req.body
    // Contrôler si le mail est déja présent dans la base de donnée
    db.query("SELECT * FROM client WHERE Mail_client= ?", [Mail_client], (err, result) => {
        if (err) {
            return res.status(500).json({message: "Erreur du serveur"});
        }
        if (result.length > 0) {
            return res.status(400).json({message: "Cette adresse mail est déjà utilisée" });
        }
    });
    // Hachage de mot de passe
    bcrypt.hash(mdp_client, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({message: "Erreur lors du  hachage du mot de passe" });
        }

        // Insertion du nouveau client
        db.query("INSERT INTO client (nom_prenom_client, Telephone_client, Date_inscription_client, Mail_client, mdp_client, adresse_client)VALUES (?,?,?,?,?,?)",
            [nom_prenom_client, Telephone_client, Date_inscription_client, Mail_client, hash, adresse_client],
            (err , result) => {
                if (err) {
                    return res.status(500).json({message: "Erreur lors de l'inscription" });
                }

                res.status(201).json({message: "Inscription réussie", id_client: result.insertId });
            },
        );
    });
});


/*
 * Route : Modification d'une fiche client
 * POST /api/client/
 */

router.put("/client/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {Telephone_client, Mail_client, adresse_client} = req.body;

    db.query("UPDATE client SET Telephone_client = ?, Mail_client = ?, adresse_client = ? WHERE id_client = ?",
        [Telephone_client, Mail_client, adresse_client, id],
        (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({message: "Erreur lors de la modification"});
        }
        res.status(201).json({message: "Modification réussie"});
    });
});

/*
 * Route : Lister les commandes d'un client
 * POST /api/commande/client/:id
 */
router.get("/commande/client/:id", (req, res) => {
    const {id} = req.params;

    db.query("SELECT * FROM commande WHERE id_client = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({message: "Erreur serveur"});
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Le client n'a passé de commande"});
        }
        res.json(result);
    });
});

/*
 * Route : Détails d'une commande d'un client
 * POST /api/commande/:id
 */
router.get("/commande/:id", (req, res) => {
    const {id} = req.params;

    db.query("SELECT * FROM commande" +
        " JOIN panier ON commande.id_commande = panier.id_commande" +
        " JOIN produit ON panier.id_produit = produit.id_produit" +
        " WHERE commande.id_commande = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({message: "Erreur serveur"});
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Commande du client non trouvée"});
        }

        res.json(result);
    });
});

/*
 * Route : Supprimer un client
 * POST /api/client/:id
 */

router.put("/client/delete/:id", (req, res) => {
    const {id} = req.params;
    const date = new Date();
    const date2 = date.toISOString();
    const date3 = date2.split('T')[0];

    db.query("UPDATE client SET nom_prenom_client = ?, Telephone_client = ?, Date_inscription_client = ?, Mail_client = ?, mdp_client = ?, adresse_client = ? WHERE id_client = ?", ["","",date3,"","","", id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({message: "Erreur lors de la modification"});
        }
        res.status(201).json({message: "Modification réussie", id_client: id});
    });
});

/*
 * Route : Modifier le mot de passe d'un client
 * POST /api/update/login/:id
 * ancien mdp : monMotDePasse
 * nv mdp : 123456
 */

router.put("/update/login/:id", (req, res) => {
    const { id } = req.params;
    const { oldMdp, newMdp } = req.body;

    db.query("SELECT mdp_client FROM client WHERE id_client = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({message: "Erreur serveur"});
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Utilisateur non trouvé"});
        }

        const hashedPassword = result[0].mdp_client;

        bcrypt.compare(oldMdp, hashedPassword, (error, isMatch) => {
            if (error) {
                console.log(error);
                return res.status(500).json({message: "Erreur lors de la vérification du mot de passe"});
            }

            if (!isMatch) {
                return res.status(400).json({message: "Ancien mot de passe incorrect"});
            }

            bcrypt.hash(newMdp, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({message: "Erreur lors du hachage du mot de passe"});
                }

                db.query("UPDATE client SET mdp_client = ? WHERE id_client = ?", [hash, id], (error, updateResult) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({message: "Erreur lors de la mise à jour du mot de passe"});
                    }
                    return res.status(200).json({message: "Mot de passe modifié avec succès"});
                });
            });
        });
    });
});


/*
 * ROUTE : Connexion d'un client
 * {
 * "email":emma.lefevre@mail.com
 * " ancien mot_de_passe": "password5"
 * " nv mot_de_passe": "12345"
 * }
 */

router.post("/login", (req, res) => {
    const {Mail_client, mdp_client} = req.body;

    db.query("SELECT * FROM client WHERE Mail_client = ?", [Mail_client],(err, result) => {
        if (err) {
            return res.status(500).json({message: "Erreur lors de la modification"});
        }
        if (result.length === 0) {
            return res.status(401).json({message: "Identifiant incorrect"});
        }

        const client = result[0];
        /*Vérification du mot de passe*/
        bcrypt.compare(mdp_client, client.mdp_client, (err, isMatch) => {
            if (err) {
                return res.status(500).json({message: "Erreur serveur"});
            }
            if (!isMatch) {
                return res.status(401).json({message:"Mot de passe incorrect"})
            }
            // on va générer le token
            // Génération d'un token JWT
            const token = sign(
                {id: client.id_client, email: client.Mail_client}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN}

            );
            res.json({message:"Connexion réussie", token,
                client:{
                    id: client.id_client,
                    nom: client.nom_prenom_client,
                    email: client.Mail_client,
                },
            });
        });
    });
});

/* Route pour récupérer toutes les lignes panier d'une commande */
// Infos : id_commande
/*router.get("/ligne/commande/:id_commande", (req, res) => {
    const { id_commande } = req.params;

    db.query(
        "SELECT * FROM panier WHERE id_commande = ?",
        [id_commande],
        (error, result) => {
            if (error) {
                return res
                    .status(500)
                    .json({
                        message: "Erreur lors de la récupération des lignes de panier",
                    });
            }
            res.json(result);
        },
    );
});*/

/* Route pour ajouter une ligne dans le panier*/

/*router.post("/ligne/ajouter", verifyToken, (req, res) => {
    const { id_commande, id_produit } = req.body;

    db.query(
        `SELECT * FROM panier WHERE id_commande = ? AND id_produit = ?`,
        [id_commande, id_produit],
        (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: "Erreur lors de la récupération de la ligne de panier",
                });
            }
            if (result.length === 0) {
                db.query(
                    `INSERT INTO panier (quantite_produit_ligne_panier, id_commande, id_produit) VALUES (1, ?, ?)`,
                    [id_commande, id_produit],
                    (error, result) => {
                        if (error) {
                            return res.status(500).json({
                                message:
                                    "Erreur lors de la création d'une nouvelle ligne de panier",
                            });
                        }
                        res.status(201).json({
                            message: "Ajout réussi",
                            ID_ligne_panier: result.insertId,
                        });
                    },
                );
            } else {
                db.query(
                    "UPDATE panier SET quantite_produit_ligne_panier = quantite_produit_ligne_panier + 1 WHERE id_commande = ? AND id_produit = ?",
                    [id_commande, id_produit],
                    (error, result) => {
                        if (error) {
                            return res.status(500).json({
                                message:
                                    "Erreur lors de la création d'une nouvelle ligne de panier",
                            });
                        }
                    },
                );
            }
        },
    );
});*/

module.exports = router;