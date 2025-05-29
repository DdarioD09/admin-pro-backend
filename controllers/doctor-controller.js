const { response } = require("express");

const Doctor = require('../models/doctor');

const getDoctors = async (req, res = response) => {
    try {
        const doctors = await Doctor.find()
            .populate('user', 'user name img')
            .populate('hospital', 'hospital name img');

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
    const { id } = req.params;
    const { uid } = req

    try {
        const doctor = await Doctor.findById(id);

        if (!doctor) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor does not exist'
            });
        }

        const updatedValues = { ...req.body, user: uid };
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, updatedValues, { new: true });

        res.json({
            ok: true,
            updatedDoctor
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
    const { id } = req.params;

    try {
        const doctor = await Doctor.findById(id);

        if (!doctor) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor does not exist'
            });
        }

        await Doctor.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Doctor deleted'
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