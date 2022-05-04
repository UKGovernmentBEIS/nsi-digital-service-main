var express = require("express");
var router = express.Router();

var questionController = require("../../controllers/voluntary/question3.controller");

/* GET question 3 screen 1 */
router.get("/question3-1", questionController.question3Page1);

/* POST question 3 screen 1 */
router.post("/question3-1post", questionController.question3Page1Post);

/* GET question 3 screen 1a */
router.get("/question3-1a", questionController.question3Page1a);

/* POST question 3 screen 1a */
router.post("/question3-1apost", questionController.question3Page1aPost);

/* GET question 3 screen 2 */
router.get("/question3-2", questionController.question3Page2);

/* POST question 3 screen 2 */
router.post("/question3-2post", questionController.question3Page2Post);

/* GET question 3 screen 2a */
router.get("/question3-2a", questionController.question3Page2a);

/* POST question 3 screen 2a */
router.post("/question3-2apost", questionController.question3Page2aPost);

/* GET question 3 screen 3 */
router.get("/question3-3", questionController.question3Page3);

/* POST question 3 screen 3 */
router.post("/question3-3post", questionController.question3Page3Post);

/* GET question 3 screen 4 */
router.get("/question3-4", questionController.question3Page4);

/* POST question 3 screen 4 */
router.post("/question3-4post", questionController.question3Page4Post);

module.exports = router;
