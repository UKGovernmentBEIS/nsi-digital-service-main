var webHelper = require("../../localmodules/webHelpers");
var fileUploadValidator = require("../../localmodules/fileuploadvalidator");

/* ************************* QUESTION 9 PART 1 ***************************** */

/* Handles the get for question 9 page 1 */
exports.question9Page1 = async function (req, res, next) {
  if (
    req.session.uploadValidation == null ||
    req.session.uploadValidation == ""
  ) {
    res.render("retrospective/question9-1", { data: req.session.data });
  } else {
    res.render("retrospective/question9-1", {
      data: req.session.data,
      uploadvalidation: req.session.uploadValidation,
    });
  }
};

/* Handles the post for question 9 page 1 */
exports.question9Page1Post = async function (req, res, next) {
  //log.Debug("Starting post question 6 page 1", "question6.controller", "POST:question6Page1Post");
  var uploadedFile1;
  var uploadedFile2;
  var uploadedFile3;
  var uploadedFile4;
  var dataUpload1;
  var dataUpload2;
  var dataUpload3;
  var dataUpload4;

  // No files uploaded, continue as normal
  if (!req.files || Object.keys(req.files).length === 0) {
    req.session.uploadValidation = null;
    webHelper.sessionRedirect(next, res, req, "/retrospective/task-list");
    return;
  }

  // Perform the file upload validation
  var uploadValidation =
    fileUploadValidator.retroValidateFileUploadQuestion9Page1(req);
  if (uploadValidation.isValid === false) {
    req.session.uploadValidation = uploadValidation;
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/retrospective/question9/question9-1"
    );
    return;
  }

  // The name of the input field (i.e. "fileuploadAdditionalDocumentation1" etc...) is used to retrieve the uploaded file
  if (req.files.fileuploadAdditionalDocumentation1 != null) {
    uploadedFile1 = req.files.fileuploadAdditionalDocumentation1;
    var controlId = "fileuploadAdditionalDocumentation1Id";

    var buffer = uploadedFile1.data;
    dataUpload1 = await webHelper.storeFileContent(
      req,
      uploadedFile1.mimetype,
      "9.1",
      uploadedFile1.name,
      buffer,
      controlId
    );
  }

  if (req.files.fileuploadAdditionalDocumentation2 != null) {
    uploadedFile2 = req.files.fileuploadAdditionalDocumentation2;
    var controlId = "fileuploadAdditionalDocumentation2Id";

    var buffer = uploadedFile2.data;
    dataUpload2 = await webHelper.storeFileContent(
      req,
      uploadedFile2.mimetype,
      "9.2",
      uploadedFile2.name,
      buffer,
      controlId
    );
  }

  if (req.files.fileuploadAdditionalDocumentation3 != null) {
    uploadedFile3 = req.files.fileuploadAdditionalDocumentation3;
    var controlId = "fileuploadAdditionalDocumentation3Id";

    var buffer = uploadedFile3.data;
    dataUpload3 = await webHelper.storeFileContent(
      req,
      uploadedFile3.mimetype,
      "9.3",
      uploadedFile3.name,
      buffer,
      controlId
    );
  }

  if (req.files.fileuploadAdditionalDocumentation4 != null) {
    uploadedFile4 = req.files.fileuploadAdditionalDocumentation4;
    var controlId = "fileuploadAdditionalDocumentation4Id";

    var buffer = uploadedFile4.data;
    dataUpload4 = await webHelper.storeFileContent(
      req,
      uploadedFile4.mimetype,
      "9.4",
      uploadedFile4.name,
      buffer,
      controlId
    );
  }

  if (dataUpload1 == "success") {
    // Store the filename in the session
    req.session.data["fileuploadAdditionalDocumentation1Name"] =
      uploadedFile1.name;
    req.session.data["q9isuccessMessage"] += uploadedFile1.name + ", ";
  }

  if (dataUpload2 == "success") {
    // Store the filename in the session
    req.session.data["fileuploadAdditionalDocumentation2Name"] =
      uploadedFile2.name;
    req.session.data["q9isuccessMessage"] += uploadedFile2.name + ", ";
  }

  if (dataUpload3 == "success") {
    // Store the filename in the session
    req.session.data["fileuploadAdditionalDocumentation3Name"] =
      uploadedFile3.name;
    req.session.data["q9isuccessMessage"] += uploadedFile3.name + ", ";
  }

  if (dataUpload4 == "success") {
    // Store the filename in the session
    req.session.data["fileuploadAdditionalDocumentation4Name"] =
      uploadedFile4.name;
    req.session.data["q9isuccessMessage"] += uploadedFile4.name + ", ";
  }

  req.session.uploadValidation = null;
  webHelper.sessionRedirect(next, res, req, "/retrospective/task-list");
};

/* Handles the post for question 9 page 1 */
exports.question9Page1PostConfirm = async function (req, res, next) {
  //log.Debug("Starting post question 6 page 1", "question6.controller", "POST:question6Page1PostConfirm");

  // Tidy up the previous data
  req.session.data["q9isuccessMessage"] = "";

  webHelper.sessionRedirect(next, res, req, "/retrospective/task-list");
};

/* Handles the get for question 9 page 1 remove item */
exports.question9Page1rem = async function (req, res, next) {
  var recordRef = req.params.docname;
  var lookupCtlName = req.params.docname + "Name";
  var lookupCtlId = req.params.docname + "Id";

  req.session.data["q9fileName"] = lookupCtlName;
  req.session.data["q9fileId"] = lookupCtlId;
  var recordRef = req.session.data[lookupCtlName];

  res.render("retrospective/question9-1conf", {
    uploadedFileId: req.params.id,
    uploadedFileName: recordRef,
  });
};

/* Handles the post for question 9 page 1 remove confirmation */
exports.question9Page1RemConfPost = async function (req, res, next) {
  var recordId = req.session.data["q9iRecordToRemoveId"];

  if (req.session.data["q9iremove"] === "Yes") {
    // Perform DB delete
    var dataRemoved = await webHelper.deleteUploadedFile(recordId);

    if (dataRemoved == "error") {
      return next({ message: "Error deleting the document.", status: 500 });
    }

    // Clear the session variable(s)
    req.session.data["q9iRecordToRemoveId"] = "";
    req.session.data["q9iremove"] = "";
    req.session.data[req.session.data["q9fileName"]] = "";
    req.session.data[req.session.data["q9fileId"]] = "";
    req.session.uploadValidation = null;
  }

  // Redirect to the file upload 9-1 page
  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/retrospective/question9/question9-1"
  );
};

/* Handles the get for question 9 page 1 download notification */
exports.question9Page1ViewContent = async function (req, res, next) {
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
