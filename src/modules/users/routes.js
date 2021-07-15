const router = require('express').Router();

const ROLES = require('../../constants/roles');
const controllers = require('./controllers');
const authorize = require('../../middlewares/authorize');

router.get('/all', authorize(ROLES.ADMIN), controllers.getAllUsers);
router.post('/create', authorize(ROLES.ADMIN), controllers.createUser);
router.get('/id/:id', authorize([ROLES.ADMIN, ROLES.USER]), controllers.getUserById);
router.delete('/id/:id', authorize([ROLES.ADMIN, ROLES.USER]), controllers.deleteUserById);
router.patch('/id/:id', authorize([ROLES.ADMIN, ROLES.USER]), controllers.updateUserById);

module.exports = router;
