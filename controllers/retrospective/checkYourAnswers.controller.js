var webHelper = require("../../localmodules/webHelpers");
var validator = require("../../localmodules/retrospectivevalidator");

exports.getCheckYourAnswers = async function (req, res, next) {
  const isComplete = validator.areAllQuestionsComplete(req.session.data);

  res.render("retrospective/check-your-answers", {
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
      "/retrospective/check-your-answers/confirmation"
    );
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/check-your-answers/check-your-answers"
    );
  }
};

exports.getConfirmation = async function (req, res, next) {
  const isSuccess = true;

  res.render("retrospective/confirmation", {
    data: req.session.data,
    isSuccess,
  });
};
