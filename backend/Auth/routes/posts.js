const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const verify = require('./verifyRoute');

// Storage for images

var storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, 'Images/');
    },
    filename: function(req,file,cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});



// Images

var image = multer({
    storage:storage
});



// ALL POSTS
router.get('/', verify, async(req,res) => {
   // res.send("We are on posts");
   try {
    const posts = await Post.find();
    res.json(posts);
   } catch (err) {
    res.json({message: err});
   }
});

// CREATE A POST

router.post('/',image.single('image'),verify, async (req,res) => {
    
        const user = await User.findById(req.user.user.id).select('-password');
        const post = new Post({
          title: req.body.title,
          description: req.body.description,
          user: user.id,
          name: user.name
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
// const post = {    
//         title: req.body.title,
//         description: req.body.description
// }
// await Post.create(post).then(data => {
//     res.json(data);
//     console.log("This is executed");
// }).catch(err => {
//     res.json({ message: err});
//     console.log(err);
// });
});



//SPECIFIC POST
router.get('/:postId',verify, async(req,res) => {
    try{
    const post = await Post.findById(req.params.postId);
    res.json(post);
    }catch(err) {
        res.json({message: err});
    }
});

// DELETE POST

router.delete('/:postId',verify, async(req,res) => {
    try{
    const deletedPost = await Post.remove({ _id: req.params.postId });
    res.json(deletedPost);
    }catch(err) {
        res.json({message: err});
    }
});


// UPDATE POST

router.patch('/:postId',verify, async(req,res) => {
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

// LIKING A POST
router.put('/like/:postId',verify, async(req,res) => {
    try {
        const post = await Post.findById(req.params.postId);

        // check if post has been liked before
          if(post.likes.find(like => like.user === req.user.user.id)){
              return res.status(400).json({msg: "Post already Liked"});

          }
          console.log(post.likes.user);
        //  post.likes.unshift({user: req.user.user.id});
        //  await post.save();
        //  res.json(post.likes);
        //console.log(post);
        
     } catch (err) {
         console.error(err.message);
         res.status(500).send("Server Error");
     }
});

// UNLIKING A POST

router.put('/unlike/:postId',verify, async(req,res) => {
    try {
        const post = await Post.findById(req.params.postId);

        // check if post has been liked before
        //  if(post.likes.filter(like => like.users.toString() === req.user.id).length > 0){
        //      return res.json(400).json({msg: "Post already Liked"});
        //  }
         if (
             post.likes.filter(like => like.user === req.user.id).length === 0
         ) {
             return res.status(400).json({ msg: "Post has not been Liked yet"});
         }
        
        // Get remove index
        const removeIndex = post.likes.map(like => like.user).indexOf(req.body._id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);

        
     } catch (err) {
         console.error(err.message);
         res.status(500).send("Server Error");
     }
});

// COMMENTS

router.post('/comment/:id',verify, async(req,res) => {
    try {
        const user = await User.findById(req.user.user.id);
        const post = await Post.findById(req.params.id);
        const newComment = {
            text: req.body.text,
            name: user.name,
            user: user.id
        };
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments)
        
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/comment/:id/:comment_id', verify, async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        // GET COMMENT TO BE REMOVED
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        if(!comment) {
            return res.status(404).json({message: "Comment does not exist"});
        }

        // Check user
        // if(comment.user !== req.user.user.id) {
        //     return res.status(401).json({message: "Unauthorized"}); 
        // }

        // delete
        const removeIndex = post.comments.map(comment => comment.user).indexOf(req.user.user.id);
        post.comments.splice(removeIndex, 1);
        await post.save();
        res.json(post.comments);

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});












module.exports = router;