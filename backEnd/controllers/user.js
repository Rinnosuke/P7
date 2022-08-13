const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Fonction pour s'inscrire sur le site
exports.signup = (req, res, next) => {
//On vérifie que l'adresse email est valide
    if (/^(?![\w-\.]+@[\w-]+\.+[\w-]{2,4}$)/.test(req.body.email)) {
        return res.status(400).json({ error });
    }
//On fait un hachage du mot de passe avant de le stocker
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
//On sauvegarde notre utilisateur dans la base de donnée
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(403).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

//Fonction pour se connecter
exports.login = (req, res, next) => {
//On cherche l'email dans la base de donnée
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
//On compare le mot de passe utilisé avec celui sauvegardé
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
//Si tout est bon on crée un token d'identifaction pour notre utilisateur
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        ),
                        admin: user.admin
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };