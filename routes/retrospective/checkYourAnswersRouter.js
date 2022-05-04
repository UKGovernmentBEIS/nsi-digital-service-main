var express = require("express");
var router = express.Router();

var questionController = require("../../controllers/retrospective/checkYourAnswers.controller");

router.get("/check-your-answers", questionController.getCheckYourAnswers);

router.post("/check-your-answers", questionController.checkYourAnswersPost);

router.get("/confirmation", questionController.getConfirmation);

module.exports = router;
