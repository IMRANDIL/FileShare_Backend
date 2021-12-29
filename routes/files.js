const router = require('express').Router();
const multer = require('multer');
const path = require('path')
const File = require('../models/file')
const { v4: uuid4 } = require('uuid');



let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
    }
})


let upload = multer({
    storage: storage,
    limit: { fileSize: 1000000 * 100 }


}).single('myfile')






router.post('/', (req, res) => {



    //Store File

    upload(req, res, async (err) => {
        // validate Request
        if (!req.file) {
            return res.json({ err: `All Fields are Required.` })
        }




        if (err) {
            return res.status(500).send({ error: err.message })
        }

        //Store into Database

        const file = new File({
            fileName: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size

        });
        //Response..send Link
        const response = await file.save();
        return res.json({ file: `${process.env.APP_URI}/files/${response.uuid}` })



    })




});


router.post('/send', async (req, res) => {
    const { uuid, emailTo, emailFrom } = req.body;
    //Validate Request

    if (!uuid || !emailTo || !emailFrom) {
        return res.status(422).send({ error: 'All fields are required' });
    }

    // Get data from database..

    const file = await File.findOne({ uuid: uuid });
    if (file.sender) {
        return res.status(422).send({ error: 'Email Already Sent' });
    }

    file.sender = emailFrom;
    file.receiver = emailTo;
    const response = await file.save();

    //send email..
    const sendMail = require('../services/email')

    sendMail({
        from: emailTo,
        to: emailFrom,
        subject: 'inShare FileSharing',
        text: `${emailFrom} shared a file with you.`,
        html: require('../services/emailTemplate')({
            emailFrom: emailFrom,
            downloadLink: `${process.env.APP_URI}/files/${file.uuid}`,
            size: `${parseInt(file.size / 1000)}KB`,
            expires: `24 hours`

        })
    })


})



module.exports = router;