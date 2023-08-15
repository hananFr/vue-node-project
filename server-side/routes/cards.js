const express = require('express');
const _ = require('lodash');
const { Card, validateCard, generateTravelNumber, validateUpdateCard } = require('../models/card');
const auth = require('../middleware/auth');
const admin = require('../middleware/adminAuth');
const router = express.Router();
const multer = require('multer');
const { User } = require('../models/user');
const fs = require('fs');
const path = require('path');
const adminAuth = require('../middleware/adminAuth');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const s3 = new aws.S3();
require('dotenv').config();

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

s3.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    region: 'eu-west-3'
})


const storage = multerS3({
    s3: s3,
    bucket: 'hatiyul',
    acl: 'public-read',
    key: function (req, file, cb) {
        cb(null, Date.now().toString() + file.originalname);
    },
    fileFilter: fileFilter
});





const upload = multer({ storage }).single('travelImage');





router.get("/image/:id", async (req, res) => {
    let card = await Card.findOne({ _id: req.params.id });
    let url;
    if (card) {
        url = card.travelImage;
    }

    fs.readFile(url, function (err, data) {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data);
    });
})


router.get('/website', async (req, res) => {
    const currentDate = new Date();
    const cards = await Card.find({ travelDate: { $gt: currentDate } }).limit(3).sort({ travelDate: '1' });
    res.send(cards);
})


router.get("/my-cards", async (req, res) => {
    const currentDate = new Date();
    const cards = await Card.find({ travelDate: { $gt: currentDate } }).sort({ travelDate: '-1' });
    res.send(cards);
})

router.delete('/:id', adminAuth, async (req, res) => {
    const card = await Card.findOneAndRemove({ _id: req.params.id });
    if (!card) return res.status(404).send('.המספר המזהה לא נמצא');
    res.send(card);
});

router.put('/:id', adminAuth, upload, async (req, res) => {
    let params = req.body;
    if (req.file) {
        params.travelImage = req.file.location;
    }
    else params.travelImage = req.body.travelImage
    const { error } = validateCard(params);
    if (error) return res.status(400).send(error.details[0].message);
    let card = await Card.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, {
        travelName: req.body.travelName,
        travelDescription: req.body.travelDescription,
        travelAddress: req.body.travelAddress,
        travelImage: params.travelImage,
        travelCategory: req.body.travelCategory,
        travelDate: req.body.travelDate,
    });
    if (!card) return res.status(404).send('.המספר המזהה לא נמצא');
    res.send(card);


})

router.get('/:id', async (req, res) => {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send('.המספר המזהה לא נמצא');
    res.send(card);

})

router.get('/date/:id', async (req, res) => {
    const date = new Date(req.params.id)
    const events = await Card.find({ travelDate: date })
    res.send(events)
})


router.get("/category/:id", async (req, res) => {

    let category;
    if (req.params.id === 'schools') {
        category = 'בתי ספר'
    }
    if (req.params.id === 'groups') {
        category = 'קבוצות'
    }
    if (req.params.id === 'couples') {
        category = 'זוגות'
    }
    if (req.params.id === 'families') {
        category = 'משפחות'
    }
    const newDate = new Date()
    const cards = await Card.find({ travelCategory: category, travelDate: { $gte: `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}` } }).sort({ travelDate: 1 });
    res.send(cards);



})


router.post('/uploads', auth, upload, async (req, res) => {
    const { error } = validateCard(req.body);
    const file = req.file.location
    if (error) return res.status(400).send(error.details[0].message);
    let card = new Card(
        {
            travelName: req.body.travelName,
            headerContext: req.body.headerContext,
            travelDescription: req.body.travelDescription,
            travelAddress: req.body.travelAddress,
            travelImage: req.file.location,
            travelCategory: req.body.travelCategory,
            travelNumber: await generateTravelNumber(Card),
            travelDate: req.body.travelDate,
            user_id: req.user._id
        }
    );
    post = await card.save()
    res.send(post);

});

module.exports = router;
