var express = require("express");
var router = express.Router();

var questionController = require("../../controllers/mandatory/question6.controller");

/* GET question 6 screen 1 - Pre Acquisition chart upload */
router.get("/question6-1", questionController.question6Page1);

/* POST question 6 screen 1 - Pre Acquisition chart upload */
router.post("/question6-1post", questionController.question6Page1Post);

/* POST question 6 screen 1 - Pre Acquisition chart upload */
router.post(
  "/question6-1postsucccess",
  questionController.question6Page1PostConfirm
);

/* GET question 6 screen 1 - Pre Acquisition chart upload Removal confirmation */
router.get("/question6-1rem/:id", questionController.question6Page1rem);

/* POST question 6 screen 1 - Pre Acquisition chart upload Removal confirmation (question6Page1rem) */
router.post(
  "/question6-1ConfPost",
  questionController.question6Page1RemConfPost
);

/* GET question 6 screen 1 - Pre Acquisition chart view / download document */
router.get(
  "/question6-1view/:id",
  questionController.question6Page1ViewContent
);

/* GET question 6 screen 2 - Post Acquisition chart upload */
router.get("/question6-2", questionController.question6Page2);

/* POST question 6 screen 2 - Post Acquisition chart upload */
router.post("/question6-2post", questionController.question6Page2Post);

/* POST question 6 screen 2 - Post Acquisition chart upload */
router.post(
  "/question6-2postsucccess",
  questionController.question6Page2PostConfirm
);

/* GET question 6 screen 2 - Post Acquisition chart upload Removal confirmation */
router.get("/question6-2rem/:id", questionController.question6Page2rem);

/* POST question 6 screen 2 - Post Acquisition chart upload Removal confirmation (question6Page2rem) */
router.post(
  "/question6-2ConfPost",
  questionController.question6Page2RemConfPost
);

/* GET question 6 screen 2 - Post Acquisition chart view / download document */
router.get(
  "/question6-2view/:id",
  questionController.question6Page2ViewContent
);

/* GET question 6 screen 3 - Non-UK Government involvement question */
router.get("/question6-3", questionController.question6Page3);

/* POST question 6 screen 3 - Non-UK Government involvement question */
router.post("/question6-3post", questionController.question6Page3Post);

/* GET question 6 screen 4 - Non-UK Government involvement answer Yes */
router.get("/question6-4", questionController.question6Page4);

/* POST question 6 screen 4 - Non-UK Government involvement */
router.post("/question6-4post", questionController.question6Page4Post);

/* GET question 6 screen 4a - Add Non-UK Government involvement details  */
router.get("/question6-4a", questionController.question6Page4a);

/* POST question 6 screen 4a - Add Non-UK Government involvement details */
router.post("/question6-4apost", questionController.question6Page4aPost);

/* GET question 6 screen 4 - edit */
router.get("/question6-4edit/:id", questionController.question6Page4Edit);

/* GET question 6 screen 4 - remove */
router.get("/question6-4rem/:id", questionController.getQuestion6Page4Remove);

/* POST question 6 screen 4 - remove confirm post */
router.post(
  "/question6-4ConfirmPost",
  questionController.getQuestion6Page4RemovePost
);

module.exports = router;
