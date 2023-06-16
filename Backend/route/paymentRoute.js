const express = require("express");
const {processPayment,sendStripeApiKey} = require("../controller/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/Auth");




router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;