var uuid = require("uuid");
var webHelper = require("../../localmodules/webHelpers");
var validator = require("../../localmodules/mandatoryvalidator");

/* ************************* QUESTION 7 PART 1 ***************************** */

/* Handles the get for question 7 page 1 */
exports.getQuestion7Page1 = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("mandatory/question7-1", { data: req.session.data });
};

/* Handles the post for question 7 page 1 */
exports.getQuestion7Page1Post = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  // perform the field validation
  var validationOutput = validator.validateQuestion7Page1(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question7-1", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (req.body["q7iEntityOrIndividual"] === "entity") {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question7/question7-2"
    );
  } else if (req.body["q7iEntityOrIndividual"] === "individual") {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question7/question7-3"
    );
  } else {
    // Go to the main page
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question7/question7-1"
    );
  }
};

/* ************************* QUESTION 7 PART 2 ***************************** */

/* Handles the get for question 7 page 2 */
exports.getQuestion7Page2 = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("mandatory/question7-2", { data: req.session.data });
};

/* Handles the post for question 7 page 2 */
exports.getQuestion7Page2Post = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  webHelper.sessionRedirect(next, res, req, "/mandatory/question7/question7-3");
};

/* ************************* QUESTION 7 PART 3 ***************************** */

/* Handles the get for question 7 page 3 */
exports.getQuestion7Page3 = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("mandatory/question7-3", { data: req.session.data });
};

/* Handles the post for question 7 page 3 */
exports.getQuestion7Page3Post = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  // perform the field validation
  var validationOutput = validator.validateQuestion7Page3(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question7-3", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/mandatory/question7/question7-04"
  );
};

/* ************************* QUESTION 7 PART 4 ***************************** */

/* Handles the get for question 7 page 04 - Non-UK Government involvement in Shareholding / Voting rights */
exports.question7Page04 = async function (req, res, next) {
  //log.Debug("Starting get question 7 page 04", "question7.controller", "GET:question7Page04");

  res.render("mandatory/question7-04", { data: req.session.data });
};

/* Handles the Post for question 7 page 04 - Non-UK Government involvement in Shareholding / Voting rights */
exports.question7Page04Post = async function (req, res, next) {
  //log.Debug("Starting post question 7 page 04", "question7.controller", "POST:question7Page04Post");
  // perform the field validation
  var validationOutput = validator.validateQuestion7Page04(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question7-04", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (req.body["q7iiNonUKGovt"] === "Yes") {
    // Go to the add Non-UK government page
    if (
      req.session.data["q7iiNonUKGovernmentList"] == null ||
      req.session.data["q7iiNonUKGovernmentList"].length == 0
    ) {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/mandatory/question7/question7-4a"
      );
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/mandatory/question7/question7-4"
      );
    }
  } else if (req.body["q7iiNonUKGovt"] === "No") {
    // Go to the additional information page
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question7/question7-05"
    );
  } else if (req.body["q7iiNonUKGovt"] === "DontKnow") {
    // Go to the additional information page
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question7/question7-05"
    );
  } else {
    // Go to the prompt question page
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question7/question7-04"
    );
  }
};

/* Handles the get for question 7 page 4 */
exports.getQuestion7Page4 = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("mandatory/question7-4", { data: req.session.data });
};

/* Handles the post for question 7 page 4 */
exports.getQuestion7Page4Post = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  // do we need to show add more non-UK entities?
  if (req.session.data["q7iiNonUKShareVoting"] === "Yes") {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question7/question7-4a"
    );
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question7/question7-05"
    );
  }
};

/* Handles the get for question 7 page 4a */
exports.getQuestion7Page4a = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("mandatory/question7-4a", { data: req.session.data });
};

/* Handles the post for question 7 page 4a */
exports.getQuestion7Page4aPost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var newGuid = null;

  // perform the field validation
  var validationOutput = validator.validateQuestion7Page4a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question7-4a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  // add the new item to the list
  if (req.session.data["q7iiNonUKGovernmentList"] == null) {
    req.session.data["q7iiNonUKGovernmentList"] = [];
  }

  // are we editing?
  if (req.session.data["q7iiEditingData"] === "true") {
    // remove this item from the list
    newGuid = req.session.data["q7iiOtherNonUkEntityId"];
  } else {
    newGuid = uuid.v4();
  }

  // create the new JSON objec
  var newNotificationItem = {
    id: newGuid,
    q7iiNameOfNonUKGoverment: req.session.data["q7iiNameOfNonUKGoverment"],
    q7iiNameOfPersonActingNonUKGoverment:
      req.session.data["q7iiNameOfPersonActingNonUKGoverment"],
    q7iiShareOwnershipVotingRights:
      req.session.data["q7iiShareOwnershipVotingRights"],
    q7iiAnythingToDeclare: req.session.data["q7iiAnythingToDeclare"],
  };

  if (req.session.data["q7iiEditingData"] === "true") {
    for (
      var i = 0;
      i < req.session.data["q7iiNonUKGovernmentList"].length;
      i++
    ) {
      if (req.session.data["q7iiNonUKGovernmentList"][i].id === newGuid) {
        req.session.data["q7iiNonUKGovernmentList"][
          i
        ].q7iiNameOfNonUKGoverment =
          newNotificationItem.q7iiNameOfNonUKGoverment;
        req.session.data["q7iiNonUKGovernmentList"][
          i
        ].q7iiNameOfPersonActingNonUKGoverment =
          newNotificationItem.q7iiNameOfPersonActingNonUKGoverment;
        req.session.data["q7iiNonUKGovernmentList"][
          i
        ].q7iiShareOwnershipVotingRights =
          newNotificationItem.q7iiShareOwnershipVotingRights;
        req.session.data["q7iiNonUKGovernmentList"][i].q7iiAnythingToDeclare =
          newNotificationItem.q7iiAnythingToDeclare;
      }
    }
  } else {
    req.session.data["q7iiNonUKGovernmentList"].push(newNotificationItem);
  }

  // remove the posted fields fields from the data array
  req.session.data["q7iiNameOfNonUKGoverment"] = "";
  req.session.data["q7iiNameOfPersonActingNonUKGoverment"] = "";
  req.session.data["q7iiShareOwnershipVotingRights"] = "";
  req.session.data["q7iiAnythingToDeclare"] = "";

  webHelper.sessionRedirect(next, res, req, "/mandatory/question7/question7-4");
};

/* Handles the post for question 7 page 4a */
exports.getQuestion7Page4cya = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var newPostData = {};

  for (var i = 0; i < req.session.data["q7iiNonUKGovernmentList"].length; i++) {
    if (req.session.data["q7iiNonUKGovernmentList"][i].id === req.params.id) {
      newPostData["q7iiOtherNonUkEntityId"] =
        req.session.data["q7iiNonUKGovernmentList"][i].id;
      newPostData["q7iiNameOfNonUKGoverment"] =
        req.session.data["q7iiNonUKGovernmentList"][i].q7iiNameOfNonUKGoverment;
      newPostData["q7iiNameOfPersonActingNonUKGoverment"] =
        req.session.data["q7iiNonUKGovernmentList"][
          i
        ].q7iiNameOfPersonActingNonUKGoverment;
      newPostData["q7iiShareOwnershipVotingRights"] =
        req.session.data["q7iiNonUKGovernmentList"][
          i
        ].q7iiShareOwnershipVotingRights;
      newPostData["q7iiAnythingToDeclare"] =
        req.session.data["q7iiNonUKGovernmentList"][i].q7iiAnythingToDeclare;

      // got the record so jump out
      break;
    }
  }

  // remove the posted fields fields from the data array
  req.session.data["q7iiNameOfNonUKGoverment"] = "";
  req.session.data["q7iiShareOwnershipVotingRights"] = "";
  req.session.data["q7iiNameOfPersonActingNonUKGoverment"] = "";
  req.session.data["q7iiAnythingToDeclare"] = "";

  res.render("mandatory/question7-4a", { data: newPostData, isEditing: true });
};

/* Handles the get for question 7 page 4 remove item */
exports.getQuestion7Page4rem = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var recordRef = "";

  // get the name of the record we are deleting
  for (var i = 0; i < req.session.data["q7iiNonUKGovernmentList"].length; i++) {
    if (req.session.data["q7iiNonUKGovernmentList"][i].id === req.params.id) {
      recordRef =
        req.session.data["q7iiNonUKGovernmentList"][i].q7iiNameOfNonUKGoverment;

      // got the record so jump out
      break;
    }
  }

  res.render("mandatory/question7-4conf", {
    nonGovernmentEntityId: req.params.id,
    nonGovernmentEntityRef: recordRef,
  });
};

/* Handles the post for question 7 page 4 remove confirmation */
exports.getQuestion7Page4remConfPost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var foundIndex = -1;

  if (req.session.data["q7iiremove"] === "Yes") {
    for (
      var i = 0;
      i < req.session.data["q7iiNonUKGovernmentList"].length;
      i++
    ) {
      if (
        req.session.data["q7iiNonUKGovernmentList"][i].id ===
        req.session.data["q7iirecordToRemoveId"]
      ) {
        foundIndex = i;

        // jump out
        break;
      }
    }

    if (foundIndex > -1) {
      req.session.data["q7iiNonUKGovernmentList"].splice(foundIndex, 1);
    }
  }

  // clean up
  req.session.data["q7iirecordToRemoveId"] = "";
  req.session.data["q7iiremove"] = "";

  webHelper.sessionRedirect(next, res, req, "/mandatory/question7/question7-4");
};

/* ************************* QUESTION 7 PART 5 ***************************** */
/* Handles the get for question 7 page 05 - Non-UK Government involvement in the operation or decision making of the acquirer */
exports.question7Page05 = async function (req, res, next) {
  //log.Debug("Starting get question 7 page 05", "question7.controller", "GET:question7Page05");
  if (
    req.session.data["q7iiiNonUKRoleInOperationList"] == null ||
    req.session.data["q7iiiNonUKRoleInOperationList"].length == 0
  ) {
    res.render("mandatory/question7-05", { data: req.session.data });
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question7/question7-5"
    );
  }
};

/* Handles the Post for question 7 page 05 - Non-UK Government involvement in the operation or decision making of the acquirer */
exports.question7Page05Post = async function (req, res, next) {
  //log.Debug("Starting post question 7 page 05", "question7.controller", "POST:question7Page05Post");
  // perform the field validation
  var validationOutput = validator.validateQuestion7Page05(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question7-05", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (req.body["q7iiiNonUKGovt"] === "Yes") {
    // Go to the add Non-UK government page
    if (
      req.session.data["q7iiiNonUKRoleInOperationList"] == null ||
      req.session.data["q7iiiNonUKRoleInOperationList"].length == 0
    ) {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/mandatory/question7/question7-5a"
      );
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/mandatory/question7/question7-5"
      );
    }
  } else if (req.body["q7iiiNonUKGovt"] === "No") {
    // Go to the additional information page
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question7/question7-6"
    );
  } else if (req.body["q7iiiNonUKGovt"] === "DontKnow") {
    // Go to the additional information page
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question7/question7-6"
    );
  } else {
    // Go to the prompt question page
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question7/question7-05"
    );
  }
};

/* Handles the get for question 7 page 5 */
exports.getQuestion7Page5 = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("mandatory/question7-5", { data: req.session.data });
};

/* Handles the post for question 7 page 5 */
exports.getQuestion7Page5Post = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  // do we need to show add more non-UK entities?
  if (req.session.data["q7iiiNonUKRoleInOperation"] === "Yes") {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question7/question7-5a"
    );
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question7/question7-6"
    );
  }
};

/* Handles the get for question 7 page 5a */
exports.getQuestion7Page5a = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("mandatory/question7-5a", { data: req.session.data });
};

/* Handles the post for question 7 page 5a */
exports.getQuestion7Page5aPost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var newGuid = null;

  // perform the field validation
  var validationOutput = validator.validateQuestion7Page5a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question7-5a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  // add the new item to the list
  if (req.session.data["q7iiiNonUKRoleInOperationList"] == null) {
    req.session.data["q7iiiNonUKRoleInOperationList"] = [];
  }

  // are we editing?
  if (req.session.data["q7iiiEditingData"] === "true") {
    // remove this item from the list
    newGuid = req.session.data["q7iiiNonUKRoleInOperationId"];
  } else {
    newGuid = uuid.v4();
  }

  // create the new JSON objec
  var newNotificationItem = {
    id: newGuid,
    q7iiiNameOfNonUKGoverment: req.session.data["q7iiiNameOfNonUKGoverment"],
    q7iiiBriefInterestDescription:
      req.session.data["q7iiiBriefInterestDescription"],
  };

  if (req.session.data["q7iiiEditingData"] === "true") {
    for (
      var i = 0;
      i < req.session.data["q7iiiNonUKRoleInOperationList"].length;
      i++
    ) {
      if (req.session.data["q7iiiNonUKRoleInOperationList"][i].id === newGuid) {
        req.session.data["q7iiiNonUKRoleInOperationList"][
          i
        ].q7iiiNameOfNonUKGoverment =
          newNotificationItem.q7iiiNameOfNonUKGoverment;
        req.session.data["q7iiiNonUKRoleInOperationList"][
          i
        ].q7iiiBriefInterestDescription =
          newNotificationItem.q7iiiBriefInterestDescription;
      }
    }
  } else {
    req.session.data["q7iiiNonUKRoleInOperationList"].push(newNotificationItem);
  }

  // remove the posted fields fields from the data array
  req.session.data["q7iiiNameOfNonUKGoverment"] = "";
  req.session.data["q7iiiBriefInterestDescription"] = "";

  webHelper.sessionRedirect(next, res, req, "/mandatory/question7/question7-5");
};

/* Handles the post for question 7 page 5a */
exports.getQuestion7Page5cya = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var newPostData = {};

  for (
    var i = 0;
    i < req.session.data["q7iiiNonUKRoleInOperationList"].length;
    i++
  ) {
    if (
      req.session.data["q7iiiNonUKRoleInOperationList"][i].id === req.params.id
    ) {
      newPostData["q7iiiNonUKRoleInOperationId"] =
        req.session.data["q7iiiNonUKRoleInOperationList"][i].id;
      newPostData["q7iiiNameOfNonUKGoverment"] =
        req.session.data["q7iiiNonUKRoleInOperationList"][
          i
        ].q7iiiNameOfNonUKGoverment;
      newPostData["q7iiiBriefInterestDescription"] =
        req.session.data["q7iiiNonUKRoleInOperationList"][
          i
        ].q7iiiBriefInterestDescription;

      // got the record so jump out
      break;
    }
  }

  // remove the posted fields fields from the data array
  req.session.data["q7iiiNameOfNonUKGoverment"] = "";
  req.session.data["q7iiiBriefInterestDescription"] = "";

  res.render("mandatory/question7-5a", { data: newPostData, isEditing: true });
};

/* Handles the get for question 7 page 5 remove item */
exports.getQuestion7Page5rem = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var recordRef = "";

  // get the name of the record we are deleting
  for (
    var i = 0;
    i < req.session.data["q7iiiNonUKRoleInOperationList"].length;
    i++
  ) {
    if (
      req.session.data["q7iiiNonUKRoleInOperationList"][i].id === req.params.id
    ) {
      recordRef =
        req.session.data["q7iiiNonUKRoleInOperationList"][i]
          .q7iiiNameOfNonUKGoverment;

      // got the record so jump out
      break;
    }
  }

  res.render("mandatory/question7-5conf", {
    nonGovernmentEntityId: req.params.id,
    nonGovernmentEntityRef: recordRef,
  });
};

/* Handles the post for question 7 page 5 remove confirmation */
exports.getQuestion7Page5remConfPost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var foundIndex = -1;

  if (req.session.data["q7iiiremove"] === "Yes") {
    for (
      var i = 0;
      i < req.session.data["q7iiiNonUKRoleInOperationList"].length;
      i++
    ) {
      if (
        req.session.data["q7iiiNonUKRoleInOperationList"][i].id ===
        req.session.data["q7iiirecordToRemoveId"]
      ) {
        foundIndex = i;

        // jump out
        break;
      }
    }

    if (foundIndex > -1) {
      req.session.data["q7iiiNonUKRoleInOperationList"].splice(foundIndex, 1);
    }
  }

  // clean up
  req.session.data["q7iiirecordToRemoveId"] = "";
  req.session.data["q7iiiremove"] = "";

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/mandatory/question7/question7-05"
  );
};

/* ************************* QUESTION 7 PART 6 ***************************** */

/* Handles the get for question 7 page 6 */
exports.getQuestion7Page6 = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("mandatory/question7-6", { data: req.session.data });
};

/* Handles the post for question 7 page 6 */
exports.getQuestion7Page6Post = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  // perform the field validation
  var validationOutput = validator.validateQuestion7Page6(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question7-6", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  // do we need to show add more non-UK entities?
  webHelper.sessionRedirect(next, res, req, "/mandatory/task-list");
};
