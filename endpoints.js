const express = require("express");
const db = require("./db");
//const {response} = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();


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

/*
 * Route : Inscription d'un client
 * POST /api/client/register
 * Exemple JSON
 * {
 * "nom": "DUPONT",
 * "prenom": "Jean",
 * "email": "jean.dupont@gmail.com",
 * "mot_de_passe": "montMotDePasse"
 * }
 */
router.post("/client/register", (req, res) => {
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
        db.query("INSERT INTO client (nom_prenom_client, Telephone_client, Date_inscription_client, Mail_client, mdp_client, adresse_client) VALUES (?,?,?,?,?,?)", [nom_prenom_client, Telephone_client, Date_inscription_client, Mail_client, hash, adresse_client],
            (err , result) => {
                if (err) {
                    return res.status(500).json({message: "Erreur lors de l'inscription" });
                }

                res.status(201).json({message: "Inscription réussie", id_client: result.insertId });
            },
        );
    });
});


module.exports = router;