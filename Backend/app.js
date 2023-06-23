const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");






app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true, parameterLimit: 50000 }))
app.use(fileUpload());

// route imports
const product = require("./route/productroutes");
const user = require("./route/userroutes");
const order = require("./route/orderroutes");
const payment = require("./route/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//middleware for erros

app.use(errorMiddleware);

module.exports = app;
