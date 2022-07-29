const Post = require('../models/post');
const fs = require('fs');

//Fonction pour créer un nouveau post
exports.createPost = (req, res, next) => {
//On convertit le Json en objet javascript
  const postObject = JSON.parse(req.body.post);
//On supprime l'id de la requète
  delete postObject._id;
//On supprime l'userId au cas où l'utilsateur l'aurait modifié
  delete postObject._userId;
//On crée notre post
  const post = new Post({
      ...postObject,
//On lui rajoute l'userId qu'on a vérifié au préalable par le token grace à notre middleware
      userId: req.auth.userId,
//On lui donne l'adresse de l'image sauvegardé
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
//On rajoute toutes les inforamtions nécessaires
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
  });
//On sauvegarde notre post dans la base de donnée
  post.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};

//Fonction pour modifier un post
exports.modifyPost = (req, res, next) => {
//On regarde si l'image est modifié et on récupère la nouvelle adresse le cas échéant
  const postObject = req.file ? {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
//On supprime l'userId au cas où l'utilsateur l'aurait modifié  
  delete postObject._userId;
//On récupère le post dans la base de donnée
  Post.findOne({_id: req.params.id})
      .then((post) => {
//On vérifie que le post appartient bien à l'utilsateur
          if (post.userId != req.auth.userId) {
              res.status(403).json({ message : 'unauthorized request.'});
          } else {
              if (req.file){
//On supprime l'ancienne image
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {});
              }
//Enfin on modifie le post
              Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Objet modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

//Fonction pour supprimer un post
exports.deletePost = (req, res, next) => {
//On récupère le post dans la base de donnée
  Post.findOne({ _id: req.params.id})
      .then(post => {
//On vérifie que le post appartient bien à l'utilsateur
          if (post.userId != req.auth.userId) {
              res.status(403).json({ message : 'unauthorized request.'});
          } else {
//On supprime l'image
              const filename = post.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
//Enfin on supprime le post de la base de donnée
                  Post.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

//Fonction qui renvoie un post
exports.getOnePost = (req, res, next) => {
//On récupère le post dans la base de donnée
  Post.findOne({
    _id: req.params.id
  }).then(
//On renvoie le post dans la réponse
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

//Fonction qui renvoie toutes les posts
exports.getAllPost = (req, res, next) => {
//On récupère les posts dans la base de donnée
  Post.find().then(
//On renvoie les posts dans la réponse
    (posts) => {
      res.status(200).json(posts);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

//Fonction pour like/dislike un post
exports.likePost = (req, res, next) => {
//On récupère les posts dans la base de donnée
  Post.findOne({_id: req.params.id})
      .then((post) => {
//Si la requète nous demande de remettre à zéro on cherche puis supprime l'identifiant dans les tableaux
          if(req.body.like == 0){
              for( var i = 0; i < post.usersDisliked.length; i++){ 
                  if ( post.usersDisliked[i] === req.body.userId) { 
                    post.usersDisliked.splice(i, 1);
                    post.dislikes--;
                  }
              }
              for( var i = 0; i < post.usersLiked.length; i++){ 
                  if ( post.usersLiked[i] === req.body.userId) { 
                    post.usersLiked.splice(i, 1); 
                    post.likes--;
                  }
              }
          }
//Si la requète nous demande de like on rajoute dans le tabeau correspondant et on augmente de 1 les likes
          if (req.body.like == 1){
              post.usersLiked.push(req.body.userId);
              post.likes++;
          }
//Si la requète nous demande de dislike on rajoute dans le tabeau correspondant et on augmente de 1 les dislikes
          if (req.body.like == -1){
              post.usersDisliked.push(req.body.userId);
              post.dislikes++;
          }
//Enfin on sauvegarde la modification dans la base de donnée
          post.save()
          .then(() => { res.status(201).json({message: 'Like modifié !'})})
          .catch(error => { res.status(400).json( { error })})
      })
};