const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const { config } = require('../config/config');
const UserService = require('../services/users.service');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');

const userService = new UserService();

class AuthService {

    construction() {

    }

    async getUser(email, password) {
        const user = await userService.findByEmail(email);
        if (!user)
            throw new boom.unauthorized();
        const matches = await bcrypt.compare(password, user.password);
        if (!matches)
            throw new boom.unauthorized();
        delete user.dataValues.password;
        delete user.dataValues.recoveryToken;
        return user;
    }

    signToken(user) {
        const payload = {
            id: user.id,
            role: user.role
        };
        const secret = config.jwtSecret;
        const token = jwt.sign(payload, secret);
        return token;
    };

    async sendRecovery(email) {
        const user = await userService.findByEmail(email);
        const payload = { sub: user.id };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
        const link = `https://www.myfrontend.com/auth/password-recovery?token=${token}`;
        userService.update(user.id, { recovery_token: token });
        const mail = {
            to: user.dataValues.email,
            from: config.mailSender,
            subject: "Password recovery for Cinema0",
            html: `<b>Hi ${user.name}! If you are trying to recover your password, please click <a href=${link}>here </a> </b>`,
        };
        await userService.update(user.id, {recoveryToken: token});
        await this.sendMail(mail);
        return { message: 'Email sent' };
    }

    async sendMail(mail) {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports (587)
            
            auth:
            {
                user: config.mailSender,
                pass: config.mailSenderPass
            },
        });
        let info = await transporter.sendMail(mail);
    }

    async changePassword(password, token) {
        try{
        const payload = jwt.verify(token, config.jwtSecret);
        if(!payload)
            throw new boom.unauthorized();
        const id = payload.sub;
        if(!id)
            throw new boom.unauthorized();
        const user = await userService.findOne(id);
        if(user.recoveryToken !== token)
            throw new boom.unauthorized();
        const updatedUser = await userService.update(id, {recovery_token: null, password: password});
        return updatedUser;
        } catch(err){
            throw boom.unauthorized();
        }
    }
};

module.exports = AuthService;