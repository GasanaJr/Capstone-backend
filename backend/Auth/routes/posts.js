const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
// const multer = require('multer');
// const path = require('path');
const verify = require('./verifyRoute');

// Storage for images

// var storage = multer.diskStorage({
//     destination: function(req,file,cb) {
//         cb(null, 'Images/');
//     },
//     filename: function(req,file,cb) {
//         let ext = path.extname(file.originalname);
//         cb(null, Date.now() + ext);
//     }
// });



// Images

// var image = multer({
//     storage:storage
// });

/** 
* @swagger
* /posts:
*  get:
*    summary: Getting all posts
*    tags: [Posts]
*    description: Returns all posts
*    responses:
*     200:
*       description: These are all Posts available on the blog
*       content:
*         application/json:
*           schema:
*             type: array
*/

// ALL POSTS
router.get('/', async(req,res) => {
   // res.send("We are on posts");
   try {
    const posts = await Post.find();
    res.json(posts);
   } catch (err) {
    res.json({message: err});
   }
});

// CREATE A POST

/** 
* @swagger
* /posts:
*  post:
*    summary: Creating a new post
*    tags: [Posts]
*    description: Creates a post
*    requestBody:
*      description: Provide Blog details
*      content:
*          application/json:
*            schema:
*              type: object
*              properties: 
*                title:
*                  type: string
*                description:
*                  type: string
*                imageUrl:
*                  type: string
*    responses:
*     200:
*       description: Post Created Successfully
*       content:
*         application/json:
*           schema:
*             type: array
*     400:
*       description: Post not created
*       content:
*         application/json:
*           schema:
*             type: array
*/

router.post('/', async (req,res) => {
     const post = new Post({
         title: req.body.title,
         description: req.body.description
     });
     if(req.file) {
        post.Image = req.file.path;
     }
     try {
    const savedPost = await post.save();
     res.json(savedPost);
     }catch(err) {
        res.json({message: err});
     }
});

/** 
* @swagger
* /posts/{postId}:
*  get:
*    summary: Getting specific posts
*    tags: [Posts]
*    description: Returns a specific posts
*    parameters:
*      - name: postId
*        description: Id of the post needed
*        in: path
*        required: true    
*    responses:
*     200:
*       description: This is the post you requested
*       content:
*         application/json:
*           schema:
*             type: array
*     400:
*       description: Post not available
*       content:
*         application/json:
*           schema:
*             type: array
*/



//SPECIFIC POST
router.get('/:postId', async(req,res) => {
    try{
    const post = await Post.findById(req.params.postId);
    res.json(post);
    }catch(err) {
        res.json({message: err});
    }
});

// DELETE POST
/** 
* @swagger
* /posts/{postId}:
*  delete:
*    summary: Deleting a specific post
*    tags: [Posts]
*    description: Deletes a specific posts
*    parameters:
*      - name: postId
*        description: Id of the post needed
*        in: path
*        required: true    
*    responses:
*     200:
*       description: Post deleted
*       content:
*         application/json:
*           schema:
*             type: array
*     400:
*       description: Post not available
*       content:
*         application/json:
*           schema:
*             type: array
*/

router.delete('/:postId', async(req,res) => {
    try{
    const deletedPost = await Post.remove({ _id: req.params.postId });
    res.json(deletedPost);
    }catch(err) {
        res.json({message: err});
    }
});


// UPDATE POST

/** 
* @swagger
* /posts:
*  patch:
*    summary: Updating a post
*    tags: [Posts]
*    description: Updates a post
*    parameters:
*      - name: postId
*        description: Id of the post needed
*        in: path
*        required: true  
*    requestBody:
*      description: Provide new post details
*      content:
*          application/json:
*            schema:
*              type: object
*              properties: 
*                title:
*                  type: string
*                description:
*                  type: string
*                imageUrl:
*                  type: string
*    responses:
*     200:
*       description: Post Updated Successfully
*       content:
*         application/json:
*           schema:
*             type: array
*     400:
*       description: Post not Found
*       content:
*         application/json:
*           schema:
*             type: array
*/

router.patch('/:postId', async(req,res) => {
    try{
    const updatedPost = await Post.updateOne(
        { _id: req.params.postId },
        {$set: {title:req.body.title}}
        );
    res.json(updatedPost);
    }catch(err) {
        res.json({message: err});
    }
});








module.exports = router;