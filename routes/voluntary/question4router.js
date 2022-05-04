var express = require("express");
var router = express.Router();

var questionController = require("../../controllers/voluntary/question4.controller");

/* GET question 4 screen 1 */
router.get("/question4-1", questionController.getQuestion4Page1);

/* POST question 4 screen 1 */
router.post("/question4-1post", questionController.getQuestion4Page1Post);

/* GET question 4 screen 02 */
router.get("/question4-02", questionController.getQuestion4Page02);

/* POST question 4 screen 02 */
router.post("/question4-02post", questionController.getQuestion4Page02Post);

/* GET question 4 screen 2 */
router.get("/question4-2", questionController.getQuestion4Page2);

/* POST question 4 screen 2 */
router.post("/question4-2post", questionController.getQuestion4Page2Post);

/* GET question 4 screen 2a */
router.get("/question4-2a", questionController.getQuestion4Page2a);

/* POST question 4 screen 2a */
router.post("/question4-2apost", questionController.getQuestion4Page2aPost);

/* GET question 4 screen 2cya */
router.get("/question4-2cya/:id", questionController.getQuestion4Page2cya);

/* GET question 4 screen 2cya */
router.get("/question4-2rem/:id", questionController.getQuestion4Page2rem);

/* POST question 4 screen 2cya */
router.post(
  "/question4-2ConfPost",
  questionController.getQuestion4Page2remConfPost
);

/* GET question 4 screen 03 */
router.get("/question4-03", questionController.getQuestion4Page03);

/* POST question 4 screen 03 */
router.post("/question4-03post", questionController.getQuestion4Page03Post);

/* GET question 4 screen 3 */
router.get("/question4-3", questionController.getQuestion4Page3);

/* POST question 4 screen 3 */
router.post("/question4-3post", questionController.getQuestion4Page3Post);

/* GET question 4 screen 3a */
router.get("/question4-3a", questionController.getQuestion4Page3a);

/* POST question 4 screen 3a */
router.post("/question4-3apost", questionController.getQuestion4Page3aPost);

/* GET question 4 screen 3cya */
router.get("/question4-3cya/:id", questionController.getQuestion4Page3cya);

/* GET question 4 screen 3cya */
router.get("/question4-3rem/:id", questionController.getQuestion4Page3rem);

/* POST question 4 screen 3cya */
router.post(
  "/question4-3ConfPost",
  questionController.getQuestion4Page3remConfPost
);

module.exports = router;
