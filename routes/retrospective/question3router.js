var express = require("express");
var router = express.Router();

var questionController = require("../../controllers/retrospective/question3.controller");

/* GET question 3 screen 0 */
router.get("/question3-0", questionController.question3Page0);

/* POST question 3 screen 0 */
router.post("/question3-0post", questionController.question3Page0Post);

/* GET question 3 screen 1 */
router.get("/question3-1", questionController.question3Page1);

/* POST question 3 screen 1 */
router.post("/question3-1post", questionController.question3Page1Post);

/* GET question 3 screen 3 */
router.get("/question3-3", questionController.question3Page3);

/* POST question 3 screen 3 */
router.post("/question3-3post", questionController.question3Page3Post);

module.exports = router;
