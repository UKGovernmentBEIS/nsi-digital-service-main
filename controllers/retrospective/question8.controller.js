var uuid = require("uuid");
var webHelper = require("../../localmodules/webHelpers");
var fileUploadValidator = require("../../localmodules/fileuploadvalidator");
var validator = require("../../localmodules/voluntaryvalidator");

/* ************************* QUESTION 8 PART 1 ***************************** */

/* Handles the get for question 8 page 1 */
exports.question8Page1 = async function (req, res, next) {
  if (
    req.session.uploadValidation == null ||
    req.session.uploadValidation == ""
  ) {
    res.render("retrospective/question8-1", { data: req.session.data });
  } else {
    res.render("retrospective/question8-1", {
      data: req.session.data,
      uploadvalidation: req.session.uploadValidation,
    });
  }
};

/* Handles the post for question 8 page 1 */
exports.question8Page1Post = async function (req, res, next) {
  //log.Debug("Starting post question 8 page 1", "question6.controller", "POST:question6Page1Post");
  var uploadedFile;

  // Perform the file upload validation
  var uploadValidation =
    fileUploadValidator.retroValidateFileUploadQuestion8Page1(req);
  if (uploadValidation.isValid === false) {
    req.session.uploadValidation = uploadValidation;
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question8/question8-1"
    );
    return;
  }
  // The name of the input field (i.e. "fileuploadPreAcquisitionChart") is used to retrieve the uploaded file
  uploadedFile = req.files.fileuploadControllingOwnershipChart;
  var controlId = "fileuploadControllingOwnershipChartId";

  var buffer = uploadedFile.data;
  //console.log(buffer.toString('utf8'));

  // Call to save the uploaded data to the database
  var dataUpload = await webHelper.storeFileContent(
    req,
    uploadedFile.mimetype,
    "8.1",
    uploadedFile.name,
    buffer,
    controlId
  );

  // Perform the file move and session initialisation if successful
  if (dataUpload == "success") {
    // Store the filename and path in the session
    req.session.data["q8iControllingOwnershipFileName"] = uploadedFile.name;
    req.session.data["q8isuccessMessage"] =
      "You have successfully uploaded the chart pdf document: " +
      uploadedFile.name;

    req.session.uploadValidation = null;

    if (
      req.session.data["q8iiBoardMembersList"] == null ||
      req.session.data["q8iiBoardMembersList"].length == 0
    ) {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/retrospective/question8/question8-2a"
      );
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/retrospective/question8/question8-2"
      );
    }
  } else {
    return next({
      message: "File could not be saved to the database",
      status: 500,
    });
  }
};

/* Handles the post for question 8 page 1 */
exports.question8Page1PostConfirm = async function (req, res, next) {
  //log.Debug("Starting post question 8 page 1", "question6.controller", "POST:question6Page1PostConfirm");

  if (
    req.session.data["q8iiBoardMembersList"] == null ||
    req.session.data["q8iiBoardMembersList"].length == 0
  ) {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question8/question8-2a"
    );
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question8/question8-2"
    );
  }
};

/* ************************* QUESTION 8 PART 2 ***************************** */

/* Handles the get for question 8 page 2 */
exports.getQuestion8Page2 = async function (req, res, next) {
  if (
    req.session.data["q8iiBoardMembersList"] == null ||
    req.session.data["q8iiBoardMembersList"].length == 0
  ) {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question8/question8-2a"
    );
  } else {
    res.render("retrospective/question8-2", { data: req.session.data });
  }
};

/* Handles the post for question 8 page 2 */
exports.getQuestion8Page2Post = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  // do we need to show add more non-UK entities?
  if (req.session.data["q8iiBoardMembers"] === "Yes") {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question8/question8-2a"
    );
  } else {
    webHelper.sessionRedirect(next, res, req, "/retrospective/task-list");
  }
};

/* Handles the get for question 8 page 2a */
exports.getQuestion8Page2a = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("retrospective/question8-2a", { data: req.session.data });
};

/* Handles the post for question 8 page 2a post */
exports.getQuestion8Page2aPost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var newGuid = null;

  // perform the field validation
  var validationOutput = validator.validateQuestion8Page2a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("retrospective/question8-2a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  // add the new item to the list
  if (req.session.data["q8iiBoardMembersList"] == null) {
    req.session.data["q8iiBoardMembersList"] = [];
  }

  // are we editing?
  if (req.session.data["q8iiEditingData"] === "true") {
    // remove this item from the list
    newGuid = req.session.data["q8iiBoardMemberId"];
  } else {
    newGuid = uuid.v4();
  }

  // create a readable date string
  var newDateString =
    req.session.data["q8iiDateOfBirthDay"] +
    "/" +
    req.session.data["q8iiDateOfBirthMonth"] +
    "/" +
    req.session.data["q8iiDateOfBirthYear"];

  // create the new JSON objec
  var newNotificationItem = {
    id: newGuid,
    q8iiNameOfBoardMember: req.session.data["q8iiNameOfBoardMember"],
    q8iiDateOfBirth: newDateString,
    q8iiPositionHeld: req.session.data["q8iiPositionHeld"],
    q8iiClassifiedPolitically: req.session.data["q8iiClassifiedPolitically"],
  };

  if (req.session.data["q8iiEditingData"] === "true") {
    for (var i = 0; i < req.session.data["q8iiBoardMembersList"].length; i++) {
      if (req.session.data["q8iiBoardMembersList"][i].id === newGuid) {
        req.session.data["q8iiBoardMembersList"][i].q8iiNameOfBoardMember =
          newNotificationItem.q8iiNameOfBoardMember;
        (req.session.data["q8iiBoardMembersList"][i].q8iiDateOfBirth =
          newNotificationItem.q8iiDateOfBirth),
          (req.session.data["q8iiBoardMembersList"][i].q8iiPositionHeld =
            newNotificationItem.q8iiPositionHeld);
        req.session.data["q8iiBoardMembersList"][i].q8iiClassifiedPolitically =
          newNotificationItem.q8iiClassifiedPolitically;
      }
    }
  } else {
    req.session.data["q8iiBoardMembersList"].push(newNotificationItem);
  }

  // remove the posted fields fields from the data array
  req.session.data["q8iiNameOfBoardMember"] = "";
  req.session.data["q8iiPositionHeld"] = "";
  req.session.data["q8iiClassifiedPolitically"] = "";
  req.session.data["q8iiDateOfBirthDay"] = "";
  req.session.data["q8iiDateOfBirthMonth"] = "";
  req.session.data["q8iiDateOfBirthYear"] = "";

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/retrospective/question8/question8-2"
  );
};

/* Handles the post for question 8 page 2cya */
exports.getQuestion8Page2cya = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var newPostData = {};

  for (var i = 0; i < req.session.data["q8iiBoardMembersList"].length; i++) {
    if (req.session.data["q8iiBoardMembersList"][i].id === req.params.id) {
      var dateParts =
        req.session.data["q8iiBoardMembersList"][i].q8iiDateOfBirth.split("/");

      newPostData["q8iiBoardMemberId"] =
        req.session.data["q8iiBoardMembersList"][i].id;
      newPostData["q8iiNameOfBoardMember"] =
        req.session.data["q8iiBoardMembersList"][i].q8iiNameOfBoardMember;
      newPostData["q8iiDateOfBirthDay"] = dateParts[0];
      newPostData["q8iiDateOfBirthMonth"] = dateParts[1];
      newPostData["q8iiDateOfBirthYear"] = dateParts[2];
      newPostData["q8iiPositionHeld"] =
        req.session.data["q8iiBoardMembersList"][i].q8iiPositionHeld;
      newPostData["q8iiClassifiedPolitically"] =
        req.session.data["q8iiBoardMembersList"][i].q8iiClassifiedPolitically;

      // got the record so jump out
      break;
    }
  }

  // remove the posted fields fields from the data array
  req.session.data["q8iiNameOfBoardMember"] = "";
  req.session.data["q8iiPositionHeld"] = "";
  req.session.data["q8iiClassifiedPolitically"] = "";
  req.session.data["q8iiDateOfBirthDay"] = "";
  req.session.data["q8iiDateOfBirthMonth"] = "";
  req.session.data["q8iiDateOfBirthYear"] = "";

  res.render("retrospective/question8-2a", {
    data: newPostData,
    isEditing: true,
  });
};

/* Handles the get for question 8 page 2 remove item */
exports.getQuestion8Page2rem = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var recordRef = "";

  // get the name of the record we are deleting
  for (var i = 0; i < req.session.data["q8iiBoardMembersList"].length; i++) {
    if (req.session.data["q8iiBoardMembersList"][i].id === req.params.id) {
      recordRef =
        req.session.data["q8iiBoardMembersList"][i].q8iiNameOfBoardMember;

      // got the record so jump out
      break;
    }
  }

  res.render("retrospective/question8-2conf", {
    boardMemberId: req.params.id,
    boardMemberRef: recordRef,
  });
};

/* Handles the post for question 8 page 2 remove confirmation */
exports.getQuestion8Page2remConfPost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");
  var foundIndex = -1;

  if (req.session.data["q8iiremove"] === "Yes") {
    for (var i = 0; i < req.session.data["q8iiBoardMembersList"].length; i++) {
      if (
        req.session.data["q8iiBoardMembersList"][i].id ===
        req.session.data["q8iirecordToRemoveId"]
      ) {
        foundIndex = i;

        // jump out
        break;
      }
    }

    if (foundIndex > -1) {
      req.session.data["q8iiBoardMembersList"].splice(foundIndex, 1);
    }
  }

  // clean up
  req.session.data["q8iirecordToRemoveId"] = "";
  req.session.data["q8iiremove"] = "";

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/retrospective/question8/question8-2"
  );
};

/* Handles the get for question 8 page 1 remove item */
exports.question8Page1rem = async function (req, res, next) {
  var recordRef = req.session.data["q8iControllingOwnershipFileName"];

  res.render("retrospective/question8-1conf", {
    uploadedFileId: req.params.id,
    uploadedFileName: recordRef,
  });
};

/* Handles the post for question 8 page 1 remove confirmation */
exports.question8Page1RemConfPost = async function (req, res, next) {
  var recordId = req.session.data["q8iRecordToRemoveId"];

  if (req.session.data["q8iremove"] === "Yes") {
    // Perform DB delete
    var dataRemoved = await webHelper.deleteUploadedFile(recordId);

    if (dataRemoved == "error") {
      return next({ message: "Error deleting the document.", status: 500 });
    }

    // Clear the session variable(s)
    req.session.data["q8iRecordToRemoveId"] = "";
    req.session.data["q8iremove"] = "";
    req.session.data["q8iControllingOwnershipFileName"] = "";
    req.session.data["fileuploadControllingOwnershipChartId"] = "";
    req.session.uploadValidation = null;
  }

  // Redirect to the file upload 8-1 page
  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/retrospective/question8/question8-1"
  );
};

/* Handles the get for question 8 page 1 download notification */
exports.question8Page1ViewContent = async function (req, res, next) {
  var recordId = req.params.id;

  // Perform DB fetch
  var documentFetch = await webHelper.getNotificationDocument(recordId);

  if (documentFetch == "error") {
    return next({ message: "Error downloading the document.", status: 500 });
  }

  res.setHeader(
    "Content-disposition",
    "attachment; filename=" + documentFetch.documentname
  );
  res.setHeader("Content-type", documentFetch.documenttype);
  //var filestream = fs.createReadStream(documentFetch.documentcontent);
  var filestream = webHelper.bufferToStream(documentFetch.documentcontent);
  filestream.pipe(res);
};
