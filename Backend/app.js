const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');


app.use(express.json())

// route imports
const product = require('./route/productroutes');

app.use('/api/v1',product);

//middleware for erros

app.use(errorMiddleware);


module.exports=app;