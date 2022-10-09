const express = require('express')
const router = express.Router();
const SnippetModel = require('../models/snippetModel')

// simpe route for snippet in snippet.js
router.get('/:id',async(req,res)=>{
    const id = req.params.id;
    // destructure page and limit and set default values
    const { page =1 } = req.query;
    const limit = 6;

    try{
        const myLists = await SnippetModel.find({userId : id}).limit(limit * 1).sort({ _id: -1 }).skip((page - 1) * limit).exec();
        // const myLists = await SnippetModel.find({userId : id}).sort({ _id: -1 });
        // get total documents in the Posts collection  
        const count = await SnippetModel.countDocuments();

        res.status(200).send({myLists,totalPages: Math.ceil(count / limit),
        currentPage: page})
    }catch(err){
        res.status(500).send(err);
    }
})

// for checking if snippet exist in addcode
router.get('/:userid/:snippetid',async(req,res)=>{
    const userid = req.params.userid;
    const snippetid = req.params.snippetid;
    try{
        const myLists = await SnippetModel.find({userId : userid,_id: snippetid});
        res.send(myLists)
    }catch(err){
        console.log(err);
        res.status(500).send("Error in line 16 snippet route" +err);
    }
})

// for searching tags for user in snippet.js
router.get('/:userid/:search/:tags',async(req,res)=>{
    const {userid,search,tags} = req.params;
    try{
        const myLists = await SnippetModel.find({userId : userid,tags:tags});
        res.status(200).send(myLists)
    }catch(err){
        res.status(500).send("Error in line 30 snippet route "+err);
    }
})

// posting snippte in addcode
router.post('/',async(req,res)=>{
    const { title,snippet,language,tags,userId } = req.body;
    const snippetD = new SnippetModel({
        userId: userId,
        title : title,
        snippet : snippet,
        tags :tags,
        language : language, 
    })
    try{
        await snippetD.save()
        res.status(201).send({message : "success"})
    }catch(err){
        res.send(err)
    } 
})

// deleting snippet code in snippet.js
router.delete('/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        await SnippetModel.findByIdAndDelete(id);
        res.send({message : "delete success"})
    }catch(err){
        console.log(err);
        res.send(err);
    }
})

// updating snippet code for the curent user in addcode
router.put('/:id',async(req,res)=>{
    const snippetId = req.params.id;
    const { title,snippet,language,tags,userId } = req.body;
    try{
        await SnippetModel.findOneAndUpdate({userId:userId,_id:snippetId},{
            userId: userId,
            title : title,
            snippet : snippet,
            tags :tags,
            language : language, 
        })
        res.send({message : "success"})
    }catch(err){
        res.send(err)
    } 
})



module.exports = router;