const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {Commit, validateCommit} = require('../models/commit')
const adminAuth = require('../middleware/adminAuth');





router.get('/', async (req, res) =>{
    const commits = await Commit.find(req.body.id);
    res.send(commits)
})

router.get('/:id', async (req, res) =>{
    const commit = await Commit.findById(req.params.id);
    res.send(commit)
})

router.post('/', adminAuth , async (req, res) => {        
    console.log(req.body);
    let commit = new Commit (req.body);
 
res.send(await commit.save());
})

router.delete('/:id', adminAuth, async (req, res) => {
    const commit = await Commit.findByIdAndRemove(req.params.id);
    if (!commit) return res.status(404).send('.המספר המזהה לא נמצא');
    res.send(commit);
})

module.exports = router;