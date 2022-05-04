var express = require("express");
var router = express.Router();

var questionController = require("../../controllers/mandatory/question8.controller");

/* GET question 8 screen 1 */
router.get("/question8-1", questionController.question8Page1);

/* POST question 8 screen 1 */
router.post("/question8-1post", questionController.question8Page1Post);

/* POST question 8 screen 1 */
router.post(
  "/question8-1postsucccess",
  questionController.question8Page1PostConfirm
);

/* GET question 8 screen 1 - Acquirer's controlling structure chart upload Removal confirmation */
router.get("/question8-1rem/:id", questionController.question8Page1rem);

/* POST question 8 screen 1 - Acquirer's controlling structure chart upload Removal confirmation (question8Page1rem) */
router.post(
  "/question8-1ConfPost",
  questionController.question8Page1RemConfPost
);

/* GET question 8 screen 1 -Acquirer's controlling structure chart download document */
router.get(
  "/question8-1view/:id",
  questionController.question8Page1ViewContent
);

/* GET question 8 screen 2 */
router.get("/question8-2", questionController.getQuestion8Page2);

/* POST question 8 screen 3 */
router.post("/question8-2post", questionController.getQuestion8Page2Post);

/* GET question 8 screen 2a */
router.get("/question8-2a", questionController.getQuestion8Page2a);

/* POST question 8 screen 2a post */
router.post("/question8-2apost", questionController.getQuestion8Page2aPost);

/* GET question 8 screen 2cya */
router.get("/question8-2cya/:id", questionController.getQuestion8Page2cya);

/* GET question 8 screen 2rem */
router.get("/question8-2rem/:id", questionController.getQuestion8Page2rem);

/* POST question 8 screen 2rem post */
router.post(
  "/question8-2ConfPost",
  questionController.getQuestion8Page2remConfPost
);

module.exports = router;
