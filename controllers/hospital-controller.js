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
    const { uid } = req;
    const { id } = req.params;

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital does not exist'
            })
        }

        const updatedValues = {
            ...req.body,
            user: uid
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(id, updatedValues, { new: true })

        res.json({
            ok: true,
            hospital: updatedHospital
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
    const { id } = req.params

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital does not exist'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital deleted'
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