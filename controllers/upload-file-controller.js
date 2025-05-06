const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { updateImage, getDocumentDB } = require('../helpers/update-image');

const fileUpload = async (req, res = response) => {
    const { type, id } = req.params;
    const validTypes = ['doctors', 'hospitals', 'users'];

    // Validate type
    if (!validTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'Invalid type, it must be one of these: doctors, hospitals, users'
        })
    }

    // Validate if the id exists in the DB collection
    const documentDB = await getDocumentDB(type, id);
    if (!documentDB) {
        return res.status(400).json({
            ok: false,
            msg: 'The id does not exist in the specified collection'
        })
    }

    // File was uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }

    // Process image
    const file = req.files.image;

    const trucatedName = file.name.split('.');
    const fileExtension = trucatedName[trucatedName.length - 1];

    // Validate extension
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtensions.includes(fileExtension)) {
        return res.status(400).json({
            ok: false,
            msg: 'Invalid file type, it must be image format'
        })
    }

    // Generate file name
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Path to save the img
    const uploadPath = `./uploads/${type}/${fileName}`;

    file.mv(uploadPath, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error moving the image'
            });
        }

        // Update database
        const imageUpdated = await updateImage(documentDB, type, fileName);

        if (imageUpdated) {
            res.json({
                ok: true,
                msg: 'File uploaded',
                fileName
            });
        }

    });
}

getImage = (req, res = response) => {
    const { type, image } = req.params;

    const pathImg = path.join(__dirname, `../uploads/${type}/${image}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, '../uploads/no-img.jpg');
        res.sendFile(pathImg);
    }

}

module.exports = {
    fileUpload, getImage
}