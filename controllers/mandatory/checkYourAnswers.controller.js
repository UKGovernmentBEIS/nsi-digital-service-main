var webHelper = require("../../localmodules/webHelpers");
var validator = require("../../localmodules/mandatoryvalidator");

exports.getCheckYourAnswers = async function (req, res, next) {
  const isComplete = validator.areAllQuestionsComplete(req.session.data);

  res.render("mandatory/check-your-answers", {
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
      "/mandatory/check-your-answers/confirmation"
    );
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/check-your-answers/check-your-answers"
    );
  }
};

exports.getConfirmation = async function (req, res, next) {
  const isSuccess = true;

  res.render("mandatory/confirmation", {
    data: req.session.data,
    isSuccess,
  });
};
