const router = require('express').Router();

router.get('/', (req, res) => {
    return res.json({ message: 'welcome', status: 200 });
});

module.exports = router;
