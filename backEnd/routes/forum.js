const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const forumCtrl = require('../controllers/forum');

//On appelle les middlewares correspondants aux routes utilisés
router.get('/', auth, forumCtrl.getAllPost);
router.post('/', auth, multer, forumCtrl.createPost);
router.get('/:id', auth, forumCtrl.getOnePost);
router.put('/:id', auth, multer, forumCtrl.modifyPost);
router.delete('/:id', auth, forumCtrl.deletePost);
router.post('/:id/like', auth, forumCtrl.likePost);

module.exports = router;