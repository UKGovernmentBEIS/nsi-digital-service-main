var express = require("express");
var router = express.Router();

var questionController = require("../../controllers/retrospective/question7.controller");

/* GET question 7 screen 1 */
router.get("/question7-1", questionController.getQuestion7Page1);

/* POST question 7 screen 1 */
router.post("/question7-1post", questionController.getQuestion7Page1Post);

/* GET question 7 screen 2 */
router.get("/question7-2", questionController.getQuestion7Page2);

/* POST question 7 screen 2 */
router.post("/question7-2post", questionController.getQuestion7Page2Post);

/* GET question 7 screen 3 */
router.get("/question7-3", questionController.getQuestion7Page3);

/* POST question 7 screen 3 */
router.post("/question7-3post", questionController.getQuestion7Page3Post);

/* GET question 7 screen 04 */
router.get("/question7-04", questionController.question7Page04);

/* POST question 7 screen 04 */
router.post("/question7-04post", questionController.question7Page04Post);

/* GET question 7 screen 4 */
router.get("/question7-4", questionController.getQuestion7Page4);

/* POST question 7 screen 4 */
router.post("/question7-4post", questionController.getQuestion7Page4Post);

/* GET question 7 screen 4a */
router.get("/question7-4a", questionController.getQuestion7Page4a);

/* POST question 7 screen 4a */
router.post("/question7-4apost", questionController.getQuestion7Page4aPost);

/* GET question 7 screen 4cya */
router.get("/question7-4cya/:id", questionController.getQuestion7Page4cya);

/* GET question 7 screen 4cya */
router.get("/question7-4rem/:id", questionController.getQuestion7Page4rem);

/* POST question 7 screen 4cya */
router.post(
  "/question7-4ConfPost",
  questionController.getQuestion7Page4remConfPost
);

/* GET question 7 screen 05 */
router.get("/question7-05", questionController.question7Page05);

/* POST question 7 screen 05 */
router.post("/question7-05post", questionController.question7Page05Post);

/* GET question 7 screen 5 */
router.get("/question7-5", questionController.getQuestion7Page5);

/* POST question 7 screen 5 */
router.post("/question7-5post", questionController.getQuestion7Page5Post);

/* GET question 7 screen 5a */
router.get("/question7-5a", questionController.getQuestion7Page5a);

/* POST question 7 screen 5a */
router.post("/question7-5apost", questionController.getQuestion7Page5aPost);

/* GET question 7 screen 45cya */
router.get("/question7-5cya/:id", questionController.getQuestion7Page5cya);

/* GET question 7 screen 4cya */
router.get("/question7-5rem/:id", questionController.getQuestion7Page5rem);

/* POST question 7 screen 5cya */
router.post(
  "/question7-5ConfPost",
  questionController.getQuestion7Page5remConfPost
);

/* GET question 7 screen 6 */
router.get("/question7-6", questionController.getQuestion7Page6);

/* POST question 7 screen 6 */
router.post("/question7-6post", questionController.getQuestion7Page6Post);

module.exports = router;
