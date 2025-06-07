const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const JWTValidation = (req, res, next) => {
    // Read the token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is missing in the request'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        })
    }
}

const adminRoleValidation = async (req, res = response, next) => {
    const { uid } = req;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User does not exist in the database'
            });
        }

        if (userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'Unauthorized'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Invalid request'
        })
    }

}


module.exports = {
    JWTValidation, adminRoleValidation
};