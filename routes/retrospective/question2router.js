var express = require("express");
var router = express.Router();

var questionController = require("../../controllers/retrospective/question2.controller");

/* GET question 2 screen 1 */
router.get("/question2-1", questionController.getQuestion2Page1);

/* POST question 2 screen 1 */
router.post("/question2-1post", questionController.getQuestion2Page1Post);

/* GET question 2 screen 2 */
router.get("/question2-2", questionController.getQuestion2Page2);

/* POST question 2 screen 2 */
router.post("/question2-2post", questionController.getQuestion2Page2Post);

/* GET question 2 screen 2a */
router.get("/question2-2a", questionController.getQuestion2Page2a);

/* POST question 2 screen 2a */
router.post("/question2-2apost", questionController.getQuestion2Page2aPost);

/* GET question 2 screen 2cya */
router.get("/question2-2cya/:id", questionController.getQuestion2Page2cya);

/* GET question 2 screen 2cya */
router.get("/question2-2rem/:id", questionController.getQuestion2Page2rem);

/* POST question 2 screen 2cya */
router.post(
  "/question2-2ConfPost",
  questionController.getQuestion2Page2remConfPost
);

module.exports = router;
