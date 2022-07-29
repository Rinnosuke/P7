const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Fonction pour sauvegarder les images
const storage = multer.diskStorage({
//On choisit le dossier images pour sauvegarder
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
//On reprend le nom de fichier en remplacent les espaces par des '_' et on rajoute une timestamp pour éviter les doublons
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
// On précise qu'on ne prend que les fichiers images
module.exports = multer({storage: storage}).single('image');