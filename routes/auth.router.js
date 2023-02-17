const express = require('express');
const passport = require('passport');
const { config } = require('./../config/config');
const AuthService = require('../services/auth.service');
const validationHandler = require('../middlewares/validation.handler');
const { passwordRecoverySchema, loginSchema, changePasswordSchema } = require('../schemas/auth.schema');

const router = express.Router();
const service = new AuthService();
 
router.post('/login',
    validationHandler(loginSchema, 'body'),
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user;
            const token = service.signToken(user);
            delete user.dataValues.password;
            res.status(200).json({
                user,
                token
            });
        } catch (e) {
            next(e);
        }
    });

router.post('/recovery',
    validationHandler(passwordRecoverySchema, 'body'),
    async (req, res, next) => {
        const { email } = req.body
        try {
            const rta = await service.sendRecovery(email);
            res.status(200).json(rta);
        } catch (err) {
            next(err);
        }
});

router.post('/change-password',
validationHandler(changePasswordSchema, 'body'),
    async (req, res, next) => {
        const { password, token } = req.body
        try {
            const rta = await service.changePassword(password, token);
            res.status(200).json(rta);
        } catch (err) {
            next(err);
        }
});

module.exports = router;

