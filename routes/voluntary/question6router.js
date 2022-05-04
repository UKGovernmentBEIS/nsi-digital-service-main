var express = require("express");
var router = express.Router();

var questionController = require("../../controllers/voluntary/question6.controller");

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

// ASSSET SECTION ***************************************************************
/* GET question 6 screen 1 - Pre Acquisition chart upload */
router.get("/question6-1asset", questionController.question6Page1Asset);

/* POST question 6 screen 1 - Pre Acquisition chart upload */
router.post(
  "/question6-1postasset",
  questionController.question6Page1PostAsset
);

/* POST question 6 screen 1 - Pre Acquisition chart upload */
router.post(
  "/question6-1postsucccessasset",
  questionController.question6Page1PostConfirmAsset
);

/* GET question 6 screen 1 - Pre Acquisition chart upload Removal confirmation ASSET */
router.get(
  "/question6-1remasset/:id",
  questionController.question6Page1remAsset
);

/* POST question 6 screen 1 - Pre Acquisition chart upload Removal confirmation (question6Page1remAsset) ASSET */
router.post(
  "/question6-1ConfPostAsset",
  questionController.question6Page1RemConfPostAsset
);

/* GET question 6 screen 1 - Pre Acquisition chart view / download document ASSET */
router.get(
  "/question6-1viewasset/:id",
  questionController.question6Page1ViewContentAsset
);

/* GET question 6 screen 2 - Post Acquisition chart upload */
router.get("/question6-2asset", questionController.question6Page2Asset);

/* POST question 6 screen 2 - Post Acquisition chart upload */
router.post(
  "/question6-2postasset",
  questionController.question6Page2PostAsset
);

/* POST question 6 screen 2 - Post Acquisition chart upload */
router.post(
  "/question6-2postsucccessasset",
  questionController.question6Page2PostConfirmAsset
);

/* GET question 6 screen 2 - Post Acquisition chart upload Removal confirmation ASSET */
router.get(
  "/question6-2remasset/:id",
  questionController.question6Page2remAsset
);

/* POST question 6 screen 2 - Post Acquisition chart upload Removal confirmation (question6Page2rem) ASSET */
router.post(
  "/question6-2ConfPostAsset",
  questionController.question6Page2RemConfPostAsset
);

/* GET question 6 screen 2 - Post Acquisition chart view / download document ASSET */
router.get(
  "/question6-2viewasset/:id",
  questionController.question6Page2ViewContentAsset
);

/* GET question 6 screen 3 - Non-UK Government involvement question */
router.get("/question6-3asset", questionController.question6Page3Asset);

/* POST question 6 screen 3 - Non-UK Government involvement question */
router.post(
  "/question6-3postasset",
  questionController.question6Page3PostAsset
);
// ******************************************************************************

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
