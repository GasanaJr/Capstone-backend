const router = require('express').Router();
const {sendValidation} = require('./validation');
const Message = require('../models/Message');
const verify = require('./verifyRoute');

// Get all messages
/** 
* @swagger
* /message:
*  get:
*    summary: Getting all Messages
*    tags: [Messages]
*    description: Returns all Messages
*    parameters:
*      - name: auth-token
*        description: Your auth-token
*        in: header
*        type: string
*        required: true
*    responses:
*     200:
*       description: These are all the messages available in the database
*       content:
*         application/json:
*           schema:
*             type: array
*/
router.get('/', verify, async (req,res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.json({message: error});
        
    }
});


// Get a specific message
/** 
* @swagger
* /message/{msgId}:
*  get:
*    security:
*      - bearerAuth: []
*    summary: Getting specific Message
*    tags: [Messages]
*    description: Returns a specific Message
*    parameters:
*      - name: msgId
*        description: Id of the Message needed
*        in: path
*        required: true
*      - name: auth-token
*        description: Your auth-token
*        in: header
*        type: string
*        required: true  
*    responses:
*     200:
*       description: This is the message you requested
*       content:
*         application/json:
*           schema:
*             type: array
*     400:
*       description: Message not available
*       content:
*         application/json:
*           schema:
*             type: array
*/
router.get('/:msgId', verify, async(req,res) => {
    try {
        const message = await Message.findById(req.params.msgId);
       // if(!message) return res.status(400).send("Message Unavailable");
        res.json(message)
    } catch (error) {
        res.json({message: error});
        
    }
});

// Sending messages
/** 
* @swagger
* /message/send:
*  post:
*    summary: Sending a new message
*    tags: [Messages]
*    description: Sends a message
*    requestBody:
*      description: Provide Message details
*      content:
*          application/json:
*            schema:
*              type: object
*              properties: 
*                name:
*                  type: string
*                email:
*                  type: string
*                content:
*                  type: string
*    responses:
*     200:
*       description: Message Sent Successfully
*       content:
*         application/json:
*           schema:
*             type: array
*     400:
*       description: Message not sent
*       content:
*         application/json:
*           schema:
*             type: array
*/

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