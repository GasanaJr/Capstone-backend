const router = require('express').Router();
//const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('./validation');

router.get('/', async (req,res) => {
        try {
          const allUsers = await User.find();
          if (!allUsers) {
            res.status(500).json({ message: "Server Error - Try again later." });
          } else {
            res.status(200).json(allUsers);
          }
        } catch (error) {
          console.log("Error fetching all users:", error.message);
        }
      
});

router.post('/register',async (req,res) => {

   //  Data Validation
    const {error} = registerValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     // Checking if a user exists
     const emailExist = await User.findOne({email: req.body.email});
     if(emailExist) return res.status(400).send('Email already exists');

     //Hashing the passwords
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user

      const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
      });
      try {
          const savedUser = await user.save();
      } catch(err) {
          res.status(400).send(err);
      }
});

// ----------------------------Login---------------------
router.post('/login', async(req,res) => {
    // Validating the user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // checking if user exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email does not exist');
    // Check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Password is incorrect');
    //Create and assign a token
    const payload = {
        user: {
            id: user.id
        }
      }
     jwt.sign(payload, process.env.TOKEN_SECRET, (err,token) => {
        if(err) throw err;
        res.json({token});
     });
    // res.header('auth-token',token).send(token);


});

module.exports = router;