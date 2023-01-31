const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv/config');

// Parse data
// Middlewares
app.use(cors());
app.use(bodyParser.json());


//  Import Routes

const postsRoute = require('./routes/posts');  
const authRoute = require('./routes/auth');
const checkRoute = require('./routes/posts');
const sendMessage = require('./routes/sendmsg');

// Routes

app.get('/', (req,res) => {
    res.send("We are on home");
});

// Swagger codes

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Capstone API documentation (Junior)',
            version: '1.0.0',
            description: 'This is where you challenge my API'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    in: 'header',
                    bearerformat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        servers: [{
            url: 'http://localhost:3000'
        }]
    },
    apis: ['./routes/*.js']

}

const specs = swaggerJsDoc(options)

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/posts', postsRoute);
app.use('/message', sendMessage);




// DB connection
mongoose.connect(process.env.DB_CONNECTION).then(()=> {
 console.log('Connected to DB');
}).catch((err)=> {
    console.log(err);
}); 



app.listen(3000); 