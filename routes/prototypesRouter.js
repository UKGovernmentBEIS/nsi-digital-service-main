var express = require("express");
var router = express.Router();

var prototypesController = require("../controllers/prototypes.controller");

/* GET question 1 screen 1 */
router.get("/", prototypesController.dashboard);

router.get("/section-a/screen-1", prototypesController.sectionAScreen1);
router.get("/section-a/screen-2", prototypesController.sectionAScreen2);
router.get("/section-a/screen-3", prototypesController.sectionAScreen3);
router.get("/section-a/screen-4", prototypesController.sectionAScreen4);
router.get("/section-a/screen-5", prototypesController.sectionAScreen5);
router.get("/section-a/screen-6", prototypesController.sectionAScreen6);
router.get("/section-a/screen-7", prototypesController.sectionAScreen7);
router.get("/section-a/screen-8", prototypesController.sectionAScreen8);
router.get("/section-a/screen-9", prototypesController.sectionAScreen9);
router.get("/section-a/screen-10", prototypesController.sectionAScreen10);

module.exports = router;
