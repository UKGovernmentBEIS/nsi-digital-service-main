var express = require("express");
var router = express.Router();
var validator = require("../../localmodules/mandatoryvalidator");

/* GET task list */
router.get("/task-list", function (req, res, next) {
  req.session.save(function (err) {
    if (err) return next(err);

    console.log(
      "TASK LIST GET Request:" + req.session.data["notificationReference"]
    );

    var stateCheck = validator.validateAllRootQuestions(req.session.data);

    res.render("mandatory/task-list", {
      data: req.session.data,
      questionStatus: stateCheck,
    });
  });
});

module.exports = router;
