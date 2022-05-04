var webHelper = require("../../localmodules/webHelpers");
var validator = require("../../localmodules/voluntaryvalidator");

exports.getCheckYourAnswers = async function (req, res, next) {
  const isComplete = validator.areAllQuestionsComplete(req.session.data);

  res.render("voluntary/check-your-answers", {
    data: req.session.data,
    isComplete,
  });
};

exports.checkYourAnswersPost = async function (req, res, next) {
  if (
    req.session.data.cyaIAgree == "Yes" &&
    (req.session.data.status == 1 || req.session.data.status == 7)
  ) {
    webHelper.submitNotification(
      req,
      res,
      next,
      "/voluntary/check-your-answers/confirmation"
    );
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/check-your-answers/check-your-answers"
    );
  }
};

exports.getConfirmation = async function (req, res, next) {
  const isSuccess = true;

  res.render("voluntary/confirmation", {
    data: req.session.data,
    isSuccess,
  });
};
