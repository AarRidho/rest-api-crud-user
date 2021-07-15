const router = require('express').Router();
const result = require('../../utils/helpers/result');

router.get('/', (req, res) => result.response(res, 200, 'welcome'));

module.exports = router;
