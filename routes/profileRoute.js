const express = require('express');
const profileModel = require('../models/profileModel');
const router = express.Router();

// getting the data of the user in the profile.js
router.get('/:id',async(req,res)=>{
    const id = req.params.id;     
    try{
        const data = await profileModel.findById(id);
        if(data!=null){
            res.send({data,message : "success",additionalMessage : "Data fetching was successful in profile route"})
            return;
        }
        res.send({message:"failed",additionalMessage : "No data was found given the id! in profile route"})
    }catch(err){
        res.send("Error in profile route get line 12 " +err)
    }
})

// saving the user  - done
router.post('/',async(req,res)=>{
    const { name, email,picture,uid} = req.body;
    console.log(typeof(uid));
    console.log(name, email,picture, uid);
    
    try{
        const check = await profileModel.exists({_id : uid})
        if(!check){
            const profileM = new profileModel({_id : uid,name,email,picture});
            await profileM.save()
            res.send({message : 'success',profileM, additionalMessage : "insertion success in profile route"})
            return;     
        }
        res.send({message:"success",additionalMessage : "User already present, Not required to insert!!"})
    }catch(err){
        res.send("Error in line 44 of profile route \n" +err);
    } 
})


module.exports = router;