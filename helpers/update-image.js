const fs = require('fs');

const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const getDocumentDB = async (type, id) => {
    switch (type) {
        case 'users':
            return await User.findById(id);

        case 'hospitals':
            return await Hospital.findById(id);

        case 'doctors':
            return await Doctor.findById(id);
    }
}

const updateImage = async (documentDB, type, fileName) => {

    const oldPath = `./uploads/${type}/${documentDB.img}`;
    if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
    }

    documentDB.img = fileName;
    await documentDB.save();

    return true;
}


module.exports = {
    updateImage, getDocumentDB
}