const passport = require('passport');

const isEmptyObject = require('../utils/helpers/isEmptyObject');
const result = require('../utils/helpers/result');
const users = require('../models/User');

module.exports = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        (req, res, next) => passport.authenticate('jwt', { session: false }, function (err, user) {
            // If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
            // console.log(err);
            // console.log(user);
            if (err) return result.error(res, err);
            if (!user || isEmptyObject(user)) {
                return result.error(res, { message: 'Unauthorized', status: 401 });
            } else {
                req.user = user;
                return next();
            }
        })(req, res, next),
        async (req, res, next) => {
            try {
                const idUser = req.user._id;
                const user = await users.findById(idUser);

                if (!user || !roles.includes(user.role)) throw { message: 'Unauthorized', status: 401 };

                next();
            } catch (error) {
                return result.error(res, error);
            }
        }
    ];
};