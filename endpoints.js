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
        res.json(result);
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

/*
 * Route : Modification d'une fiche client
 * POST /api/client/
 */

router.put("/client/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {telephone, mail, adresse} = req.body;

    db.query("UPDATE client SET Telephone_client = ?, Mail_client = ?, adresse_client = ? WHERE id_client = ?", [telephone, mail, adresse, id], (err, result) => {
        if (err) {
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

    db.query("SELECT id_commande, Date_prise_commande, montant_ttc FROM commande WHERE id_client = ?", [id], (err, result) => {
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

    db.query("SELECT * FROM commande WHERE id_commande = ?", [id], (err, result) => {
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

    db.query("UPDATE client SET nom_prenom_client = ?, Telephone_client = ?, Date_inscription_client = ?, Mail_client = ?, mdp_client = ?, adresse_client = ? WHERE id_client = ?", ["","","2000-01-01","","","", id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({message: "Erreur lors de la modification"});
        }
        res.status(201).json({message: "Modification réussie", id_client: id});
    });
});




module.exports = router;