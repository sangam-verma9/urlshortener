const express = require("express");
const {
    createnewshorturl,
    findlongurl
} = require("../controllers/urlController");
const router = express.Router();

router.route("/create").post(createnewshorturl);
router.route("/find/:key").get(findlongurl);
module.exports = router;
