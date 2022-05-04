var express = require("express");
var router = express.Router();

var questionController = require("../../controllers/voluntary/guidelines.controller");

/* GET question guidelines screen */
router.get("/guidelines", questionController.getGuidelines);

/* POST question guidelines screen */
router.post("/guidelinespost", questionController.getGuidelinesPost);

module.exports = router;
