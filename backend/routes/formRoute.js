const express = require("express");
const {
    createnewquery
} = require("../controllers/formController");
const router = express.Router();

router.route("/submitdetails").post(createnewquery);
module.exports = router;
