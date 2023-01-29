const router = require('express').Router();
const {sendValidation} = require('./validation');
const Message = require('../models/Message');
const verify = require('./verifyRoute');

// Get all messages
router.get('/', verify, async (req,res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.json({message: error});
        
    }
});


// Get a specific message
router.get('/:msgId', verify, async(req,res) => {
    try {
        const message = await Message.findOne({_id: req.params.msgId});
        if(!message) return res.status(400).send("Message Unavailable");
        res.json(message)
    } catch (error) {
        res.json({message: error});
        
    }
});

// Sending messages

router.post('/send', async (req,res) => {
    // Data Validation
    const {error} = sendValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Get message
    const msg = new Message({
        name: req.body.name,
        email: req.body.email,
        content: req.body.content
    });

    // Send Message
    try {
        const savedMessage = await msg.save();
        res.json(savedMessage);
    } catch (error) {
        res.status(400).send(err);
        
    }

});

module.exports = router;