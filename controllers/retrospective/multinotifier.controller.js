const notificationDataUtils = require("../../localmodules/notificationDataUtils");
const webHelper = require("../../localmodules/webHelpers");

/* Handles the get for multi notifier has reference */
exports.getMultiNotifierHasReference = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  if (
    req.session.data.isMasterNotifier != null &&
    req.session.data.isMasterNotifier == true
  ) {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/multinotifier/entermultinotifierreference"
    );
  } else {
    res.render("retrospective/multinotifierhasreference", {
      data: req.session.data,
    });
  }
};

/* Handles the post for multi notifier has reference */
exports.getMultiNotifierHasReferencePost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  // check whether they answered yes or no
  if (req.session.data["multiNotifierHasReference"] === "Yes") {
    // the user has a number so send them to the next screen to get it
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/multinotifier/entermultinotifierreference"
    );
  } else {
    // the user does not have a reference so generate one and show it to them
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/multinotifier/createmultinotifierreference"
    );
  }
};

/* Handles the get for multi notifier enter reference */
exports.getMultiNotifierEnterReference = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("retrospective/entermultinotifierreference", {
    data: req.session.data,
  });
};

/* Handles the post for multi notifier enter reference */
exports.getMultiNotifierEnterReferencePost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  const multiNotiferReference = req.body.multiNotiferReference;

  // check that the notification reference is valid
  notificationDataUtils
    .checkAndUpdateMultiNotificationReference(
      req.session.data.notificationReference,
      req.body.multiNotiferReference,
      req.session.authContainer.uniqueId,
      "multiNotiferReference"
    )
    .then(function () {
      // also store in session storage
      req.session.data.multiNotiferReference = multiNotiferReference;
      req.session.data.isMasterNotifier = false;

      webHelper.sessionRedirect(next, res, req, "/retrospective/task-list");
    })
    .catch(function (error) {
      // there was a problem
      var buildResponse = {
        isValid: false,
        multiNotiferReference: "Please enter a valid joint reference number",
      };
      res.render("retrospective/entermultinotifierreference", {
        data: req.session.data,
        formValidation: buildResponse,
      });
    });
};

/* Handles the get for multi notifier create reference */
exports.getMultiNotifierCreateReference = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  // create the new reference
  notificationDataUtils
    .generateMultiNotifierReference(
      req.session.data.notificationReference,
      req.session.authContainer.uniqueId
    )
    .then(function (newReference) {
      // also store in session storage
      req.session.data.multiNotiferReference = newReference;
      req.session.data.isMasterNotifier = true;

      res.render("retrospective/createmultinotifierreference", {
        data: req.session.data,
        multiNotifierReference: newReference,
      });
    })
    .catch(function (error) {
      console.log("Could not generate new multi notifier reference.");
      next(error);
    });
};

/* Handles the post for multi notifier create reference */
exports.getMultiNotifierCreateReferencePost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  webHelper.sessionRedirect(next, res, req, "/retrospective/task-list");
};
