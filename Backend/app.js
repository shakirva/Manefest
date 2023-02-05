const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

// route imports
const product = require("./route/productroutes");
const user = require("./route/userroutes");
app.use("/api/v1", product);
app.use("/api/v1", user);

//middleware for erros

app.use(errorMiddleware);

module.exports = app;
