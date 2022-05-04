var uuid = require("uuid");
var webHelper = require("../../localmodules/webHelpers");
var validator = require("../../localmodules/voluntaryvalidator");

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

const removeItem = (req, listKey, removeId) => {
  let recordIndex = null;

  console.log(removeId);
  console.log(req.session.data[removeId]);

  if (req.session.data[removeId] === "Yes") {
    for (var i = 0; i < req.session.data[listKey].length; i++) {
      if (req.session.data[listKey][i].id === req.params.id) {
        recordIndex = i;

        // got the record so jump out
        break;
      }
    }

    req.session.data[listKey].splice(recordIndex, 1);
  }

  req.session.data[removeId] = "";
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
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  res.render(isAlt ? "voluntary/question5alt-1" : "voluntary/question5-1", {
    data: req.session.data,
  });
};

exports.question5Page1Post = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  // perform the field validation
  var validationOutput = isAlt
    ? validator.validateQuestion5Page1Alt(req.session.data)
    : validator.validateQuestion5Page1(req.session.data);
  if (validationOutput.isValid === false) {
    res.render(isAlt ? "voluntary/question5alt-1" : "voluntary/question5-1", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (isAlt) {
    if (
      req.session.data["q5altiiaClassificationListItems"] == null ||
      req.session.data["q5altiiaClassificationListItems"].length == 0
    ) {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-2"
      );
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-2b"
      );
    }
  } else {
    if (
      req.session.data["q5iiaClassificationListItems"] == null ||
      req.session.data["q5iiaClassificationListItems"].length == 0
    ) {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-2"
      );
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-2b"
      );
    }
  }
};

exports.question5Page2 = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  if (isAlt) {
    if (
      req.session.data["q5altiiaClassificationListItems"] == null ||
      req.session.data["q5altiiaClassificationListItems"].length == 0
    ) {
      res.render("voluntary/question5alt-2", {
        data: req.session.data,
      });
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-2b"
      );
    }
  } else {
    if (
      req.session.data["q5iiaClassificationListItems"] == null ||
      req.session.data["q5iiaClassificationListItems"].length == 0
    ) {
      res.render("voluntary/question5-2", {
        data: req.session.data,
      });
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-2b"
      );
    }
  }
};

exports.question5Page2Post = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  const { q5iiIsAuthorised, q5altiiIsAuthorised } = req.session.data;

  // perform the field validation
  var validationOutput = isAlt
    ? validator.validateQuestion5Page2Alt(req.session.data)
    : validator.validateQuestion5Page2(req.session.data);
  if (validationOutput.isValid === false) {
    res.render(isAlt ? "voluntary/question5alt-2" : "voluntary/question5-2", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (isAlt) {
    // Qualifying asset flow
    if (q5altiiIsAuthorised === "Yes") {
      if (
        req.session.data["q5altiiaClassificationListItems"] == null ||
        req.session.data["q5altiiaClassificationListItems"].length == 0
      ) {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-2a"
        );
      } else {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-2b"
        );
      }
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-3"
      );
    }
  } else {
    // Qualifying entity flow
    if (q5iiIsAuthorised === "Yes") {
      if (
        req.session.data["q5iiaClassificationListItems"] == null ||
        req.session.data["q5iiaClassificationListItems"].length == 0
      ) {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-2a"
        );
      } else {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-2b"
        );
      }
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-3"
      );
    }
  }
};

exports.question5Page2A = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  res.render(isAlt ? "voluntary/question5alt-2a" : "voluntary/question5-2a", {
    data: req.session.data,
  });
};

exports.question5Page2APost = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  // perform the field validation
  var validationOutput = isAlt
    ? validator.validateQuestion5Page2aAlt(req.session.data)
    : validator.validateQuestion5Page2a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render(isAlt ? "voluntary/question5alt-2a" : "voluntary/question5-2a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (isAlt) {
    addItem({
      req,
      listKey: "q5altiiaClassificationListItems",
      fields: [
        "q5altiiaHighestClassification",
        "q5altiiaDepartment",
        "q5altiiaOther",
        "q5altiiaDescription",
        "q5altiiaAdditionalInfo",
      ],
      editingItemId: "q5altiiaEditingData",
      id: "q5altiiaId",
    });
  } else {
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
  }

  webHelper.sessionRedirect(next, res, req, "question5-2b");
};

exports.question5Page2B = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  res.render(isAlt ? "voluntary/question5alt-2b" : "voluntary/question5-2b", {
    data: req.session.data,
  });
};

exports.question5Page2BPost = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  const { q5iibAddAnother, q5altiibAddAnother } = req.session.data;

  if (isAlt) {
    // Qualifying asset flow
    webHelper.sessionRedirect(
      next,
      res,
      req,
      q5altiibAddAnother === "Yes"
        ? "/voluntary/question5/question5-2a"
        : "/voluntary/question5/question5-3"
    );
  } else {
    // Qualifying entity flow
    webHelper.sessionRedirect(
      next,
      res,
      req,
      q5iibAddAnother === "Yes"
        ? "/voluntary/question5/question5-2a"
        : "/voluntary/question5/question5-3"
    );
  }
};

exports.question5Page2BRem = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  let itemRef = {};

  if (isAlt) {
    itemRef = getItemRef(
      req,
      "q5altiiaClassificationListItems",
      "q5altiiaDepartment"
    );
  } else {
    itemRef = getItemRef(
      req,
      "q5iiaClassificationListItems",
      "q5iiaDepartment"
    );
  }

  res.render(
    isAlt ? "voluntary/question5alt-2conf" : "voluntary/question5-2conf",
    {
      removeItemId: req.params.id,
      itemRef,
    }
  );
};

exports.question5Page2Bcya = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  let data = {};

  if (isAlt) {
    data = getItem(
      req,
      "q5altiiaClassificationListItems",
      [
        "q5altiiaHighestClassification",
        "q5altiiaDepartment",
        "q5altiiaOther",
        "q5altiiaDescription",
        "q5altiiaAdditionalInfo",
      ],
      "q5altiiaId"
    );
  } else {
    data = getItem(
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
  }

  res.render(isAlt ? "voluntary/question5alt-2a" : "voluntary/question5-2a", {
    data,
    isEditing: true,
  });
};

exports.question5Page2ConfPost = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  if (isAlt) {
    console.log(req.session.data);
    webHelper.removeItem(
      req,
      "q5altiiaClassificationListItems",
      "q5altiiconfRemove",
      "q5altiiconfRemoveId"
    );
  } else {
    webHelper.removeItem(
      req,
      "q5iiaClassificationListItems",
      "q5iiconfRemove",
      "q5iiconfRemoveId"
    );
  }

  webHelper.sessionRedirect(next, res, req, "/voluntary/question5/question5-2");
};

exports.question5Page3 = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  if (isAlt) {
    if (
      req.session.data["q5altiiiaLicenceListItems"] == null ||
      req.session.data["q5altiiiaLicenceListItems"].length == 0
    ) {
      res.render("voluntary/question5alt-3", {
        data: req.session.data,
      });
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-3b"
      );
    }
  } else {
    if (
      req.session.data["q5iiiaLicenceListItems"] == null ||
      req.session.data["q5iiiaLicenceListItems"].length == 0
    ) {
      res.render("voluntary/question5-3", {
        data: req.session.data,
      });
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-3b"
      );
    }
  }
};

exports.question5Page3Post = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  const { q5iiiIsLicenseRequired, q5altiiiIsLicenseRequired } =
    req.session.data;

  // perform the field validation
  var validationOutput = isAlt
    ? validator.validateQuestion5Page3Alt(req.session.data)
    : validator.validateQuestion5Page3(req.session.data);
  if (validationOutput.isValid === false) {
    res.render(isAlt ? "voluntary/question5alt-3" : "voluntary/question5-3", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (isAlt) {
    // Qualifying asset flow
    if (q5altiiiIsLicenseRequired === "Yes") {
      if (
        req.session.data["q5altiiiaLicenceListItems"] == null ||
        req.session.data["q5altiiiaLicenceListItems"].length == 0
      ) {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-3a"
        );
      } else {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-3b"
        );
      }
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-4"
      );
    }
  } else {
    // Qualifying entity flow
    if (q5iiiIsLicenseRequired === "Yes") {
      if (
        req.session.data["q5iiiaLicenceListItems"] == null ||
        req.session.data["q5iiiaLicenceListItems"].length == 0
      ) {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-3a"
        );
      } else {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-3b"
        );
      }
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-4"
      );
    }
  }
};

exports.question5Page3A = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  res.render(isAlt ? "voluntary/question5alt-3a" : "voluntary/question5-3a", {
    data: req.session.data,
  });
};

exports.question5Page3APost = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  // perform the field validation
  var validationOutput = isAlt
    ? validator.validateQuestion5Page3aAlt(req.session.data)
    : validator.validateQuestion5Page3a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render(isAlt ? "voluntary/question5alt-3a" : "voluntary/question5-3a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (isAlt) {
    addItem({
      req,
      listKey: "q5altiiiaLicenceListItems",
      fields: [
        "q5altiiiaLicence",
        "q5altiiiaIssuer",
        "q5altiiiaIssueDateDay",
        "q5altiiiaIssueDateMonth",
        "q5altiiiaIssueDateYear",
      ],
      editingItemId: "q5altiiiaEditingData",
      id: "q5altiiiaId",
    });
  } else {
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
  }

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/voluntary/question5/question5-3b"
  );
};

exports.question5Page3B = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  res.render(isAlt ? "voluntary/question5alt-3b" : "voluntary/question5-3b", {
    data: req.session.data,
  });
};

exports.question5Page3BPost = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  const { q5iiibAddAnother, q5altiiibAddAnother } = req.session.data;

  if (isAlt) {
    // Qualifying asset flow
    webHelper.sessionRedirect(
      next,
      res,
      req,
      q5altiiibAddAnother === "Yes"
        ? "/voluntary/question5/question5-3a"
        : "/voluntary/question5/question5-4"
    );
  } else {
    // Qualifying entity flow
    webHelper.sessionRedirect(
      next,
      res,
      req,
      q5iiibAddAnother === "Yes"
        ? "/voluntary/question5/question5-3a"
        : "/voluntary/question5/question5-4"
    );
  }
};

exports.question5Page3BRem = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  let itemRef = {};

  if (isAlt) {
    itemRef = getItemRef(req, "q5altiiiaLicenceListItems", "q5altiiiaLicence");
  } else {
    itemRef = getItemRef(req, "q5iiiaLicenceListItems", "q5iiiaLicence");
  }

  res.render(
    isAlt ? "voluntary/question5alt-3conf" : "voluntary/question5-3conf",
    {
      removeItemId: req.params.id,
      itemRef,
    }
  );
};

exports.question5Page3Bcya = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  let data = {};

  if (isAlt) {
    data = getItem(
      req,
      "q5altiiiaLicenceListItems",
      [
        "q5altiiiaLicence",
        "q5altiiiaIssuer",
        "q5altiiiaIssueDateDay",
        "q5altiiiaIssueDateMonth",
        "q5altiiiaIssueDateYear",
      ],
      "q5altiiiaId"
    );
  } else {
    data = getItem(
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
  }

  res.render(isAlt ? "voluntary/question5alt-3a" : "voluntary/question5-3a", {
    data,
    isEditing: true,
  });
};

exports.question5Page3ConfPost = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  if (isAlt) {
    webHelper.removeItem(
      req,
      "q5altiiiaLicenceListItems",
      "q5altiiiconfRemove",
      "q5altiiiconfRemoveId"
    );
  } else {
    webHelper.removeItem(
      req,
      "q5iiiaLicenceListItems",
      "q5iiiconfRemove",
      "q5iiiconfRemoveId"
    );
  }

  webHelper.sessionRedirect(next, res, req, "/voluntary/question5/question5-3");
};

exports.question5Page4 = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  if (isAlt) {
    if (
      req.session.data["q5altivaDualUseListItems"] == null ||
      req.session.data["q5altivaDualUseListItems"].length == 0
    ) {
      res.render("voluntary/question5alt-4", {
        data: req.session.data,
      });
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-4b"
      );
    }
  } else {
    if (
      req.session.data["q5ivaDualUseListItems"] == null ||
      req.session.data["q5ivaDualUseListItems"].length == 0
    ) {
      res.render("voluntary/question5-4", {
        data: req.session.data,
      });
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-4b"
      );
    }
  }
};

exports.question5Page4Post = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  const { q5ivIsDualUse, q5altivIsDualUse } = req.session.data;

  // perform the field validation
  var validationOutput = isAlt
    ? validator.validateQuestion5Page4Alt(req.session.data)
    : validator.validateQuestion5Page4(req.session.data);
  if (validationOutput.isValid === false) {
    res.render(isAlt ? "voluntary/question5alt-4" : "voluntary/question5-4", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (isAlt) {
    // Qualifying asset flow
    if (q5altivIsDualUse === "Yes") {
      if (
        req.session.data["q5altivaDualUseListItems"] == null ||
        req.session.data["q5altivaDualUseListItems"].length == 0
      ) {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-4a"
        );
      } else {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-4b"
        );
      }
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-5"
      );
    }
  } else {
    // Qualifying entity flow
    if (q5ivIsDualUse === "Yes") {
      if (
        req.session.data["q5ivaDualUseListItems"] == null ||
        req.session.data["q5ivaDualUseListItems"].length == 0
      ) {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-4a"
        );
      } else {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-4b"
        );
      }
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-5"
      );
    }
  }
};

exports.question5Page4A = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  res.render(isAlt ? "voluntary/question5alt-4a" : "voluntary/question5-4a", {
    data: req.session.data,
  });
};

exports.question5Page4APost = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  // perform the field validation
  var validationOutput = isAlt
    ? validator.validateQuestion5Page4aAlt(req.session.data)
    : validator.validateQuestion5Page4a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render(isAlt ? "voluntary/question5alt-4a" : "voluntary/question5-4a", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (isAlt) {
    addItem({
      req,
      listKey: "q5altivaDualUseListItems",
      fields: ["q5altivaItemName", "q5altivaDescription"],
      editingItemId: "q5altivaEditingData",
      id: "q5altivaId",
    });
  } else {
    addItem({
      req,
      listKey: "q5ivaDualUseListItems",
      fields: ["q5ivaItemName", "q5ivaDescription"],
      editingItemId: "q5ivaEditingData",
      id: "q5ivaId",
    });
  }

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/voluntary/question5/question5-4b"
  );
};

exports.question5Page4B = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  res.render(isAlt ? "voluntary/question5alt-4b" : "voluntary/question5-4b", {
    data: req.session.data,
  });
};

exports.question5Page4BPost = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  const { q5ivbAddAnother, q5altivbAddAnother } = req.session.data;

  if (isAlt) {
    // Qualifying asset flow
    webHelper.sessionRedirect(
      next,
      res,
      req,
      q5altivbAddAnother === "Yes"
        ? "/voluntary/question5/question5-4a"
        : "/voluntary/question5/question5-5"
    );
  } else {
    // Qualifying entity flow
    webHelper.sessionRedirect(
      next,
      res,
      req,
      q5ivbAddAnother === "Yes"
        ? "/voluntary/question5/question5-4a"
        : "/voluntary/question5/question5-5"
    );
  }
};

exports.question5Page4BRem = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  let itemRef = {};

  if (isAlt) {
    itemRef = getItemRef(req, "q5altivaDualUseListItems", "q5altivaItemName");
  } else {
    itemRef = getItemRef(req, "q5ivaDualUseListItems", "q5ivaItemName");
  }

  res.render(
    isAlt ? "voluntary/question5alt-4conf" : "voluntary/question5-4conf",
    {
      removeItemId: req.params.id,
      itemRef,
    }
  );
};

exports.question5Page4Bcya = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  let data = {};

  if (isAlt) {
    data = getItem(
      req,
      "q5altivaDualUseListItems",
      ["q5altivaItemName", "q5altivaDescription"],
      "q5altivaId"
    );
  } else {
    data = getItem(
      req,
      "q5ivaDualUseListItems",
      ["q5ivaItemName", "q5ivaDescription"],
      "q5ivaId"
    );
  }

  res.render(isAlt ? "voluntary/question5alt-4a" : "voluntary/question5-4a", {
    data,
    isEditing: true,
  });
};

exports.question5Page4ConfPost = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  if (isAlt) {
    webHelper.removeItem(
      req,
      "q5altivaDualUseListItems",
      "q5altivconfRemove",
      "q5altivconfRemoveId"
    );
  } else {
    webHelper.removeItem(
      req,
      "q5ivaDualUseListItems",
      "q5ivconfRemove",
      "q5ivconfRemoveId"
    );
  }

  webHelper.sessionRedirect(next, res, req, "/voluntary/question5/question5-4");
};

exports.question5Page5 = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  if (isAlt) {
    res.render("voluntary/question5alt-5", {
      data: req.session.data,
    });
  } else {
    if (
      req.session.data["q5vaPartyToListItems"] == null ||
      req.session.data["q5vaPartyToListItems"].length == 0
    ) {
      res.render("voluntary/question5-5", {
        data: req.session.data,
      });
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-5b"
      );
    }
  }
};

exports.question5Page5Post = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  const { q5vIsPartyTo } = req.session.data;

  // perform the field validation
  var validationOutput = isAlt
    ? validator.validateQuestion5Page5Alt(req.session.data)
    : validator.validateQuestion5Page5(req.session.data);
  if (validationOutput.isValid === false) {
    res.render(isAlt ? "voluntary/question5alt-5" : "voluntary/question5-5", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (isAlt) {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question5/question5-6"
    );
  } else {
    // Qualifying entity flow
    if (q5vIsPartyTo === "Yes") {
      if (
        req.session.data["q5vaPartyToListItems"] == null ||
        req.session.data["q5vaPartyToListItems"].length == 0
      ) {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-5a"
        );
      } else {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-5b"
        );
      }
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-6"
      );
    }
  }
};

exports.question5Page5A = async function (req, res, next) {
  res.render("voluntary/question5-5a", { data: req.session.data });
};

exports.question5Page5APost = async function (req, res, next) {
  // perform the field validation
  var validationOutput = validator.validateQuestion5Page5a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("voluntary/question5-5a", {
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
    "/voluntary/question5/question5-5b"
  );
};

exports.question5Page5B = async function (req, res, next) {
  res.render("voluntary/question5-5b", { data: req.session.data });
};

exports.question5Page5BPost = async function (req, res, next) {
  const { q5vbAddAnother } = req.session.data;

  webHelper.sessionRedirect(
    next,
    res,
    req,
    q5vbAddAnother === "Yes"
      ? "/voluntary/question5/question5-5a"
      : "/voluntary/question5/question5-6"
  );
};

exports.question5Page5BRem = async function (req, res, next) {
  const itemRef = getItemRef(req, "q5vaPartyToListItems", "q5vaArea");

  res.render("voluntary/question5-5conf", {
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

  res.render("voluntary/question5-5a", { data, isEditing: true });
};

exports.question5Page5ConfPost = async function (req, res, next) {
  webHelper.removeItem(
    req,
    "q5vaPartyToListItems",
    "q5vconfRemove",
    "q5vconfRemoveId"
  );

  webHelper.sessionRedirect(next, res, req, "/voluntary/question5/question5-5");
};

exports.question5Page6 = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";

  if (isAlt) {
    res.render("voluntary/question5alt-6", {
      data: req.session.data,
    });
  } else {
    if (
      req.session.data["q5viaFundedResearchListItems"] == null ||
      req.session.data["q5viaFundedResearchListItems"].length == 0
    ) {
      res.render("voluntary/question5-6", {
        data: req.session.data,
      });
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-6b"
      );
    }
  }
};

exports.question5Page6Post = async function (req, res, next) {
  const isAlt =
    req.session.data["q3iiQualifyingAssetOrQualifyingEntity"] ===
    "qualifyingAsset";
  const { q5viIsFundedResearch } = req.session.data;

  // perform the field validation
  var validationOutput = isAlt
    ? validator.validateQuestion5Page6Alt(req.session.data)
    : validator.validateQuestion5Page6(req.session.data);
  if (validationOutput.isValid === false) {
    res.render(isAlt ? "voluntary/question5alt-6" : "voluntary/question5-6", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (isAlt) {
    webHelper.sessionRedirect(next, res, req, "/voluntary/task-list");
  } else {
    // Qualifying entity flow
    if (q5viIsFundedResearch === "Yes") {
      if (
        req.session.data["q5viaFundedResearchListItems"] == null ||
        req.session.data["q5viaFundedResearchListItems"].length == 0
      ) {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-6a"
        );
      } else {
        webHelper.sessionRedirect(
          next,
          res,
          req,
          "/voluntary/question5/question5-6b"
        );
      }
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-7"
      );
    }
  }
};

exports.question5Page6A = async function (req, res, next) {
  res.render("voluntary/question5-6a", { data: req.session.data });
};

exports.question5Page6APost = async function (req, res, next) {
  // perform the field validation
  var validationOutput = validator.validateQuestion5Page6a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("voluntary/question5-6a", {
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
    "/voluntary/question5/question5-6b"
  );
};

exports.question5Page6B = async function (req, res, next) {
  res.render("voluntary/question5-6b", { data: req.session.data });
};

exports.question5Page6BPost = async function (req, res, next) {
  const { q5vibAddAnother } = req.session.data;

  webHelper.sessionRedirect(
    next,
    res,
    req,
    q5vibAddAnother === "Yes"
      ? "/voluntary/question5/question5-6a"
      : "/voluntary/question5/question5-7"
  );
};

exports.question5Page6BRem = async function (req, res, next) {
  const itemRef = getItemRef(req, "q5viaFundedResearchListItems", "q5viaName");

  res.render("voluntary/question5-6conf", {
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

  res.render("voluntary/question5-6a", { data, isEditing: true });
};

exports.question5Page6ConfPost = async function (req, res, next) {
  webHelper.removeItem(
    req,
    "q5viaFundedResearchListItems",
    "q5viconfRemove",
    "q5viconfRemoveId"
  );

  webHelper.sessionRedirect(next, res, req, "/voluntary/question5/question5-6");
};

exports.question5Page7 = async function (req, res, next) {
  if (
    req.session.data["q5viiaNSVSCListItems"] == null ||
    req.session.data["q5viiaNSVSCListItems"].length == 0
  ) {
    res.render("voluntary/question5-7", {
      data: req.session.data,
    });
  } else {
    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/voluntary/question5/question5-7b"
    );
  }
};

exports.question5Page7Post = async function (req, res, next) {
  const { q5viiIsNSVSC } = req.session.data;

  // perform the field validation
  var validationOutput = validator.validateQuestion5Page7(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("voluntary/question5-7", {
      data: req.session.data,
      formValidation: validationOutput,
    });
    return;
  }

  if (q5viiIsNSVSC === "Yes") {
    if (
      req.session.data["q5viiaNSVSCListItems"] == null ||
      req.session.data["q5viiaNSVSCListItems"].length == 0
    ) {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-7a"
      );
    } else {
      webHelper.sessionRedirect(
        next,
        res,
        req,
        "/voluntary/question5/question5-7b"
      );
    }
  } else {
    webHelper.sessionRedirect(next, res, req, "/voluntary/task-list");
  }
};

exports.question5Page7A = async function (req, res, next) {
  res.render("voluntary/question5-7a", { data: req.session.data });
};

exports.question5Page7APost = async function (req, res, next) {
  // perform the field validation
  var validationOutput = validator.validateQuestion5Page7a(req.session.data);
  if (validationOutput.isValid === false) {
    res.render("voluntary/question5-7a", {
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
    "/voluntary/question5/question5-7b"
  );
};

exports.question5Page7B = async function (req, res, next) {
  res.render("voluntary/question5-7b", { data: req.session.data });
};

exports.question5Page7BPost = async function (req, res, next) {
  const { q5viibAddAnother } = req.session.data;

  webHelper.sessionRedirect(
    next,
    res,
    req,
    q5viibAddAnother === "Yes"
      ? "/voluntary/question5/question5-7a"
      : "/voluntary/task-list"
  );
};

exports.question5Page7BRem = async function (req, res, next) {
  const itemRef = getItemRef(req, "q5viiaNSVSCListItems", "q5viiaLevel");

  res.render("voluntary/question5-7conf", {
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

  res.render("voluntary/question5-7a", { data, isEditing: true });
};

exports.question5Page7ConfPost = async function (req, res, next) {
  webHelper.removeItem(
    req,
    "q5viiaNSVSCListItems",
    "q5viiconfRemove",
    "q5viiconfRemoveId"
  );

  webHelper.sessionRedirect(next, res, req, "/voluntary/question5/question5-7");
};
