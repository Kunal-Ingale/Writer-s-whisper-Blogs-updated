const router = require('express').Router()
const category= require('../models/Category')
const verifyToken = require('../Middleware/VerifyToken'); 

router.post('/',verifyToken,async(req,res)=>{
    const newCat = new category(req.body)
    try {
        const savedCat = await newCat.save()
        res.status(200).json(savedCat)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/', async(req,res)=>{
try
{
   const getCat = await category.find()
   res.status(200).json(getCat)
}catch(err){
    res.status(500).json(err)
}
})

module.exports =router;