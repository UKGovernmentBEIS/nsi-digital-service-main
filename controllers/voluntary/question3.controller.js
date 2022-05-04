var webHelper = require("../../localmodules/webHelpers");
var validator = require("../../localmodules/voluntaryvalidator");

/* Handles the get for question 3 page 1 */
exports.question3Page1 = async function (req, res, next) {
  //log.Debug("Starting get question 3 page 1", "question3.controller", "GET:question3Page1");

  res.render("voluntary/question3-1", { data: req.session.data });
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
    res.render("voluntary/question3-1", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/voluntary/question3/question3-1a"
  );
};

/* Handles the get for question 3 page1a */
exports.question3Page1a = async function (req, res, next) {
  //log.Debug("Starting get question 3 page 1a", "question3.controller", "GET:question3Page1a");

  res.render("voluntary/question3-1a", { data: req.session.data });
};

exports.question3Page1aPost = async function (req, res, next) {
  //log.Debug("Starting post question 3 page 1a", "question3.controller", "POST:question3Page1aPost");
  // perform the field validation
  var validationOutput = validator.validateQuestion3Page1a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("voluntary/question3-1a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  webHelper.sessionRedirect(next, res, req, "/voluntary/question3/question3-2");
};

exports.question3Page2 = async function (req, res, next) {
  //log.Debug("Starting get question 3 page 2", "question3.controller", "GET:question3Page2");

  res.render("voluntary/question3-2", { data: req.session.data });
};

exports.question3Page2Post = async function (req, res, next) {
  //log.Debug("Starting post question 3 page 3", "question3.controller", "POST:question3Page2Post");
  // perform the field validation
  var validationOutput = validator.validateQuestion3Page2(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("voluntary/question3-2", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (req.body["q3iiQualifyingAssetOrQualifyingEntity"] === "qualifyingAsset") {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question3/question3-2a"
    );
  } else if (
    req.body["q3iiQualifyingAssetOrQualifyingEntity"] === "qualifyingEntity"
  ) {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question3/question3-3"
    );
  } else {
    // Go to the main page
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question3/question3-2"
    );
  }
};

/* Handles the get for question 3 page2a */
exports.question3Page2a = async function (req, res, next) {
  //log.Debug("Starting get question 3 page 2a", "question3.controller", "GET:question3Page2a");

  res.render("voluntary/question3-2a", { data: req.session.data });
};

exports.question3Page2aPost = async function (req, res, next) {
  //log.Debug("Starting post question 3 page 2a", "question3.controller", "POST:question3Page2aPost");
  // perform the field validation
  var validationOutput = validator.validateQuestion3Page2a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("voluntary/question3-2a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  webHelper.sessionRedirect(next, res, req, "/voluntary/task-list");
};

exports.question3Page3 = async function (req, res, next) {
  //log.Debug("Starting get question 3 page 3", "question3.controller", "GET:question3Page3");

  res.render("voluntary/question3-3", { data: req.session.data });
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

  if (
    req.body.question3iiiDetailsEnableInfluence == null ||
    req.body.question3iiiDetailsEnableInfluence == undefined
  ) {
    req.session.data.question3iiiDetailsEnableInfluence = null;
  }
  // perform the field validation
  var validationOutput = validator.validateQuestion3Page3(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("voluntary/question3-3", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  webHelper.sessionRedirect(next, res, req, "/voluntary/task-list");
};

exports.question3Page4 = async function (req, res, next) {
  //log.Debug("Starting get question 3 page 4", "question3.controller", "GET:question3Page4");

  res.render("voluntary/question3-4", { data: req.session.data });
};

exports.question3Page4Post = async function (req, res, next) {
  //log.Debug("Starting post question 3 page 4", "question3.controller", "POST:question3Page4Post");
  // perform the field validation
  var validationOutput = validator.validateQuestion3Page4(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("voluntary/question3-4", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  webHelper.sessionRedirect(next, res, req, "/voluntary/task-list");
};
