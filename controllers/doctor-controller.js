const { response } = require("express");

const Doctor = require('../models/doctor');

const getDoctors = async (req, res = response) => {
    try {
        const doctors = await Doctor.find()
            .populate('user', 'user name')
            .populate('hospital', 'hospital name');

        res.json({
            ok: true,
            doctors
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })

    }
}

const createDoctor = async (req, res = response) => {
    const { uid } = req;
    const doctor = Doctor({ user: uid, ...req.body });

    try {
        const doctorSaved = await doctor.save();
        res.json({
            ok: true,
            doctor: doctorSaved
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
}

const updateDoctor = async (req, res = response) => {
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

const deleteDoctor = async (req, res = response) => {
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
    getDoctors, createDoctor, updateDoctor, deleteDoctor
}