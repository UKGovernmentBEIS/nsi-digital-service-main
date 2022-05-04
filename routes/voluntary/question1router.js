var express = require("express");
var router = express.Router();

var questionController = require("../../controllers/voluntary/question1.controller");

router.get("/question1-0", questionController.question1Page0);
router.post("/question1-0", questionController.question1Page0Post);

/* GET question 1 screen 1 */
router.get("/question1-1", questionController.question1Page1);
router.post("/question1-1", questionController.question1Page1Post);

router.get("/question1-2", questionController.question1Page2);
router.post("/question1-2", questionController.question1Page2Post);

router.get("/question1-3", questionController.question1Page3);
router.post("/question1-3", questionController.question1Page3Post);

router.get("/question1-4", questionController.question1Page4);
router.post("/question1-4", questionController.question1Page4Post);

router.get("/question1-4a", questionController.question1Page4a);
router.post("/question1-4a", questionController.question1Page4aPost);

router.get("/question1-4b", questionController.question1Page4b);
router.get("/question1-4b-rem/:id", questionController.question1Page4bRem);

router.post("/question1-4b", questionController.question1Page4bPost);
router.get("/question1-4b-rem/:id", questionController.question1Page4bRem);
router.get("/question1-4b-cya/:id", questionController.question1Page4bcya);

router.post("/question1-4ConfPost", questionController.question1Page4ConfPost);

module.exports = router;
