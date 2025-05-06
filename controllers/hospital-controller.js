const { response } = require("express");

const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {

    try {
        const hospitals = await Hospital.find().populate('user', 'name img')

        res.json({
            ok: true,
            hospitals
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })

    }
}

const createHospital = async (req, res = response) => {
    const { uid } = req;
    const hospital = new Hospital({ user: uid, ...req.body });

    try {
        const hospitalSaved = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalSaved
        })

    } catch (error) {
        console.log(error);
        res.status(402).json({
            ok: false,
            msg: 'Unexpected error'
        })

    }
}

const updateHospital = async (req, res = response) => {
    try {
        res.json({
            ok: true,
            msg: 'All good'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })

    }
}

const deleteHospital = async (req, res = response) => {
    try {
        res.json({
            ok: true,
            msg: 'All good'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })

    }
}

module.exports = {
    getHospitals, createHospital, updateHospital, deleteHospital
}