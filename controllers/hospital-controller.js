const { response } = require("express");

const getHospitals = async (req, res = response) => {
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

const createHospital = async (req, res = response) => {
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