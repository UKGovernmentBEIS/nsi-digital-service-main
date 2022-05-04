var uuid = require("uuid");
var webHelper = require("../../localmodules/webHelpers");
var fileUploadValidator = require("../../localmodules/fileuploadvalidator");
var validator = require("../../localmodules/voluntaryvalidator");

/* Handles the get for question 6 page 1 */
exports.question6Page1 = async function (req, res, next) {
  //log.Debug("Starting get question 6 page 1", "question6.controller", "GET:question6Page1");
  if (
    req.session.uploadValidation == null ||
    req.session.uploadValidation == ""
  ) {
    res.render("voluntary/question6-1", { data: req.session.data });
  } else {
    res.render("voluntary/question6-1", {
      data: req.session.data,
      uploadvalidation: req.session.uploadValidation,
    });
  }
};

/* Handles the post for question 6 page 1 */
exports.question6Page1PostConfirm = async function (req, res, next) {
  //log.Debug("Starting post question 6 page 1", "question6.controller", "POST:question6Page1PostConfirm");

  webHelper.sessionRedirect(next, res, req, "/voluntary/question6/question6-2");
};

/* Handles the post for question 6 page 1 */
exports.question6Page1Post = async function (req, res, next) {
  //log.Debug("Starting post question 6 page 1", "question6.controller", "POST:question6Page1Post");
  var uploadedFile;

  // Perform the file upload validation
  var uploadValidation =
    fileUploadValidator.voluntaryValidateFileUploadQuestion6Page1(req);
  if (uploadValidation.isValid === false) {
    req.session.uploadValidation = uploadValidation;
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question6/question6-1"
    );
    return;
  }

  // The name of the input field (i.e. "fileuploadPreAcquisitionChart") is used to retrieve the uploaded file
  uploadedFile = req.files.fileuploadPreAcquisitionChart;
  var controlId = "fileuploadPreAcquisitionChartId";

  var buffer = uploadedFile.data;
  //console.log(buffer.toString('utf8'));

  // Call to save the uploaded data to the database
  var dataUpload = await webHelper.storeFileContent(
    req,
    uploadedFile.mimetype,
    "6.1",
    uploadedFile.name,
    buffer,
    controlId
  );

  // Perform the file move and session initialisation if successful
  if (dataUpload == "success") {
    // Store the filename and path in the session
    req.session.data["q6iPreAcquisitionChartFileName"] = uploadedFile.name;
    req.session.data["q6isuccessMessage"] =
      "You have successfully uploaded the pre-acquisition chart pdf document: " +
      uploadedFile.name;

    req.session.uploadValidation = null;
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question6/question6-2"
    );
  } else {
    return next({
      message: "File could not be saved to the database",
      status: 500,
    });
  }
};

/* Handles the get for question 6 page 2 - Post acquisition structure */
exports.question6Page2 = async function (req, res, next) {
  //log.Debug("Starting get question 6 page 2", "question6.controller", "GET:question6Page2");
  if (
    req.session.uploadValidation == null ||
    req.session.uploadValidation == ""
  ) {
    res.render("voluntary/question6-2", { data: req.session.data });
  } else {
    res.render("voluntary/question6-2", {
      data: req.session.data,
      uploadvalidation: req.session.uploadValidation,
    });
  }
};

/* Handles the post for question 6 page 2 - Post acquisition structure */
exports.question6Page2Post = async function (req, res, next) {
  //log.Debug("Starting post question 6 page 2", "question6.controller", "POST:question6Page2Post");
  var uploadedFile;

  // Perform the file upload validation
  var uploadValidation =
    fileUploadValidator.voluntaryValidateFileUploadQuestion6Page2(req);
  if (uploadValidation.isValid === false) {
    req.session.uploadValidation = uploadValidation;
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question6/question6-2"
    );
    return;
  }

  // The name of the input field (i.e. "fileuploadPostAcquisitionChart") is used to retrieve the uploaded file
  uploadedFile = req.files.fileuploadPostAcquisitionChart;
  var controlId = "fileuploadPostAcquisitionChartId";

  var buffer = uploadedFile.data;

  // Call to save the uploaded data to the database
  var dataUpload = await webHelper.storeFileContent(
    req,
    uploadedFile.mimetype,
    "6.2",
    uploadedFile.name,
    buffer,
    controlId
  );

  // Perform the file move and session initialisation if successful
  if (dataUpload == "success") {
    // Store the filename and path in the session
    req.session.data["q6iiPostAcquisitionChartFileName"] = uploadedFile.name;
    req.session.data["q6iisuccessMessage"] =
      "You have successfully uploaded the post-acquisition chart pdf document: " +
      uploadedFile.name;

    req.session.uploadValidation = null;

    if (
      req.session.data["nonUKGovernmentList"] == null ||
      req.session.data["nonUKGovernmentList"].length == 0
    ) {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question6/question6-3"
      );
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question6/question6-4"
      );
    }
  } else {
    return next({
      message: "File could not be saved to the database",
      status: 500,
    });
  }
};

/* Handles the post for question 6 page 2 */
exports.question6Page2PostConfirm = async function (req, res, next) {
  //log.Debug("Starting post question 6 page 2", "question6.controller", "POST:question6Page2PostConfirm");

  webHelper.sessionRedirect(next, res, req, "/voluntary/question6/question6-3");
};

/* Handles the get for question 6 page 3 - Non-UK Government involvement */
exports.question6Page3 = async function (req, res, next) {
  //log.Debug("Starting get question 6 page 3", "question6.controller", "GET:question6Page3");

  res.render("voluntary/question6-3", { data: req.session.data });
};

/* Handles the Post for question 6 page 3 - Non-UK Government involvement */
exports.question6Page3Post = async function (req, res, next) {
  //log.Debug("Starting post question 6 page 3", "question6.controller", "POST:question6Page3Post");
  // perform the field validation
  var validationOutput = validator.validateQuestion6Page3(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("voluntary/question6-3", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (req.body["q6iiiNonUKGovt"] === "Yes") {
    if (
      req.session.data["nonUKGovernmentList"] == null ||
      req.session.data["nonUKGovernmentList"].length == 0
    ) {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question6/question6-4a"
      );
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question6/question6-4"
      );
    }
  } else if (req.body["q6iiiNonUKGovt"] === "No") {
    // Go to the additional information page
    webHelper.sessionRedirect(next, res, req, "/voluntary/task-list");
  } else if (req.body["q6iiiNonUKGovt"] === "DontKnow") {
    // Go to the additional information page
    webHelper.sessionRedirect(next, res, req, "/voluntary/task-list");
  } else {
    // Go to the prompt question page
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question6/question6-3"
    );
  }
};

// ASSET SECTION **************************************************************************
/* Handles the get for question 6 page 1 asset */
exports.question6Page1Asset = async function (req, res, next) {
  //log.Debug("Starting get question 6 page 1", "question6.controller", "GET:question6Page1");
  if (
    req.session.uploadValidation == null ||
    req.session.uploadValidation == ""
  ) {
    res.render("voluntary/question6-1asset", { data: req.session.data });
  } else {
    res.render("voluntary/question6-1asset", {
      data: req.session.data,
      uploadvalidation: req.session.uploadValidation,
    });
  }
};

/* Handles the post for question 6 page 1 asset */
exports.question6Page1PostConfirmAsset = async function (req, res, next) {
  //log.Debug("Starting post question 6 page 1", "question6.controller", "POST:question6Page1PostConfirm");

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/voluntary/question6/question6-2asset"
  );
};

/* Handles the post for question 6 page 1 asset */
exports.question6Page1PostAsset = async function (req, res, next) {
  //log.Debug("Starting post question 6 page 1", "question6.controller", "POST:question6Page1Post");
  var uploadedFile;

  // Perform the file upload validation
  var uploadValidation =
    fileUploadValidator.voluntaryValidateFileUploadQuestion6Page1Asset(req);
  if (uploadValidation.isValid === false) {
    req.session.uploadValidation = uploadValidation;
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question6/question6-1asset"
    );
    return;
  }

  // The name of the input field (i.e. "fileuploadPreAcquisitionChart") is used to retrieve the uploaded file
  uploadedFile = req.files.fileuploadPreAcquisitionChartAsset;
  var controlId = "fileuploadPreAcquisitionChartAssetId";

  var buffer = uploadedFile.data;
  //console.log(buffer.toString('utf8'));

  // Call to save the uploaded data to the database
  var dataUpload = await webHelper.storeFileContent(
    req,
    uploadedFile.mimetype,
    "6.1",
    uploadedFile.name,
    buffer,
    controlId
  );

  // Perform the file move and session initialisation if successful
  if (dataUpload == "success") {
    // Store the filename and path in the session
    req.session.data["q6iPreAcquisitionChartFileNameAsset"] = uploadedFile.name;
    req.session.data["q6isuccessMessageAsset"] =
      "You have successfully uploaded the pre-acquisition chart pdf document: " +
      uploadedFile.name;

    req.session.uploadValidation = null;
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question6/question6-2asset"
    );
  } else {
    return next({
      message: "File could not be saved to the database",
      status: 500,
    });
  }
};

/* Handles the get for question 6 page 2 - Post acquisition structure asset */
exports.question6Page2Asset = async function (req, res, next) {
  //log.Debug("Starting get question 6 page 2", "question6.controller", "GET:question6Page2");
  if (
    req.session.uploadValidation == null ||
    req.session.uploadValidation == ""
  ) {
    res.render("voluntary/question6-2asset", { data: req.session.data });
  } else {
    res.render("voluntary/question6-2asset", {
      data: req.session.data,
      uploadvalidation: req.session.uploadValidation,
    });
  }
};

/* Handles the post for question 6 page 2 - Post acquisition structure asset */
exports.question6Page2PostAsset = async function (req, res, next) {
  //log.Debug("Starting post question 6 page 2", "question6.controller", "POST:question6Page2Post");
  var uploadedFile;

  // Perform the file upload validation
  var uploadValidation =
    fileUploadValidator.voluntaryValidateFileUploadQuestion6Page2Asset(req);
  if (uploadValidation.isValid === false) {
    req.session.uploadValidation = uploadValidation;
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question6/question6-2asset"
    );
    return;
  }

  // The name of the input field (i.e. "fileuploadPostAcquisitionChartAsset") is used to retrieve the uploaded file
  uploadedFile = req.files.fileuploadPostAcquisitionChartAsset;
  var controlId = "fileuploadPostAcquisitionChartAssetId";

  var buffer = uploadedFile.data;

  // Call to save the uploaded data to the database
  var dataUpload = await webHelper.storeFileContent(
    req,
    uploadedFile.mimetype,
    "6.2",
    uploadedFile.name,
    buffer,
    controlId
  );

  // Perform the file move and session initialisation if successful
  if (dataUpload == "success") {
    // Store the filename and path in the session
    req.session.data["q6iiPostAcquisitionChartFileNameAsset"] =
      uploadedFile.name;
    req.session.data["q6iisuccessMessageAsset"] =
      "You have successfully uploaded the post-acquisition chart pdf document: " +
      uploadedFile.name;

    req.session.uploadValidation = null;

    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question6/question6-3asset"
    );
  } else {
    return next({
      message: "File could not be saved to the database",
      status: 500,
    });
  }
};

/* Handles the post for question 6 page 2 asset */
exports.question6Page2PostConfirmAsset = async function (req, res, next) {
  //log.Debug("Starting post question 6 page 2", "question6.controller", "POST:question6Page2PostConfirm");

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/voluntary/question6/question6-3asset"
  );
};

/* Handles the get for question 6 page 3 - Non-UK Government involvement asset */
exports.question6Page3Asset = async function (req, res, next) {
  //log.Debug("Starting get question 6 page 3", "question6.controller", "GET:question6Page3");

  res.render("voluntary/question6-3asset", { data: req.session.data });
};

/* Handles the Post for question 6 page 3 - Non-UK Government involvement asset */
exports.question6Page3PostAsset = async function (req, res, next) {
  //log.Debug("Starting post question 6 page 3", "question6.controller", "POST:question6Page3Post");
  // perform the field validation
  var validationOutput = validator.validateQuestion6Page3Asset(
    req.session.data
  );
  if (validationOutput.isValid === false) {
    res.render("voluntary/question6-3asset", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  // Go to the prompt question page
  webHelper.sessionRedirect(next, res, req, "/voluntary/task-list");
};
// ****************************************************************************************

/* Handles the Get for question 6 page 4 - Non-UK Government involvement - Answer Yes */
exports.question6Page4 = async function (req, res, next) {
  //log.Debug("Starting get question 6 page 4", "question6.controller", "GET:question6Page4");

  res.render("voluntary/question6-4", { data: req.session.data });
};

/* Handles the Post for question 6 page 4 - Non-UK Government involvement */
exports.question6Page4Post = async function (req, res, next) {
  //log.Debug("Starting post question 6 page 4", "question6.controller", "POST:question6Page4Post");

  if (req.body["addNonUKGovernment"] === "Yes") {
    // Go to the add non-uk government details page
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question6/question6-4a"
    );
  } else if (req.body["addNonUKGovernment"] === "No") {
    // Go to the provide additional information page
    webHelper.sessionRedirect(next, res, req, "/voluntary/task-list");
  } else {
    // Go to the same page
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question6/question6-4"
    );
  }
};

/* Handles the Get for question 6 page 4a - Add Non-UK Government */
exports.question6Page4a = async function (req, res, next) {
  //log.Debug("Starting get question 6 page 4a", "question6.controller", "GET:question6Page4a");

  res.render("voluntary/question6-4a", { data: req.session.data });
};

/* Handles the POST for question 6 page 4a - Addition of Non-UK govenment details */
exports.question6Page4aPost = async function (req, res, next) {
  //log.Debug("Starting get question 6 page 4a", "question6.controller", "POST:question6Page4aPost");
  // perform the field validation
  var validationOutput = validator.validateQuestion6Page4a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("voluntary/question6-4a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  var nonUKGovernmentName = req.session.data["q6iiiNonUKGovernmentName"];
  var governmentInterest = req.session.data["q6iiiGovernmentInterest"];
  var itemRef = null;

  // Initialise the array
  if (
    req.session.data["nonUKGovernmentList"] == null ||
    req.session.data["nonUKGovernmentList"] == ""
  ) {
    req.session.data["nonUKGovernmentList"] = [];
  }

  // is it the record edit scenario?
  if (req.session.data["q6iiiDataEdit"] === "true") {
    itemRef = req.session.data["itemRef"];
  } else {
    itemRef = uuid.v4();
  }

  var chartItem = {
    itemRef: itemRef,
    q6iiiNonUKGovernmentName: nonUKGovernmentName,
    q6iiiGovernmentInterest: governmentInterest,
  };

  if (req.session.data["q6iiiDataEdit"] === "true") {
    for (
      var loopIndex = 0;
      loopIndex < req.session.data["nonUKGovernmentList"].length;
      loopIndex++
    ) {
      if (
        req.session.data["nonUKGovernmentList"][loopIndex].itemRef === itemRef
      ) {
        req.session.data["nonUKGovernmentList"][
          loopIndex
        ].q6iiiNonUKGovernmentName = chartItem.q6iiiNonUKGovernmentName;
        req.session.data["nonUKGovernmentList"][
          loopIndex
        ].q6iiiGovernmentInterest = chartItem.q6iiiGovernmentInterest;
      }
    }
  } else {
    req.session.data["nonUKGovernmentList"].push(chartItem);
  }

  // clear the form variables held in the session
  req.session.data["q6iiiNonUKGovernmentName"] = "";
  req.session.data["q6iiiGovernmentInterest"] = "";

  res.render("voluntary/question6-4", { data: req.session.data });
};

/* Handles the GET for the edit scenario of the Non-UK government details */
exports.question6Page4Edit = async function (req, res, next) {
  var editItem = {};

  // Iterate the list and look for the item to be edited
  for (
    var loopIndex = 0;
    loopIndex < req.session.data["nonUKGovernmentList"].length;
    loopIndex++
  ) {
    if (
      req.session.data["nonUKGovernmentList"][loopIndex].itemRef ===
      req.params.id
    ) {
      editItem["itemRef"] =
        req.session.data["nonUKGovernmentList"][loopIndex].itemRef;
      editItem["q6iiiNonUKGovernmentName"] =
        req.session.data["nonUKGovernmentList"][
          loopIndex
        ].q6iiiNonUKGovernmentName;
      editItem["q6iiiGovernmentInterest"] =
        req.session.data["nonUKGovernmentList"][
          loopIndex
        ].q6iiiGovernmentInterest;

      // got the record so jump out
      break;
    }
  }

  // clear the form variables held in the session
  req.session.data["q6iiiNonUKGovernmentName"] = "";
  req.session.data["q6iiiGovernmentInterest"] = "";

  res.render("voluntary/question6-4a", {
    data: editItem,
    editingItem: true,
    sdata: req.session.data,
  });
};

/* Handles the get for question 6 page 4 remove item */
exports.getQuestion6Page4Remove = async function (req, res, next) {
  var nonUKGovernmentName = "";

  // Iterate the list and get the record id for the item to be deleted
  for (
    var loopIndex = 0;
    loopIndex < req.session.data["nonUKGovernmentList"].length;
    loopIndex++
  ) {
    if (
      req.session.data["nonUKGovernmentList"][loopIndex].itemRef ===
      req.params.id
    ) {
      nonUKGovernmentName =
        req.session.data["nonUKGovernmentList"][loopIndex]
          .q6iiiNonUKGovernmentName;

      // got the record so jump out
      break;
    }
  }

  res.render("voluntary/question6-4confirm", {
    recordId: req.params.id,
    q6iiiNonUKGovernmentName: nonUKGovernmentName,
  });
};

/* Handles the post for question 6 page 4 remove confirmation */
exports.getQuestion6Page4RemovePost = async function (req, res, next) {
  var itemIndex = -1;

  if (req.session.data["q6iiiRemove"] === "Yes") {
    for (
      var loopIndex = 0;
      loopIndex < req.session.data["nonUKGovernmentList"].length;
      loopIndex++
    ) {
      if (
        req.session.data["nonUKGovernmentList"][loopIndex].itemRef ===
        req.session.data["q6iiiRecordId"]
      ) {
        itemIndex = loopIndex;

        // item found, break
        break;
      }
    }

    if (itemIndex > -1) {
      req.session.data["nonUKGovernmentList"].splice(itemIndex, 1);
    }
  }

  // clean up
  req.session.data["q6iiiRecordId"] = "";
  req.session.data["q6iiiRemove"] = "";

  webHelper.sessionRedirect(next, res, req, "/voluntary/question6/question6-3");
};

/* Handles the get for question 6 page 1 remove item */
exports.question6Page1rem = async function (req, res, next) {
  var recordRef = req.session.data["q6iPreAcquisitionChartFileName"];

  res.render("voluntary/question6-1conf", {
    uploadedFileId: req.params.id,
    uploadedFileName: recordRef,
  });
};

/* Handles the post for question 6 page 1 remove confirmation */
exports.question6Page1RemConfPost = async function (req, res, next) {
  var recordId = req.session.data["q6iRecordToRemoveId"];

  if (req.session.data["q6iremove"] === "Yes") {
    // Perform DB delete
    var dataRemoved = await webHelper.deleteUploadedFile(recordId);

    if (dataRemoved == "error") {
      return next({ message: "Error deleting the document.", status: 500 });
    }

    // Clear the session variable(s)
    req.session.data["q6iRecordToRemoveId"] = "";
    req.session.data["q6iremove"] = "";
    req.session.data["q6iPreAcquisitionChartFileName"] = "";
    req.session.data["fileuploadPreAcquisitionChartId"] = "";
    req.session.uploadValidation = null;
  }

  // Redirect to the file upload 6-1 page
  webHelper.sessionRedirect(next, res, req, "/voluntary/question6/question6-1");
};

/* Handles the get for question 6 page 1 download notification */
exports.question6Page1ViewContent = async function (req, res, next) {
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
  var filestream = webHelper.bufferToStream(documentFetch.documentcontent);
  filestream.pipe(res);
};

/* Handles the get for question 6 page 2 remove item */
exports.question6Page2rem = async function (req, res, next) {
  var recordRef = req.session.data["q6iiPostAcquisitionChartFileName"];

  res.render("voluntary/question6-2conf", {
    uploadedFileId: req.params.id,
    uploadedFileName: recordRef,
  });
};

/* Handles the post for question 6 page 2 remove confirmation */
exports.question6Page2RemConfPost = async function (req, res, next) {
  var recordId = req.session.data["q6iiRecordToRemoveId"];

  if (req.session.data["q6iiremove"] === "Yes") {
    // Perform DB delete
    var dataRemoved = await webHelper.deleteUploadedFile(recordId);

    if (dataRemoved == "error") {
      return next({ message: "Error deleting the document.", status: 500 });
    }

    // Clear the session variable(s)
    req.session.data["q6iiRecordToRemoveId"] = "";
    req.session.data["q6iiremove"] = "";
    req.session.data["q6iiPostAcquisitionChartFileName"] = "";
    req.session.data["fileuploadPostAcquisitionChartId"] = "";
    req.session.uploadValidation = null;
  }

  // Redirect to the file upload 6-2 page
  webHelper.sessionRedirect(next, res, req, "/voluntary/question6/question6-2");
};

/* Handles the get for question 6 page 2 download notification */
exports.question6Page2ViewContent = async function (req, res, next) {
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
  var filestream = webHelper.bufferToStream(documentFetch.documentcontent);
  filestream.pipe(res);
};

/**** Asset specific Removal and Download controller methods  ****/
/* Handles the get for question 6 page 1 remove item */
exports.question6Page1remAsset = async function (req, res, next) {
  var recordRef = req.session.data["q6iPreAcquisitionChartFileNameAsset"];

  res.render("voluntary/question6-1assetconf", {
    uploadedFileId: req.params.id,
    uploadedFileName: recordRef,
  });
};

/* Handles the post for question 6 page 1 remove confirmation */
exports.question6Page1RemConfPostAsset = async function (req, res, next) {
  var recordId = req.session.data["q6iRecordToRemoveId"];

  if (req.session.data["q6iremove"] === "Yes") {
    // Perform DB delete
    var dataRemoved = await webHelper.deleteUploadedFile(recordId);

    if (dataRemoved == "error") {
      return next({ message: "Error deleting the document.", status: 500 });
    }

    // Clear the session variable(s)
    req.session.data["q6iRecordToRemoveId"] = "";
    req.session.data["q6iremove"] = "";
    req.session.data["q6iPreAcquisitionChartFileNameAsset"] = "";
    req.session.data["fileuploadPreAcquisitionChartAssetId"] = "";
    req.session.uploadValidation = null;
  }

  // Redirect to the file upload 6-1 page
  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/voluntary/question6/question6-1asset"
  );
};

/* Handles the get for question 6 page 1 download notification */
exports.question6Page1ViewContentAsset = async function (req, res, next) {
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
  var filestream = webHelper.bufferToStream(documentFetch.documentcontent);
  filestream.pipe(res);
};

/* Handles the get for question 6 page 2 remove item */
exports.question6Page2remAsset = async function (req, res, next) {
  var recordRef = req.session.data["q6iiPostAcquisitionChartFileNameAsset"];

  res.render("voluntary/question6-2assetconf", {
    uploadedFileId: req.params.id,
    uploadedFileName: recordRef,
  });
};

/* Handles the post for question 6 page 2 remove confirmation */
exports.question6Page2RemConfPostAsset = async function (req, res, next) {
  var recordId = req.session.data["q6iiRecordToRemoveId"];

  if (req.session.data["q6iiremove"] === "Yes") {
    // Perform DB delete
    var dataRemoved = await webHelper.deleteUploadedFile(recordId);

    if (dataRemoved == "error") {
      return next({ message: "Error deleting the document.", status: 500 });
    }

    // Clear the session variable(s)
    req.session.data["q6iiRecordToRemoveId"] = "";
    req.session.data["q6iiremove"] = "";
    req.session.data["q6iiPostAcquisitionChartFileNameAsset"] = "";
    req.session.data["fileuploadPostAcquisitionChartAssetId"] = "";
    req.session.uploadValidation = null;
  }

  // Redirect to the file upload 6-2 page
  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/voluntary/question6/question6-2asset"
  );
};

/* Handles the get for question 6 page 2 download notification */
exports.question6Page2ViewContentAsset = async function (req, res, next) {
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
  var filestream = webHelper.bufferToStream(documentFetch.documentcontent);
  filestream.pipe(res);
};
