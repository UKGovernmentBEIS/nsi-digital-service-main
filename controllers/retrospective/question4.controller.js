var uuid = require("uuid");
var webHelper = require("../../localmodules/webHelpers");
var validator = require("../../localmodules/retrospectivevalidator");

/* ************************* QUESTION 4 PART 1 ***************************** */

/* Handles the get for question 4 page 1 */
exports.getQuestion4Page1 = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("retrospective/question4-1", { data: req.session.data });
};

/* Handles the post for question 4 page 1 */
exports.getQuestion4Page1Post = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  // perform the field validation
  var validationOutput = validator.validateQuestion4Page1(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("retrospective/question4-1", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (
    req.session.data["q4ibRegulatoryApprovalList"] == null ||
    req.session.data["q4ibRegulatoryApprovalList"].length == 0
  ) {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question4/question4-02"
    );
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question4/question4-2"
    );
  }
};

/* ************************* QUESTION 4 PART 2 ***************************** */

/* Handles the get for question 4 page 02 */
exports.getQuestion4Page02 = async function (req, res, next) {
  if (
    req.session.data["q4ibRegulatoryApprovalList"] == null ||
    req.session.data["q4ibRegulatoryApprovalList"].length == 0
  ) {
    res.render("retrospective/question4-02", { data: req.session.data });
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question4/question4-2"
    );
  }
};

/* Handles the post for question 4 page 02 */
exports.getQuestion4Page02Post = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  // perform the field validation
  var validationOutput = validator.validateQuestion4Page02(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("retrospective/question4-02", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  // do we need to show add more regulatory approvals?
  if (req.session.data["q4iiRegulatoryApproval"] === "Yes") {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question4/question4-2a"
    );
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question4/question4-03"
    );
  }
};

/* Handles the get for question 4 page 2 */
exports.getQuestion4Page2 = async function (req, res, next) {
  if (
    req.session.data["q4ibRegulatoryApprovalList"] == null ||
    req.session.data["q4ibRegulatoryApprovalList"].length == 0
  ) {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question4/question4-02"
    );
  } else {
    res.render("retrospective/question4-2", { data: req.session.data });
  }
};

/* Handles the post for question 4 page 2 */
exports.getQuestion4Page2Post = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  // do we need to show add more regulatory approvals?
  if (req.session.data["q4ibaddanotherRegulatoryApproval"] === "Yes") {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question4/question4-2a"
    );
  } else {
    if (
      req.session.data["q4icKeyDatesList"] == null ||
      req.session.data["q4icKeyDatesList"].length == 0
    ) {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/retrospective/question4/question4-03"
      );
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/retrospective/question4/question4-3"
      );
    }
  }
};

/* Handles the get for question 4 page 2a */
exports.getQuestion4Page2a = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("retrospective/question4-2a", { data: req.session.data });
};

/* Handles the post for question 4 page 2a */
exports.getQuestion4Page2aPost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var newGuid = null;

  // perform the field validation
  var validationOutput = validator.validateQuestion4Page2a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("retrospective/question4-2a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  // add the new item to the list
  if (req.session.data["q4ibRegulatoryApprovalList"] == null) {
    req.session.data["q4ibRegulatoryApprovalList"] = [];
  }

  // are we editing?
  if (req.session.data["q4ibEditingData"] === "true") {
    // remove this item from the list
    newGuid = req.session.data["q4ibRegulatoryApprovalId"];
  } else {
    newGuid = uuid.v4();
  }

  // create a readable date string
  var newDateString =
    req.session.data["q4ibRegulatoryApprovalDay"] +
    "/" +
    req.session.data["q4ibRegulatoryApprovalMonth"] +
    "/" +
    req.session.data["q4ibRegulatoryApprovalYear"];

  // create the new JSON objec
  var newNotificationItem = {
    id: newGuid,
    q4ibRegulatorName: req.session.data["q4ibRegulatorName"],
    q4ibRegulatoryApprovalDate: newDateString,
    q4ibAdditionalInfo: req.session.data["q4ibAdditionalInfo"],
  };

  if (req.session.data["q4ibEditingData"] === "true") {
    for (
      var i = 0;
      i < req.session.data["q4ibRegulatoryApprovalList"].length;
      i++
    ) {
      if (req.session.data["q4ibRegulatoryApprovalList"][i].id === newGuid) {
        req.session.data["q4ibRegulatoryApprovalList"][i].q4ibRegulatorName =
          newNotificationItem.q4ibRegulatorName;
        req.session.data["q4ibRegulatoryApprovalList"][
          i
        ].q4ibRegulatoryApprovalDate =
          newNotificationItem.q4ibRegulatoryApprovalDate;
        req.session.data["q4ibRegulatoryApprovalList"][i].q4ibAdditionalInfo =
          newNotificationItem.q4ibAdditionalInfo;
      }
    }
  } else {
    req.session.data["q4ibRegulatoryApprovalList"].push(newNotificationItem);
  }

  // remove the posted fields fields from the data array
  req.session.data["q4ibRegulatorName"] = "";
  req.session.data["q4ibRegulatoryApprovalDay"] = "";
  req.session.data["q4ibRegulatoryApprovalMonth"] = "";
  req.session.data["q4ibRegulatoryApprovalYear"] = "";
  req.session.data["q4ibAdditionalInfo"] = "";

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/retrospective/question4/question4-2"
  );
};

/* Handles the post for question 4 page 2a */
exports.getQuestion4Page2cya = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var newPostData = {};

  for (
    var i = 0;
    i < req.session.data["q4ibRegulatoryApprovalList"].length;
    i++
  ) {
    if (
      req.session.data["q4ibRegulatoryApprovalList"][i].id === req.params.id
    ) {
      var dateParts =
        req.session.data["q4ibRegulatoryApprovalList"][
          i
        ].q4ibRegulatoryApprovalDate.split("/");

      newPostData["q4ibRegulatoryApprovalId"] =
        req.session.data["q4ibRegulatoryApprovalList"][i].id;
      newPostData["q4ibRegulatorName"] =
        req.session.data["q4ibRegulatoryApprovalList"][i].q4ibRegulatorName;
      newPostData["q4ibRegulatoryApprovalDay"] = dateParts[0];
      newPostData["q4ibRegulatoryApprovalMonth"] = dateParts[1];
      newPostData["q4ibRegulatoryApprovalYear"] = dateParts[2];
      newPostData["q4ibAdditionalInfo"] =
        req.session.data["q4ibRegulatoryApprovalList"][i].q4ibAdditionalInfo;

      // got the record so jump out
      break;
    }
  }

  // remove the posted fields fields from the data array
  req.session.data["q4ibRegulatorName"] = "";
  req.session.data["q4ibRegulatoryApprovalDay"] = "";
  req.session.data["q4ibRegulatoryApprovalMonth"] = "";
  req.session.data["q4ibRegulatoryApprovalYear"] = "";
  req.session.data["q4ibAdditionalInfo"] = "";

  res.render("retrospective/question4-2a", {
    data: newPostData,
    isEditing: true,
  });
};

/* Handles the get for question 4 page 2 remove item */
exports.getQuestion4Page2rem = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var recordRef = "";

  // get the name of the record we are deleting
  for (
    var i = 0;
    i < req.session.data["q4ibRegulatoryApprovalList"].length;
    i++
  ) {
    if (
      req.session.data["q4ibRegulatoryApprovalList"][i].id === req.params.id
    ) {
      recordRef =
        req.session.data["q4ibRegulatoryApprovalList"][i].q4ibRegulatorName;

      // got the record so jump out
      break;
    }
  }

  res.render("retrospective/question4-2conf", {
    regulatoryDateId: req.params.id,
    regulatoryDateRef: recordRef,
  });
};

/* Handles the post for question 4 page 2 remove confirmation */
exports.getQuestion4Page2remConfPost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var foundIndex = -1;

  if (req.session.data["q4ibremove"] === "Yes") {
    for (
      var i = 0;
      i < req.session.data["q4ibRegulatoryApprovalList"].length;
      i++
    ) {
      if (
        req.session.data["q4ibRegulatoryApprovalList"][i].id ===
        req.session.data["q4ibrecordToRemoveId"]
      ) {
        foundIndex = i;

        // jump out
        break;
      }
    }

    if (foundIndex > -1) {
      req.session.data["q4ibRegulatoryApprovalList"].splice(foundIndex, 1);
    }
  }

  // clean up
  req.session.data["q4ibrecordToRemoveId"] = "";
  req.session.data["q4ibremove"] = "";

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/retrospective/question4/question4-2"
  );
};

/* ************************* QUESTION 4 PART 3 ***************************** */

/* Handles the get for question 4 page 03 */
exports.getQuestion4Page03 = async function (req, res, next) {
  if (
    req.session.data["q4icKeyDatesList"] == null ||
    req.session.data["q4icKeyDatesList"].length == 0
  ) {
    res.render("retrospective/question4-03", { data: req.session.data });
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question4/question4-3"
    );
  }
};

/* Handles the post for question 4 page 03 */
exports.getQuestion4Page03Post = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  // perform the field validation
  var validationOutput = validator.validateQuestion4Page03(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("retrospective/question4-03", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  // do we need to show add more regulatory approvals?
  if (req.session.data["q4iiiOtherKeyDates"] === "Yes") {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question4/question4-3a"
    );
  } else {
    webHelper.sessionRedirect(next, res, req, "/retrospective/task-list");
  }
};

/* Handles the get for question 4 page 3 */
exports.getQuestion4Page3 = async function (req, res, next) {
  if (
    req.session.data["q4icKeyDatesList"] == null ||
    req.session.data["q4icKeyDatesList"].length == 0
  ) {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question4/question4-03"
    );
  } else {
    res.render("retrospective/question4-3", { data: req.session.data });
  }
};

/* Handles the post for question 4 page 3 */
exports.getQuestion4Page3Post = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  // do we need to show add more regulatory approvals?
  if (req.session.data["q4icAdditionalKeyDates"] === "Yes") {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question4/question4-3a"
    );
  } else {
    webHelper.sessionRedirect(next, res, req, "/retrospective/task-list");
  }
};

/* Handles the get for question 4 page 3a */
exports.getQuestion4Page3a = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("retrospective/question4-3a", { data: req.session.data });
};

/* Handles the post for question 4 page 2a */
exports.getQuestion4Page3aPost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var newGuid = null;

  // perform the field validation
  var validationOutput = validator.validateQuestion4Page3a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("retrospective/question4-3a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  // add the new item to the list
  if (req.session.data["q4icKeyDatesList"] == null) {
    req.session.data["q4icKeyDatesList"] = [];
  }

  // are we editing?
  if (req.session.data["q4icEditingData"] === "true") {
    // remove this item from the list
    newGuid = req.session.data["q4icKeyDatelId"];
  } else {
    newGuid = uuid.v4();
  }

  // create a readable date string
  var newDateString =
    req.session.data["q4icKeyDateDay"] +
    "/" +
    req.session.data["q4icKeyDateMonth"] +
    "/" +
    req.session.data["q4icKeyDateYear"];

  // create the new JSON objec
  var newNotificationItem = {
    id: newGuid,
    question4icShortDescription:
      req.session.data["question4icShortDescription"],
    question4icKeyDate: newDateString,
  };

  if (req.session.data["q4icEditingData"] === "true") {
    for (var i = 0; i < req.session.data["q4icKeyDatesList"].length; i++) {
      if (req.session.data["q4icKeyDatesList"][i].id === newGuid) {
        req.session.data["q4icKeyDatesList"][i].question4icShortDescription =
          newNotificationItem.question4icShortDescription;
        req.session.data["q4icKeyDatesList"][i].question4icKeyDate =
          newNotificationItem.question4icKeyDate;
      }
    }
  } else {
    req.session.data["q4icKeyDatesList"].push(newNotificationItem);
  }

  // remove the posted fields fields from the data array
  req.session.data["question4icShortDescription"] = "";
  req.session.data["q4icKeyDateDay"] = "";
  req.session.data["q4icKeyDateMonth"] = "";
  req.session.data["q4icKeyDateYear"] = "";

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/retrospective/question4/question4-3"
  );
};

/* Handles the post for question 4 page 3a */
exports.getQuestion4Page3cya = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var newPostData = {};

  for (var i = 0; i < req.session.data["q4icKeyDatesList"].length; i++) {
    if (req.session.data["q4icKeyDatesList"][i].id === req.params.id) {
      var dateParts =
        req.session.data["q4icKeyDatesList"][i].question4icKeyDate.split("/");

      newPostData["q4icKeyDatelId"] =
        req.session.data["q4icKeyDatesList"][i].id;
      newPostData["question4icShortDescription"] =
        req.session.data["q4icKeyDatesList"][i].question4icShortDescription;
      newPostData["q4icKeyDateDay"] = dateParts[0];
      newPostData["q4icKeyDateMonth"] = dateParts[1];
      newPostData["q4icKeyDateYear"] = dateParts[2];

      // got the record so jump out
      break;
    }
  }

  // remove the posted fields fields from the data array
  req.session.data["question4icShortDescription"] = "";
  req.session.data["q4icKeyDateDay"] = "";
  req.session.data["q4icKeyDateMonth"] = "";
  req.session.data["q4icKeyDateYear"] = "";

  res.render("retrospective/question4-3a", {
    data: newPostData,
    isEditing: true,
  });
};

/* Handles the get for question 4 page 3 remove item */
exports.getQuestion4Page3rem = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var recordRef = "";

  // get the name of the record we are deleting
  for (var i = 0; i < req.session.data["q4icKeyDatesList"].length; i++) {
    if (req.session.data["q4icKeyDatesList"][i].id === req.params.id) {
      recordRef =
        req.session.data["q4icKeyDatesList"][i].question4icShortDescription;

      // got the record so jump out
      break;
    }
  }

  res.render("retrospective/question4-3conf", {
    keyDateId: req.params.id,
    keyDateRef: recordRef,
  });
};

/* Handles the post for question 4 page 3 remove confirmation */
exports.getQuestion4Page3remConfPost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var foundIndex = -1;

  if (req.session.data["q4icremove"] === "Yes") {
    for (var i = 0; i < req.session.data["q4icKeyDatesList"].length; i++) {
      if (
        req.session.data["q4icKeyDatesList"][i].id ===
        req.session.data["q4icrecordToRemoveId"]
      ) {
        foundIndex = i;

        // jump out
        break;
      }
    }

    if (foundIndex > -1) {
      req.session.data["q4icKeyDatesList"].splice(foundIndex, 1);
    }
  }

  // clean up
  req.session.data["q4icrecordToRemoveId"] = "";
  req.session.data["q4icremove"] = "";

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/retrospective/question4/question4-3"
  );
};
