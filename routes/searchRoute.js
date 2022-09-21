const express = require('express')
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
module.exports = router;