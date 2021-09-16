const express = require("express");
const router = express.Router();

const {
   createSubscription
} = require("../controller/subscription");

router.route("/").post(createSubscription);

module.exports = router;
