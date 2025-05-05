const { response } = require('express');
const bcrypt = require('bcryptjs')

const { generateJWT } = require('../helpers/jwt');
const User = require('../models/user');

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
            res.status(400).json({
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

module.exports = {
    login
}