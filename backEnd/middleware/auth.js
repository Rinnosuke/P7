const jwt = require('jsonwebtoken');
 
//Fonction qui vérifie le token dans la requète
module.exports = (req, res, next) => {
   try {
//On prend le token et on vérifie qu'il est valide
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//Si il est valide on sauvegarde l'identifiant correspondant dans la requète
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};