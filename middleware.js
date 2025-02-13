const jwt = require("jsonwebtoken");
const {decode} = require("jsonwebtoken");

// Création du middleware
/*const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json( {message: "Token introuvable"});
    }

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(401).json({message: "Token invalide"});
        }

        req.client = decoded;
        next();
    });
};*/

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Token introuvable ou mal formé" });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "Secret JWT non configuré" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Erreur de vérification du token:", err);
            return res.status(401).json({ message: "Token invalide" });
        }

        req.client = decoded;
        next();
    });
};

module.exports = {verifyToken};