const router = require('express').Router();
const File = require('../models/file')


router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if (!file) {
            return res.render('download', { err: 'Link has been expired..!' })
        }

        return res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            download: `${process.env.APP_URI}/files/download/${file.uuid}`

        })

    } catch (error) {
        return res.render('download', { err: 'Something went wrong..!' })
    }


})






module.exports = router;