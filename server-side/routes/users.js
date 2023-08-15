const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate, validateCards, validateUser, validatePassword } = require('../models/user');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const { Card } = require('../models/card');
const { token } = require('morgan');
const multer = require('multer');
const { toLower } = require('lodash');
const fs = require('fs');
const path = require('path');
const router = express.Router();
require('dotenv').config();
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const s3 = new aws.S3();

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
    fileFilter: fileFilter,
});





const upload = multer({ storage }).single('image');


router.get('/me', adminAuth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});
router.get('/use/:id', auth, async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    res.send(user);
});
router.get('/admin/:id', auth, async (req, res) => {
    const admin = await User.findById(req.params.id).select('admin');
    res.send(admin);
});



router.put('/admin/:id', adminAuth, async (req, res) => {
    let user = await User.findById(req.params.id)
    const updateUser = await User.findOneAndUpdate({ _id: req.params.id }, {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        admin: req.body.admin,

    })
    res.send(updateUser)
})




router.get('/get-users', async (req, res) => {
    let users = await User.find().select('-password')
    res.send(users)
})

router.delete('/:id', adminAuth, async (req, res) => {
    let user = await User.findByIdAndRemove(req.params.id);
    res.send(user)
})



router.put('/update/:id', auth, upload, async (req, res) => {
    if (req.user._id !== req.params.id) res.status(400).send('Access denied!')
    const params = req.body
    if (req.file) {
        params.image = req.file.location;
    };
    const { error } = validate(params);
    if (error && error !== 'password is required') return res.status(400).send(error.details[0].message);
    let user = await User.findByIdAndUpdate((req.user._id), params);
    user.email = req.body.email.toLowerCase();
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
});
router.post('/password', auth, async (res, req) => {
    let user = await User.findById(req.user._id);
    const validatePassword = validatePassword(req.body);
    const validateOldPassword = bcrypt.compare(req.body.oldPassword, user.password);
    if (!validatePassword || !validateOldPassword) res.status(400).send('error! please check you new password is proper and your old password is correct');
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.newPassword, salt);
    user = await User.findByIdAndUpdate(req.user._id, password);
    res.send(user)
})

router.post('/', adminAuth, upload, async (req, res) => {
    const params = req.body
    params.image = req.file.location;
    const { error } = validateUser(params);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user) return res.status(400).send('.האימייל הזה בשימוש');
    if (params.email === 'hananfruman547@gmail.com') params.admin = true;
    else params.admin = false;
    user = new User(_.pick(params, ['name', 'email', 'password', , 'image', 'about_writer', 'admin']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
})

module.exports = router