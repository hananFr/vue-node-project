const path = require('path');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const multer = require('multer');
const adminAuth = require('../middleware/adminAuth');
const { productValidate, Product } = require('../models/product');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        console.log(path);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: fileFilter
}).single('image')


router.get('/', async (req, res) => {
    const products = await Product.find(req.body.id)
    res.send(products)
})

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.send(product)
})

router.get("/image/:id", async (req, res) =>{
    let product = await Product.findById(req.params.id)
    let url;
    if(product) url = product.image;

    
    fs.readFile(url, function(err, data) {
        if (err) console.log(err); 
          res.writeHead(200, {'Content-Type': 'image/jpeg'});
          res.end(data); 
      });
})

router.put('/update/:id', adminAuth, upload, async (req, res) => {
    let params = req.body;
    if(req.file){
        const product = await Product.findById(req.params.id);
        try{
        fs.unlinkSync(product.image);
        console.log('file deleted');
        } catch(err){
            console.log(err);
        }
        params.image = path.join(__dirname, `../${req.file.path}`);
    }
    const { errors } = productValidate(params);
    if(errors) res.status(400).send('Requset denied!')
    const product = await Product.findByIdAndUpdate((req.params.id), params);
    await product.save()
    res.send('updated')

})

router.post('/upload', adminAuth, upload, async (req, res) => {
    const params = req.body
    params.image =  `https://yoav-herman-website.herokuapp.com/${req.file.path}`
    const { errors } = productValidate(params);
    if(errors) res.status(400).send('Requset denied!')
    const product = new Product(params)
    await product.save()
    res.send('new product')
})


router.delete('/:id', adminAuth, async (req, res) => {
    const product = await Product.findOneAndRemove({ _id: req.params.id});
    if (!product) return res.status(404).send('.המספר המזהה לא נמצא');
    res.send(product);
})

module.exports = router;