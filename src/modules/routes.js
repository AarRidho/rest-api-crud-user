const express = require('express');
const router = express.Router();

const authRouter = require('./auth').router;
const usersRouter = require('./users').router;

router.get('/', (req, res, /* next */) => res.render('index', { title: 'Express' }));

router.use('/auth', authRouter);
router.use('/users', usersRouter);

module.exports = router;