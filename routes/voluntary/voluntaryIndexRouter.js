var express = require("express");
var router = express.Router();
var validator = require("../../localmodules/voluntaryvalidator");

/* GET task list */
router.get("/task-list", function (req, res, next) {
  req.session.save(function (err) {
    if (err) return next(err);

    var stateCheck = validator.validateAllRootQuestions(req.session.data);

    res.render("voluntary/task-list", {
      data: req.session.data,
      questionStatus: stateCheck,
    });
  });
});

module.exports = router;
