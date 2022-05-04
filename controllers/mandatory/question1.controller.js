var uuid = require("uuid");
var webHelper = require("../../localmodules/webHelpers");
var validator = require("../../localmodules/mandatoryvalidator");

const addItem = ({ req, listKey, fields, editingItemId, id }) => {
  let newGuid;

  if (req.session.data[listKey] == null) {
    req.session.data[listKey] = [];
  }

  // are we editing?
  if (req.session.data[editingItemId] === "true") {
    newGuid = req.session.data[id];
  } else {
    newGuid = uuid.v4();
  }

  let newListItem = {
    id: newGuid,
  };

  fields.forEach((key) => {
    newListItem[key] = req.session.data[key];
  });

  if (req.session.data[editingItemId] === "true") {
    for (var i = 0; i < req.session.data[listKey].length; i++) {
      if (req.session.data[listKey][i].id === newGuid) {
        fields.forEach((key) => {
          req.session.data[listKey][i][key] = newListItem[key];
        });
      }
    }
  } else {
    req.session.data[listKey].push(newListItem);
  }

  // Clear old values
  fields.forEach((key) => {
    req.session.data[key] = "";
  });
};

const getItem = (req, listKey, fields, id) => {
  var newPostData = {};

  for (var i = 0; i < req.session.data[listKey].length; i++) {
    if (req.session.data[listKey][i].id === req.params.id) {
      newPostData[id] = req.session.data[listKey][i].id;
      fields.forEach((key) => {
        newPostData[key] = req.session.data[listKey][i][key];
      });

      // got the record so jump out
      break;
    }
  }

  fields.forEach((key) => {
    req.session.data[key] = "";
  });

  return newPostData;
};

const getItemRef = (req, listKey, refKey) => {
  var recordRef = "";

  // get the name of the record we are deleting
  for (var i = 0; i < req.session.data[listKey].length; i++) {
    if (req.session.data[listKey][i].id === req.params.id) {
      recordRef = req.session.data[listKey][i][refKey];

      // got the record so jump out
      break;
    }
  }

  return recordRef;
};

/* Handles the get for question 1 page 1 */
exports.question1Page1 = async function (req, res, next) {
  console.log(req.session.data);
  console.log(
    "Q1 controller Pg1 GET:" + req.session.data["notificationReference"]
  );

  res.render("mandatory/question1-1", { data: req.session.data });
};

exports.question1Page1Post = async function (req, res, next) {
  const { q1iAcquirerOrRepresentative } = req.session.data;

  console.log(
    "Q1 controller P1 POST:" + req.session.data["notificationReference"]
  );

  // perform the field validation
  var validationOutput = validator.validateQuestion1Page1(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question1-1", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  webHelper.sessionRedirect(
    next,
    res,
    req,
    q1iAcquirerOrRepresentative === "acquirer"
      ? "/mandatory/question1/question1-2"
      : "/mandatory/question1/question1-3"
  );
};

exports.question1Page2 = async function (req, res, next) {
  res.render("mandatory/question1-2", { data: req.session.data });
};

exports.question1Page2Post = async function (req, res, next) {
  // perform the field validation
  var validationOutput = validator.validateQuestion1Page2(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question1-2", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  // Populate the session with the authorised contact in case of acquirer
  if (req.session.data.q1iiAuthorised === "Yes") {
    req.session.data["authorisedContactEmail"] =
      req.session.data.q1iiAcquirerEmail;
    req.session.data["authorisedContactName"] =
      req.session.data.q1iiAcquirerIndividual;
  } else {
    req.session.data["authorisedContactEmail"] =
      req.session.data.q1iiAuthorisedEmail;
    req.session.data["authorisedContactName"] =
      req.session.data.q1iiAuthorisedName;
  }

  // Re-direct to the appropriate screen based on the list
  if (
    req.session.data["q1ivaAdditionalAcquirerList"] == null ||
    req.session.data["q1ivaAdditionalAcquirerList"].length == 0
  ) {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question1/question1-4"
    );
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question1/question1-4b"
    );
  }
};

exports.question1Page3 = async function (req, res, next) {
  res.render("mandatory/question1-3", { data: req.session.data });
};

exports.question1Page3Post = async function (req, res, next) {
  // perform the field validation
  var validationOutput = validator.validateQuestion1Page3(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question1-3", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  // Populate the session with the authorised contact in case of representative
  req.session.data["authorisedContactEmail"] =
    req.session.data.q1iiiRepresentativeEmail;
  req.session.data["authorisedContactName"] =
    req.session.data.q1iiiAuthorisedIndividual;

  // Re-direct to the appropriate screen based on the list
  if (
    req.session.data["q1ivaAdditionalAcquirerList"] == null ||
    req.session.data["q1ivaAdditionalAcquirerList"].length == 0
  ) {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question1/question1-4"
    );
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question1/question1-4b"
    );
  }
};

exports.question1Page4 = async function (req, res, next) {
  // Re-direct to the appropriate screen based on the list
  if (
    req.session.data["q1ivaAdditionalAcquirerList"] == null ||
    req.session.data["q1ivaAdditionalAcquirerList"].length == 0
  ) {
    res.render("mandatory/question1-4");
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question1/question1-4b"
    );
  }
};

exports.question1Page4Post = async function (req, res, next) {
  const { q1ivAdditionalAcquirer } = req.session.data;
  console.log(
    "Q1 controller Pg4 POST:" + req.session.data["notificationReference"]
  );

  if (
    req.session.data["notificationReference"] === "" ||
    req.session.data["notificationReference"] === null ||
    typeof req.session.data["notificationReference"] === "undefined"
  ) {
    console.log("Q1 controller: Session is NULL");
  }

  // perform the field validation
  var validationOutput = validator.validateQuestion1Page4(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question1-4", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (q1ivAdditionalAcquirer === "Yes") {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question1/question1-4a"
    );
  } else {
    webHelper.sessionRedirect(next, res, req, "/mandatory/task-list");
  }
};

exports.question1Page4a = async function (req, res, next) {
  res.render("mandatory/question1-4a");
};

exports.question1Page4aPost = async function (req, res, next) {
  // perform the field validation
  var validationOutput = validator.validateQuestion1Page4a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question1-4a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  addItem({
    req,
    listKey: "q1ivaAdditionalAcquirerList",
    fields: [
      "q1ivaMultinotifiername",
      "q1ivaMultinotifierindividualname",
      "q1ivaMultinotifierRepresentative",
      "q1ivaMultinotifierPercentage",
      "q1ivaMultinotifierAddress",
      "q1ivaMultinotifierPhone",
      "q1ivaMultinotifierEmail",
    ],
    editingItemId: "q1ivaEditingData",
    id: "q1ivaId",
  });

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/mandatory/question1/question1-4b"
  );
};

exports.question1Page4b = async function (req, res, next) {
  console.log(req.session.data);
  res.render("mandatory/question1-4b", { data: req.session.data });
};

exports.question1Page4bRem = async function (req, res, next) {
  const itemRef = getItemRef(
    req,
    "q1ivaAdditionalAcquirerList",
    "q1ivaMultinotifiername"
  );

  res.render("mandatory/question1-4conf", {
    removeItemId: req.params.id,
    itemRef,
  });
};

exports.question1Page4ConfPost = async function (req, res, next) {
  webHelper.removeItem(
    req,
    "q1ivaAdditionalAcquirerList",
    "q1ivconfRemove",
    "q1ivconfRemoveId"
  );

  webHelper.sessionRedirect(next, res, req, "/mandatory/question1/question1-4");
};

exports.question1Page4bcya = async function (req, res, next) {
  const data = getItem(
    req,
    "q1ivaAdditionalAcquirerList",
    [
      "q1ivaMultinotifiername",
      "q1ivaMultinotifierindividualname",
      "q1ivaMultinotifierRepresentative",
      "q1ivaMultinotifierPercentage",
      "q1ivaMultinotifierAddress",
      "q1ivaMultinotifierPhone",
      "q1ivaMultinotifierEmail",
    ],
    "q1ivaId"
  );

  res.render("mandatory/question1-4a", { data, isEditing: true });
};

exports.question1Page4bPost = async function (req, res, next) {
  const { q1ivbAddAnother } = req.session.data;

  if (q1ivbAddAnother === "Yes") {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question1/question1-4a"
    );
  } else {
    webHelper.sessionRedirect(next, res, req, "/mandatory/task-list");
  }
};
