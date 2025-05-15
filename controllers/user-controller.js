const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');
const User = require('../models/user');

const getUsers = async (req, res) => {

    const from = Number(req.query.from) || 0;

    const [users, total] = await Promise.all([
        User.find({}, 'name email role google img')
            .skip(from)
            .limit(5),
        User.countDocuments()
    ]);

    res.json({
        ok: true,
        users,
        uid: req.uid,
        total
    })
}

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'The email is already registered'
            });
        }

        const user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Token creation - JWT
        const token = await generateJWT(user.id);


        res.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error... check logs'
        })
    }
}

const updateUser = async (req, res) => {
    // TODO Validate token and check if the user is correct
    const uid = req.params.id;

    try {
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Bad request, user with the specified id does not exists'
            });
        }

        // Update
        const { password, google, email, ...fields } = req.body;
        if (userDB.email !== email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'The email is already registered'
                });
            }
        }

        if (!userDB.google) {
            fields.email = email;
        } else if (userDB.email !== email) {
            return res.status(400).json({
                ok: false,
                msg: 'Google users cannot change their email througth the app'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            user: updatedUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

deleteUser = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Bad request, user with the specified id does not exists'
            });
        }

        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'User deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

module.exports = {
    getUsers, createUser, updateUser, deleteUser
}