const express = require('express');
const product = require('../models/Products'); 
const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const { productName, productPrice, productUnit, productDescription } = req.body;

        const productExist = await product.findOne({ productName }); 

        if (productExist) {
            return res.json({
                status: false,
                message: 'product already exists'
            });
        }

        const proObj = new product({ productName, productPrice, productUnit, productDescription });
        await proObj.save(); 

        res.json({
            status: true,
            message: 'Product added successfully'
        });

    } catch (err) {
        res.json({
            status: false,
            message: `Error: ${err.message}`
        });
    }
});


router.get('/get', async (req, res) => {
    try {
       
        const result = await product.find()

        res.json({
            status: true,
            message:result,
             
        });
    } catch (err) {
        res.json({
            status: false,
            message: `Error: ${err.message}`
        });
    }
});

module.exports = router;
