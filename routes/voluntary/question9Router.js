var express = require("express");
var router = express.Router();

var questionController = require("../../controllers/voluntary/question9.controller");

/* GET question 9 screen 1 */
router.get("/question9-1", questionController.question9Page1);

/* POST question 9 screen 1 */
router.post("/question9-1post", questionController.question9Page1Post);

/* POST question 9 screen 1 */
router.post(
  "/question9-1postsucccess",
  questionController.question9Page1PostConfirm
);

/* GET question 9 screen 1 - Additional document upload Removal confirmation */
router.get(
  "/question9-1rem/:id/:docname",
  questionController.question9Page1rem
);

/* POST question 9 screen 1 - Additional document upload Removal confirmation (question8Page1rem) */
router.post(
  "/question9-1ConfPost",
  questionController.question9Page1RemConfPost
);

/* GET question 9 screen 1 -Additional document download document */
router.get(
  "/question9-1view/:id",
  questionController.question9Page1ViewContent
);

module.exports = router;
