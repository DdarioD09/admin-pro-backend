const { response } = require('express');
const bcrypt = require('bcryptjs')

const { generateJWT } = require('../helpers/jwt');
const User = require('../models/user');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        // Email validation
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Email not found'
            })
        }

        // Password validation
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password is not valid'
            })
        }

        // Generate token -JWT
        const token = await generateJWT(userDB.id)

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error has ocurred'
        });
    }
}

const googleLogIn = async (req, res = response) => {
    try {
        const { email, name, picture } = await googleVerify(req.body.token);
        let user;
        const userDB = await User.findOne({ email });

        if (!userDB) {
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            user = userDB;
            user.google = true
        }

        await user.save();
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            email, name, picture,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Google token is not correct'
        });
    }
}

const renewToken = async (req, res = response) => {
    const { uid } = req;
    try {
        const token = await generateJWT(uid);
        const user = await User.findById(uid);
        res.json({
            ok: true,
            token,
            user
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'User not found'
        })
    }
}

module.exports = {
    login, googleLogIn, renewToken
}