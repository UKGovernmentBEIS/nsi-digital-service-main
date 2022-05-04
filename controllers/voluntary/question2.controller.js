var uuid = require("uuid");
var webHelper = require("../../localmodules/webHelpers");
var validator = require("../../localmodules/voluntaryvalidator");

/* ************************* QUESTION 2 PART 1 ***************************** */

/* Handles the get for question 2 page 1 */
exports.getQuestion2Page1 = async function (req, res, next) {
  if (
    req.session.data["q2iPreviousNotificationList"] == null ||
    req.session.data["q2iPreviousNotificationList"].length == 0
  ) {
    res.render("voluntary/question2-1", { data: req.session.data });
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question2/question2-2"
    );
  }
};

/* Handles the post for question 2 page 1 */
exports.getQuestion2Page1Post = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  // do we need to show the table screens?
  if (req.session.data["q2iSubmitTwelve"] === "Yes") {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question2/question2-2a"
    );
  } else {
    webHelper.sessionRedirect(next, res, req, "/voluntary/task-list");
  }
};

/* ************************* QUESTION 2 PART 2 ***************************** */

/* Handles the get for question 2 page 2 */
exports.getQuestion2Page2 = async function (req, res, next) {
  if (
    req.session.data["q2iPreviousNotificationList"] == null ||
    req.session.data["q2iPreviousNotificationList"].length == 0
  ) {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question2/question2-1"
    );
  } else {
    res.render("voluntary/question2-2", { data: req.session.data });
  }
};

/* Handles the post for question 2 page 2 */
exports.getQuestion2Page2Post = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  // do we need to show add more notifications?
  if (req.session.data["q211addanothernotification"] === "Yes") {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question2/question2-2a"
    );
  } else {
    webHelper.sessionRedirect(next, res, req, "/voluntary/task-list");
  }
};

/* Handles the get for question 2 page 2a */
exports.getQuestion2Page2a = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("voluntary/question2-2a", { data: req.session.data });
};

/* Handles the post for question 2 page 2a */
exports.getQuestion2Page2aPost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var newGuid = null;

  // perform the field validation
  var validationOutput = validator.validateQuestion2Page2a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("voluntary/question2-2a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  // add the new item to the list
  if (req.session.data["q2iPreviousNotificationList"] == null) {
    req.session.data["q2iPreviousNotificationList"] = [];
  }

  // are we editing?
  if (req.session.data["q2iEditingData"] === "true") {
    // remove this item from the list
    newGuid = req.session.data["q2iNotificationId"];
  } else {
    newGuid = uuid.v4();
  }

  // create the new JSON objec
  var newNotificationItem = {
    id: newGuid,
    q2iCaseReference: req.session.data["q2iCaseReference"],
  };

  if (req.session.data["q2iEditingData"] === "true") {
    for (
      var i = 0;
      i < req.session.data["q2iPreviousNotificationList"].length;
      i++
    ) {
      if (req.session.data["q2iPreviousNotificationList"][i].id === newGuid) {
        req.session.data["q2iPreviousNotificationList"][i].q2iCaseReference =
          newNotificationItem.q2iCaseReference;
      }
    }
  } else {
    req.session.data["q2iPreviousNotificationList"].push(newNotificationItem);
  }

  // remove the posted fields fields from the data array
  req.session.data["q2iCaseReference"] = "";

  webHelper.sessionRedirect(next, res, req, "/voluntary/question2/question2-2");
};

/* Handles the post for question 2 page 2a */
exports.getQuestion2Page2cya = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var newPostData = {};

  for (
    var i = 0;
    i < req.session.data["q2iPreviousNotificationList"].length;
    i++
  ) {
    if (
      req.session.data["q2iPreviousNotificationList"][i].id === req.params.id
    ) {
      newPostData["q2iNotificationId"] =
        req.session.data["q2iPreviousNotificationList"][i].id;
      newPostData["q2iCaseReference"] =
        req.session.data["q2iPreviousNotificationList"][i].q2iCaseReference;

      // got the record so jump out
      break;
    }
  }

  // remove the posted fields fields from the data array
  req.session.data["q2iCaseReference"] = "";

  res.render("voluntary/question2-2a", { data: newPostData, isEditing: true });
};

/* Handles the get for question 2 page 2 remove item */
exports.getQuestion2Page2rem = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var recordRef = "";

  // get the name of the record we are deleting
  for (
    var i = 0;
    i < req.session.data["q2iPreviousNotificationList"].length;
    i++
  ) {
    if (
      req.session.data["q2iPreviousNotificationList"][i].id === req.params.id
    ) {
      recordRef =
        req.session.data["q2iPreviousNotificationList"][i].q2iCaseReference;

      // got the record so jump out
      break;
    }
  }

  res.render("voluntary/question2-2conf", {
    notificationId: req.params.id,
    notificationRef: recordRef,
  });
};

/* Handles the post for question 2 page 2 remove confirmation */
exports.getQuestion2Page2remConfPost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var foundIndex = -1;

  if (req.session.data["q2iremove"] === "Yes") {
    for (
      var i = 0;
      i < req.session.data["q2iPreviousNotificationList"].length;
      i++
    ) {
      if (
        req.session.data["q2iPreviousNotificationList"][i].id ===
        req.session.data["q2irecordToRemoveId"]
      ) {
        foundIndex = i;

        // jump out
        break;
      }
    }

    if (foundIndex > -1) {
      req.session.data["q2iPreviousNotificationList"].splice(foundIndex, 1);
    }
  }

  // clean up
  req.session.data["q2irecordToRemoveId"] = "";
  req.session.data["q2iremove"] = "";

  webHelper.sessionRedirect(next, res, req, "/voluntary/question2/question2-1");
};
