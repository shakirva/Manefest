const express = require('express');
const app = express();

app.use(express.json())
// route imports
const product = require('./route/productroutes');

app.use('/api/v1',product);

module.exports=app;