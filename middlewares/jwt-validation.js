const jwt = require('jsonwebtoken');

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

module.exports = {
    JWTValidation
};