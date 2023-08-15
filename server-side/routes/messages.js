const express = require('express');
const _ = require('lodash');
const adminAuth = require('../middleware/adminAuth');
const { Message, validateMessage } = require('../models/message');
const router = express.Router();

router.get('/', adminAuth ,async (req, res) => {
    const messages = await Message.find(req.body.id);
    res.send(messages);
})
router.delete('/:id', adminAuth ,async (req, res) => {
    const message = await Message.findByIdAndRemove(req.params.id);
    res.send(message);
})
router.post('/', async (req, res) => {
    const {error} = validateMessage(req.body);
    if(error) res.status(400).send(error.details[0]);
    const message = new Message(req.body);
    await message.save();
    res.send(message);
})

module.exports = router;