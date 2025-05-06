const { response } = require("express");

const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const getAll = async (req, res = response) => {
    const regex = RegExp(req.params.search, 'i');

    try {
        const [users, hospitals, doctors] = await Promise.all([
            User.find({ name: regex }),
            Hospital.find({ name: regex }),
            Doctor.find({ name: regex })
        ])

        res.json({
            ok: true,
            users,
            hospitals,
            doctors
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }

}

const getAllFromCollection = async (req, res = response) => {
    const { collection, search } = req.params;
    const regex = RegExp(search, 'i');

    let data = [];

    try {

        switch (collection) {
            case 'users':
                data = await User.find({ name: regex })
                break;

            case 'hospitals':
                data = await Hospital.find({ name: regex })
                    .populate('user', 'name img');
                break;

            case 'doctors':
                data = await Doctor.find({ name: regex })
                    .populate('user', 'name img')
                    .populate('hospital', 'name img');
                break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'The collection must be one of these: /users, /hospitals, /doctors'
                })
        }

        res.json({
            ok: true,
            result: data
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }

}

module.exports = {
    getAll, getAllFromCollection
}