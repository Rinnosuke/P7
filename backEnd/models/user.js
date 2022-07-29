const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//On crée notre modèle d'utilsateur avec Mongoose en s'assurant que l'email n'est pas utilisé
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);