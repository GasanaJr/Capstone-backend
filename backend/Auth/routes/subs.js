const express = require('express');
const router = express.Router();
const Subscribers = require('../models/Subscribers');
const nodemailer = require('nodemailer');

router.post('/', async(req,res) => {
    // var transporter = nodemailer.createTransport({
    //     host: "sandbox.smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //       user: "8a941cb88baf9a",
    //       pass: "4cdd7760e0ce81"
    //     }
    //   });

     const transporter = nodemailer.createTransport({
         service: 'hotmail',
         auth: {
             user: 'capstoneweb@outlook.com',
             pass: 'Capstoneemailtest@123'
         }
     });
     const emailExist = await Subscribers.findOne({email: req.body.email});
     if(emailExist) return res.status(400).json({Message: 'Email already Subscribed'});

    const mailOptions = {
        from: 'capstoneweb@outlook.com',
        to: req.body.email,
        subject: "Confirming subscription",
        text: "Thank you for subscribing to Capstone Website! Cheers to the fun ahead! Junior!"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.status(400).json(error);
        }
        else {
            console.log("email sent" + info);
            res.status(200).json('success');
        }
    });
    const subscribe = new Subscribers({
        email: req.body.email
    });
    try {
        const savedSub = await subscribe.save();
        res.status(201).json({Message:'Subscribed'});
    } catch (error) {
        res.json({Message: error});
    }
});

router.get('/', async(req,res) => {
    try {
        const subscribers = await Subscribers.find();
        res.json(subscribers);
    } catch (error) {
        res.json({Message: error});
    }
})

module.exports = router;
