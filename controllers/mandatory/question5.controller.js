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

exports.question5Page1 = async function (req, res, next) {
  res.render("mandatory/question5-1", { data: req.session.data });
};

exports.question5Page1Post = async function (req, res, next) {
  // perform the field validation
  var validationOutput = validator.validateQuestion5Page1(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question5-1", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  webHelper.sessionRedirect(next, res, req, "/mandatory/question5/question5-2");
};

exports.question5Page2 = async function (req, res, next) {
  if (
    req.session.data["q5iiaClassificationListItems"] == null ||
    req.session.data["q5iiaClassificationListItems"].length == 0
  ) {
    res.render("mandatory/question5-2", { data: req.session.data });
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question5/question5-2b"
    );
  }
};

exports.question5Page2Post = async function (req, res, next) {
  const { q5iiIsAuthorised } = req.session.data;

  // perform the field validation
  var validationOutput = validator.validateQuestion5Page2(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question5-2", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (q5iiIsAuthorised === "Yes") {
    if (
      req.session.data["q5iiaClassificationListItems"] == null ||
      req.session.data["q5iiaClassificationListItems"].length == 0
    ) {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/mandatory/question5/question5-2a"
      );
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/mandatory/question5/question5-2b"
      );
    }
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question5/question5-3"
    );
  }
};

exports.question5Page2A = async function (req, res, next) {
  res.render("mandatory/question5-2a", { data: req.session.data });
};

exports.question5Page2APost = async function (req, res, next) {
  // perform the field validation
  var validationOutput = validator.validateQuestion5Page2a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question5-2a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  addItem({
    req,
    listKey: "q5iiaClassificationListItems",
    fields: [
      "q5iiaHighestClassification",
      "q5iiaDepartment",
      "q5iiaOther",
      "q5iiaDescription",
      "q5iiaAdditionalInfo",
    ],
    editingItemId: "q5iiaEditingData",
    id: "q5iiaId",
  });

  webHelper.sessionRedirect(next, res, req, "question5-2b");
};

exports.question5Page2B = async function (req, res, next) {
  res.render("mandatory/question5-2b", { data: req.session.data });
};

exports.question5Page2BPost = async function (req, res, next) {
  const { q5iibAddAnother } = req.session.data;

  webHelper.sessionRedirect(
    next,
    res,
    req,
    q5iibAddAnother === "Yes"
      ? "/mandatory/question5/question5-2a"
      : "/mandatory/question5/question5-3"
  );
};

exports.question5Page2BRem = async function (req, res, next) {
  const itemRef = getItemRef(
    req,
    "q5iiaClassificationListItems",
    "q5iiaDepartment"
  );

  res.render("mandatory/question5-2conf", {
    removeItemId: req.params.id,
    itemRef,
  });
};

exports.question5Page2Bcya = async function (req, res, next) {
  const data = getItem(
    req,
    "q5iiaClassificationListItems",
    [
      "q5iiaHighestClassification",
      "q5iiaDepartment",
      "q5iiaOther",
      "q5iiaDescription",
      "q5iiaAdditionalInfo",
    ],
    "q5iiaId"
  );

  res.render("mandatory/question5-2a", { data, isEditing: true });
};

exports.question5Page2ConfPost = async function (req, res, next) {
  webHelper.removeItem(
    req,
    "q5iiaClassificationListItems",
    "q5iiconfRemove",
    "q5iiconfRemoveId"
  );
  webHelper.sessionRedirect(next, res, req, "/mandatory/question5/question5-2");
};

exports.question5Page3 = async function (req, res, next) {
  if (
    req.session.data["q5iiiaLicenceListItems"] == null ||
    req.session.data["q5iiiaLicenceListItems"].length == 0
  ) {
    res.render("mandatory/question5-3", { data: req.session.data });
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question5/question5-3b"
    );
  }
};

exports.question5Page3Post = async function (req, res, next) {
  const { q5iiiIsLicenseRequired } = req.session.data;

  // perform the field validation
  var validationOutput = validator.validateQuestion5Page3(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question5-3", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (q5iiiIsLicenseRequired === "Yes") {
    if (
      req.session.data["q5iiiaLicenceListItems"] == null ||
      req.session.data["q5iiiaLicenceListItems"].length == 0
    ) {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/mandatory/question5/question5-3a"
      );
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/mandatory/question5/question5-3b"
      );
    }
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question5/question5-4"
    );
  }
};

exports.question5Page3A = async function (req, res, next) {
  res.render("mandatory/question5-3a", { data: req.session.data });
};

exports.question5Page3APost = async function (req, res, next) {
  // perform the field validation
  var validationOutput = validator.validateQuestion5Page3a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question5-3a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  addItem({
    req,
    listKey: "q5iiiaLicenceListItems",
    fields: [
      "q5iiiaLicence",
      "q5iiiaIssuer",
      "q5iiiaIssueDateDay",
      "q5iiiaIssueDateMonth",
      "q5iiiaIssueDateYear",
    ],
    editingItemId: "q5iiiaEditingData",
    id: "q5iiiaId",
  });

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/mandatory/question5/question5-3b"
  );
};

exports.question5Page3B = async function (req, res, next) {
  res.render("mandatory/question5-3b", { data: req.session.data });
};

exports.question5Page3BPost = async function (req, res, next) {
  const { q5iiibAddAnother } = req.session.data;

  webHelper.sessionRedirect(
    next,
    res,
    req,
    q5iiibAddAnother === "Yes"
      ? "/mandatory/question5/question5-3a"
      : "/mandatory/question5/question5-4"
  );
};

exports.question5Page3BRem = async function (req, res, next) {
  const itemRef = getItemRef(req, "q5iiiaLicenceListItems", "q5iiiaLicence");

  res.render("mandatory/question5-3conf", {
    removeItemId: req.params.id,
    itemRef,
  });
};

exports.question5Page3Bcya = async function (req, res, next) {
  const data = getItem(
    req,
    "q5iiiaLicenceListItems",
    [
      "q5iiiaLicence",
      "q5iiiaIssuer",
      "q5iiiaIssueDateDay",
      "q5iiiaIssueDateMonth",
      "q5iiiaIssueDateYear",
    ],
    "q5iiiaId"
  );

  res.render("mandatory/question5-3a", { data, isEditing: true });
};

exports.question5Page3ConfPost = async function (req, res, next) {
  webHelper.removeItem(
    req,
    "q5iiiaLicenceListItems",
    "q5iiiconfRemove",
    "q5iiiconfRemoveId"
  );

  webHelper.sessionRedirect(next, res, req, "/mandatory/question5/question5-3");
};

exports.question5Page4 = async function (req, res, next) {
  if (
    req.session.data["q5ivaDualUseListItems"] == null ||
    req.session.data["q5ivaDualUseListItems"].length == 0
  ) {
    res.render("mandatory/question5-4", { data: req.session.data });
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question5/question5-4b"
    );
  }
};

exports.question5Page4Post = async function (req, res, next) {
  const { q5ivIsDualUse } = req.session.data;

  // perform the field validation
  var validationOutput = validator.validateQuestion5Page4(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question5-4", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (q5ivIsDualUse === "Yes") {
    if (
      req.session.data["q5ivaDualUseListItems"] == null ||
      req.session.data["q5ivaDualUseListItems"].length == 0
    ) {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/mandatory/question5/question5-4a"
      );
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/mandatory/question5/question5-4b"
      );
    }
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question5/question5-5"
    );
  }
};

exports.question5Page4A = async function (req, res, next) {
  res.render("mandatory/question5-4a", { data: req.session.data });
};

exports.question5Page4APost = async function (req, res, next) {
  // perform the field validation
  var validationOutput = validator.validateQuestion5Page4a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question5-4a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  addItem({
    req,
    listKey: "q5ivaDualUseListItems",
    fields: ["q5ivaItemName", "q5ivaDescription"],
    editingItemId: "q5ivaEditingData",
    id: "q5ivaId",
  });

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/mandatory/question5/question5-4b"
  );
};

exports.question5Page4B = async function (req, res, next) {
  res.render("mandatory/question5-4b", { data: req.session.data });
};

exports.question5Page4BPost = async function (req, res, next) {
  const { q5ivbAddAnother } = req.session.data;

  webHelper.sessionRedirect(
    next,
    res,
    req,
    q5ivbAddAnother === "Yes"
      ? "/mandatory/question5/question5-4a"
      : "/mandatory/question5/question5-5"
  );
};

exports.question5Page4BRem = async function (req, res, next) {
  const itemRef = getItemRef(req, "q5ivaDualUseListItems", "q5ivaItemName");

  res.render("mandatory/question5-4conf", {
    removeItemId: req.params.id,
    itemRef,
  });
};

exports.question5Page4Bcya = async function (req, res, next) {
  const data = getItem(
    req,
    "q5ivaDualUseListItems",
    ["q5ivaItemName", "q5ivaDescription"],
    "q5ivaId"
  );

  res.render("mandatory/question5-4a", { data, isEditing: true });
};

exports.question5Page4ConfPost = async function (req, res, next) {
  webHelper.removeItem(
    req,
    "q5ivaDualUseListItems",
    "q5ivconfRemove",
    "q5ivconfRemoveId"
  );

  webHelper.sessionRedirect(next, res, req, "/mandatory/question5/question5-4");
};

exports.question5Page5 = async function (req, res, next) {
  if (
    req.session.data["q5vaPartyToListItems"] == null ||
    req.session.data["q5vaPartyToListItems"].length == 0
  ) {
    res.render("mandatory/question5-5", { data: req.session.data });
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question5/question5-5b"
    );
  }
};

exports.question5Page5Post = async function (req, res, next) {
  const { q5vIsPartyTo } = req.session.data;

  // perform the field validation
  var validationOutput = validator.validateQuestion5Page5(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question5-5", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (q5vIsPartyTo === "Yes") {
    if (
      req.session.data["q5vaPartyToListItems"] == null ||
      req.session.data["q5vaPartyToListItems"].length == 0
    ) {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/mandatory/question5/question5-5a"
      );
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/mandatory/question5/question5-5b"
      );
    }
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question5/question5-6"
    );
  }
};

exports.question5Page5A = async function (req, res, next) {
  res.render("mandatory/question5-5a", { data: req.session.data });
};

exports.question5Page5APost = async function (req, res, next) {
  // perform the field validation
  var validationOutput = validator.validateQuestion5Page5a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question5-5a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  addItem({
    req,
    listKey: "q5vaPartyToListItems",
    fields: ["q5vaSupplyRelationship", "q5vaArea", "q5vaDepartment"],
    editingItemId: "q5vaEditingData",
    id: "q5vaId",
  });

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/mandatory/question5/question5-5b"
  );
};

exports.question5Page5B = async function (req, res, next) {
  res.render("mandatory/question5-5b", { data: req.session.data });
};

exports.question5Page5BPost = async function (req, res, next) {
  const { q5vbAddAnother } = req.session.data;

  webHelper.sessionRedirect(
    next,
    res,
    req,
    q5vbAddAnother === "Yes"
      ? "/mandatory/question5/question5-5a"
      : "/mandatory/question5/question5-6"
  );
};

exports.question5Page5BRem = async function (req, res, next) {
  const itemRef = getItemRef(req, "q5vaPartyToListItems", "q5vaArea");

  res.render("mandatory/question5-5conf", {
    removeItemId: req.params.id,
    itemRef,
  });
};

exports.question5Page5Bcya = async function (req, res, next) {
  const data = getItem(
    req,
    "q5vaPartyToListItems",
    ["q5vaSupplyRelationship", "q5vaArea", "q5vaDepartment"],
    "q5vaId"
  );

  res.render("mandatory/question5-5a", { data, isEditing: true });
};

exports.question5Page5ConfPost = async function (req, res, next) {
  webHelper.removeItem(
    req,
    "q5vaPartyToListItems",
    "q5vconfRemove",
    "q5vconfRemoveId"
  );

  webHelper.sessionRedirect(next, res, req, "/mandatory/question5/question5-5");
};

exports.question5Page6 = async function (req, res, next) {
  if (
    req.session.data["q5viaFundedResearchListItems"] == null ||
    req.session.data["q5viaFundedResearchListItems"].length == 0
  ) {
    res.render("mandatory/question5-6", { data: req.session.data });
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question5/question5-6b"
    );
  }
};

exports.question5Page6Post = async function (req, res, next) {
  const { q5viIsFundedResearch } = req.session.data;

  // perform the field validation
  var validationOutput = validator.validateQuestion5Page6(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question5-6", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (q5viIsFundedResearch === "Yes") {
    if (
      req.session.data["q5viaFundedResearchListItems"] == null ||
      req.session.data["q5viaFundedResearchListItems"].length == 0
    ) {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/mandatory/question5/question5-6a"
      );
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/mandatory/question5/question5-6b"
      );
    }
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question5/question5-7"
    );
  }
};

exports.question5Page6A = async function (req, res, next) {
  res.render("mandatory/question5-6a", { data: req.session.data });
};

exports.question5Page6APost = async function (req, res, next) {
  // perform the field validation
  var validationOutput = validator.validateQuestion5Page6a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question5-6a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  addItem({
    req,
    listKey: "q5viaFundedResearchListItems",
    fields: ["q5viaName", "q5viaArea", "q5viaDescription", "q5viaDepartment"],
    editingItemId: "q5viaEditingData",
    id: "q5viaId",
  });

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/mandatory/question5/question5-6b"
  );
};

exports.question5Page6B = async function (req, res, next) {
  res.render("mandatory/question5-6b", { data: req.session.data });
};

exports.question5Page6BPost = async function (req, res, next) {
  const { q5vibAddAnother } = req.session.data;

  webHelper.sessionRedirect(
    next,
    res,
    req,
    q5vibAddAnother === "Yes"
      ? "/mandatory/question5/question5-6a"
      : "/mandatory/question5/question5-7"
  );
};

exports.question5Page6BRem = async function (req, res, next) {
  const itemRef = getItemRef(req, "q5viaFundedResearchListItems", "q5viaName");

  res.render("mandatory/question5-6conf", {
    removeItemId: req.params.id,
    itemRef,
  });
};

exports.question5Page6Bcya = async function (req, res, next) {
  const data = getItem(
    req,
    "q5viaFundedResearchListItems",
    ["q5viaName", "q5viaArea", "q5viaDescription", "q5viaDepartment"],
    "q5viaId"
  );

  res.render("mandatory/question5-6a", { data, isEditing: true });
};

exports.question5Page6ConfPost = async function (req, res, next) {
  webHelper.removeItem(
    req,
    "q5viaFundedResearchListItems",
    "q5viconfRemove",
    "q5viconfRemoveId"
  );

  webHelper.sessionRedirect(next, res, req, "/mandatory/question5/question5-6");
};

exports.question5Page7 = async function (req, res, next) {
  if (
    req.session.data["q5viiaNSVSCListItems"] == null ||
    req.session.data["q5viiaNSVSCListItems"].length == 0
  ) {
    res.render("mandatory/question5-7", { data: req.session.data });
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/mandatory/question5/question5-7b"
    );
  }
};

exports.question5Page7Post = async function (req, res, next) {
  const { q5viiIsNSVSC } = req.session.data;

  // perform the field validation
  var validationOutput = validator.validateQuestion5Page7(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question5-7", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  webHelper.sessionRedirect(
    next,
    res,
    req,
    q5viiIsNSVSC === "Yes"
      ? "/mandatory/question5/question5-7a"
      : "/mandatory/task-list"
  );
};

exports.question5Page7A = async function (req, res, next) {
  res.render("mandatory/question5-7a", { data: req.session.data });
};

exports.question5Page7APost = async function (req, res, next) {
  // perform the field validation
  var validationOutput = validator.validateQuestion5Page7a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("mandatory/question5-7a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  addItem({
    req,
    listKey: "q5viiaNSVSCListItems",
    fields: ["q5viiaLevel", "q5viiaHowMany"],
    editingItemId: "q5viiaEditingData",
    id: "q5viiaId",
  });

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/mandatory/question5/question5-7b"
  );
};

exports.question5Page7B = async function (req, res, next) {
  res.render("mandatory/question5-7b", { data: req.session.data });
};

exports.question5Page7BPost = async function (req, res, next) {
  const { q5viibAddAnother } = req.session.data;

  webHelper.sessionRedirect(
    next,
    res,
    req,
    q5viibAddAnother === "Yes"
      ? "/mandatory/question5/question5-7a"
      : "/mandatory/task-list"
  );
};

exports.question5Page7BRem = async function (req, res, next) {
  const itemRef = getItemRef(req, "q5viiaNSVSCListItems", "q5viiaLevel");

  res.render("mandatory/question5-7conf", {
    removeItemId: req.params.id,
    itemRef,
  });
};

exports.question5Page7Bcya = async function (req, res, next) {
  const data = getItem(
    req,
    "q5viiaNSVSCListItems",
    ["q5viiaLevel", "q5viiaHowMany"],
    "q5viiaId"
  );

  res.render("mandatory/question5-7a", { data, isEditing: true });
};

exports.question5Page7ConfPost = async function (req, res, next) {
  webHelper.removeItem(
    req,
    "q5viiaNSVSCListItems",
    "q5viiconfRemove",
    "q5viiconfRemoveId"
  );

  webHelper.sessionRedirect(next, res, req, "/mandatory/question5/question5-7");
};
