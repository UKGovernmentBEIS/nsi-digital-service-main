var webHelper = require("../../localmodules/webHelpers");
var validator = require("../../localmodules/retrospectivevalidator");

/* Handles the get for question 3 page 0 */
exports.question3Page0 = async function (req, res, next) {
  //log.Debug("Starting get question 3 page 0", "question3.controller", "GET:question3Page0");

  res.render("retrospective/question3-0", { data: req.session.data });
};

exports.question3Page0Post = async function (req, res, next) {
  //log.Debug("Starting post question 3 page 0", "question3.controller", "POST:question3Page0Post");

  // perform the field validation
  var validationOutput = validator.validateQuestion3Page0(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("retrospective/question3-0", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/retrospective/question3/question3-1"
  );
};

/* Handles the get for question 3 page 1 */
exports.question3Page1 = async function (req, res, next) {
  //log.Debug("Starting get question 3 page 1", "question3.controller", "GET:question3Page1");

  res.render("retrospective/question3-1", { data: req.session.data });
};

exports.question3Page1Post = async function (req, res, next) {
  //log.Debug("Starting post question 3 page 1", "question3.controller", "POST:question3Page1Post");

  // workaround for unselected sectors
  if (req.body.q3iSector == null || req.body.q3iSector == undefined) {
    req.session.data.q3iSector = null;
  }

  // perform the field validation
  var validationOutput = validator.validateQuestion3Page1(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("retrospective/question3-1", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/retrospective/question3/question3-3"
  );
};

exports.question3Page3 = async function (req, res, next) {
  //log.Debug("Starting get question 3 page 3", "question3.controller", "GET:question3Page3");

  res.render("retrospective/question3-3", { data: req.session.data });
};

exports.question3Page3Post = async function (req, res, next) {
  //log.Debug("Starting post question 3 page 3", "question3.controller", "POST:question3Page3Post");

  // workaround for unselected sectors
  if (
    req.body.question3iiiDetailsPercentageShare == null ||
    req.body.question3iiiDetailsPercentageShare == undefined
  ) {
    req.session.data.question3iiiDetailsPercentageShare = null;
  }

  if (
    req.body.question3iiiDetailsPercentageVoting == null ||
    req.body.question3iiiDetailsPercentageVoting == undefined
  ) {
    req.session.data.question3iiiDetailsPercentageVoting = null;
  }

  if (
    req.body.question3iiiDetailsPreventPassage == null ||
    req.body.question3iiiDetailsPreventPassage == undefined
  ) {
    req.session.data.question3iiiDetailsPreventPassage = null;
  }

  // perform the field validation
  var validationOutput = validator.validateQuestion3Page3(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("retrospective/question3-3", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  webHelper.sessionRedirect(next, res, req, "/retrospective/task-list");
};
