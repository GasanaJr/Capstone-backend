const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Parse data
// Middlewares
app.use(cors());
app.use(bodyParser.json());


//  Import Routes

const postsRoute = require('./routes/posts');  
const authRoute = require('./routes/auth');
const checkRoute = require('./routes/posts');

// Routes

app.get('/', (req,res) => {
    res.send("We are on home");
});

// app.get('/posts', (req,res) => {
//     res.send("We are on posts");
// });

// Route Middlewares
app.use('/api/user', authRoute);
//app.use('/api/check', checkRoute);
app.use('/posts', postsRoute);


// DB connection
mongoose.connect(process.env.DB_CONNECTION).then(()=> {
 console.log('Connected to DB');
}).catch((err)=> {
    console.log(err);
}); 



app.listen(3000); 