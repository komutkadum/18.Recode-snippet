const express = require('express');
const profileModel = require('../models/profileModel');
const router = express.Router();
const SnippetModel = require('../models/snippetModel')

router.post('/',async(req,res)=>{
    const { searchValue,userId } = req.body;
    try{
        const data = await SnippetModel.find({title : {$regex: `${searchValue}`,$options : 'i'},userId:userId});
        res.send({data,message:"success"});
    }catch(err){
        res.send("Error occured at search route line 11 "+err)
    }
})

router.get('/other',async(req,res)=>{
    const {search} = req.query;
    try{
        const data = await profileModel.find({name : {$regex: `${search}`,$options : 'i'}});
        res.send({data,message:"success"});
    }catch(err){
        res.send("Error occured at search route line 22 "+err)
    }
})


module.exports = router;