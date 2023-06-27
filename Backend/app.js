const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const path = require("path");
const cors = require('cors');

//Config 
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
  



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

app.use(cors());

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req,res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.tml"));
});

//  const corsOptions = {
//    origin: '*',
//   credentials: true,
//   optionSuccessStatus: 200
//  }
//  app.use(cors(corsOptions))
//  app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
//  app.set('trust proxy', 1);


//middleware for erros

app.use(errorMiddleware);

module.exports = app;
