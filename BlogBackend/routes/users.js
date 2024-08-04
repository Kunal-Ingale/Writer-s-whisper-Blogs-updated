const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt')

//update
router.put('/:id',async (req,res)=>{ 
    if(req.body.userId === req.params.id){
     if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash( req.body.password,salt);
     }
   try {
    
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set : req.body    // New data to replace the existing document MongoDB
                           // you want to update the document by replacing its contents with the data provided in req.body.
    },{new : true})      // To return the updated document after the update operation
    res.status(200).json(updatedUser)
    
   } 
  
   catch (error) {
      // console.log("SOmething is wrong");
      
    res.status(500).json(error);
   }}
   else{
    res.status(401).json("You can only update yours info")
   }
})    


router.get('/:id',async (req,res)=>{
  
   try {
      const user = await User.findById(req.params.id)
      const {password,...others} = user._doc;
      res.status(200).json(others)
   } catch (error) {
      res.status(500).json(error)
   }
})

module.exports = router;
