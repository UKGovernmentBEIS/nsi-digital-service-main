var express = require("express");
var router = express.Router();

var controller = require("../../controllers/retrospective/multinotifier.controller");

/* GET multi notifier has reference screen */
router.get(
  "/multinotifierhavereference",
  controller.getMultiNotifierHasReference
);

/* POST multi notifier has reference screen */
router.post(
  "/multinotifierhavereference-post",
  controller.getMultiNotifierHasReferencePost
);

/* GET multi notifier has number screen */
router.get(
  "/createmultinotifierreference",
  controller.getMultiNotifierCreateReference
);

/* GET multi notifier has number screen */
router.get(
  "/entermultinotifierreference",
  controller.getMultiNotifierEnterReference
);

/* POST multi notifier has number screen */
router.post(
  "/entermultinotifierreference-post",
  controller.getMultiNotifierEnterReferencePost
);

/* POST multi notifier generate number screen */
router.post(
  "/createmultinotifierreference-post",
  controller.getMultiNotifierCreateReferencePost
);

module.exports = router;
