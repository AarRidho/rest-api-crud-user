const router = require('express').Router();
const controllers = require('./controllers');

// POST /login
router.post('/login', controllers.login);

// POST /token
router.post('/token', controllers.generateAccessToken);

// GET /revoke
router.post('/revoke', controllers.revokeRefreshToken);

module.exports = router;
