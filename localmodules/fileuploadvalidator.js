var path = require("path");

const nofilemessages = {
  fileuploadPreAcquisitionChart: "Select a pre-acquisition structure document.",
  fileuploadPostAcquisitionChart:
    "Select an expected post-acquisition ownership structure document.",
  fileuploadControllingOwnershipChart:
    "Select a document which includes details of all shareholders who have share ownership or voting rights of 5% or over.",
};

const filetypemessages = {
  fileuploadPreAcquisitionChart:
    "The selected file must be a PDF, DOCX, XLSX or PPTX.",
  fileuploadPostAcquisitionChart:
    "The selected file must be a PDF, DOCX, XLSX or PPTX.",
  fileuploadControllingOwnershipChart:
    "The selected file must be a PDF, DOCX, XLSX or PPTX.",
  fileuploadAdditionalDocumentation1:
    "The selected file must be a PDF, DOCX, XLSX or PPTX.",
  fileuploadAdditionalDocumentation2:
    "The selected file must be a PDF, DOCX, XLSX or PPTX.",
  fileuploadAdditionalDocumentation3:
    "The selected file must be a PDF, DOCX, XLSX or PPTX.",
  fileuploadAdditionalDocumentation4:
    "The selected file must be a PDF, DOCX, XLSX or PPTX.",
};

const fileemptymessages = {
  fileuploadPreAcquisitionChart: "The selected file is empty.",
  fileuploadPostAcquisitionChart: "The selected file is empty.",
  fileuploadControllingOwnershipChart: "The selected file is empty.",
  fileuploadAdditionalDocumentation1: "The selected file is empty.",
  fileuploadAdditionalDocumentation2: "The selected file is empty.",
  fileuploadAdditionalDocumentation3: "The selected file is empty.",
  fileuploadAdditionalDocumentation4: "The selected file is empty.",
};

const filesizemessages = {
  fileuploadPreAcquisitionChart: "The selected file must be smaller than 10MB.",
  fileuploadPostAcquisitionChart:
    "The selected file must be smaller than 10MB.",
  fileuploadControllingOwnershipChart:
    "The selected file must be smaller than 10MB.",
  fileuploadAdditionalDocumentation1:
    "The selected file must be smaller than 10MB.",
  fileuploadAdditionalDocumentation2:
    "The selected file must be smaller than 10MB.",
  fileuploadAdditionalDocumentation3:
    "The selected file must be smaller than 10MB.",
  fileuploadAdditionalDocumentation4:
    "The selected file must be smaller than 10MB.",
};

// Check if the file has been selected
function isFileSelected(req) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return false;
  } else {
    return true;
  }
}

// Check if the file is the wrong file type
function isFileTypeCorrect(fileName) {
  var fileExtension = path.extname(fileName);

  if (
    fileExtension.toUpperCase() === ".PDF" ||
    fileExtension.toUpperCase() === ".DOCX" ||
    fileExtension.toUpperCase() === ".XLSX" ||
    fileExtension.toUpperCase() === ".PPTX"
  ) {
    return true;
  } else {
    return false;
  }
}

// Check if the file is too big
function isFileSizeCorrect(fileObject) {
  if (fileObject.truncated || fileObject.size > 10485760) {
    return false;
  } else {
    return true;
  }
}

// Check if the file is empty
function isFileEmpty(fileObject) {
  if (fileObject.size == 0) {
    return true;
  } else {
    return false;
  }
}

/**** MANDATORY Form File Upload validation checks ****/
exports.validateFileUploadQuestion6Page1 = function (req) {
  var returnList = { isValid: true, fileName: "No file selected" };
  var linefeedReqd = false;

  if (!isFileSelected(req)) {
    returnList["fileuploadPreAcquisitionChart"] =
      nofilemessages["fileuploadPreAcquisitionChart"];
    returnList.isValid = false;
    linefeedReqd = true;
    return returnList;
  }

  if (!isFileTypeCorrect(req.files.fileuploadPreAcquisitionChart.name)) {
    if (linefeedReqd) {
      returnList["fileuploadPreAcquisitionChart"] =
        returnList["fileuploadPreAcquisitionChart"] +
        "\r\n" +
        filetypemessages["fileuploadPreAcquisitionChart"];
    } else {
      returnList["fileuploadPreAcquisitionChart"] =
        filetypemessages["fileuploadPreAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (!isFileSizeCorrect(req.files.fileuploadPreAcquisitionChart)) {
    if (linefeedReqd) {
      returnList["fileuploadPreAcquisitionChart"] =
        returnList["fileuploadPreAcquisitionChart"] +
        "\r\n" +
        filesizemessages["fileuploadPreAcquisitionChart"];
    } else {
      returnList["fileuploadPreAcquisitionChart"] =
        filesizemessages["fileuploadPreAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (isFileEmpty(req.files.fileuploadPreAcquisitionChart)) {
    if (linefeedReqd) {
      returnList["fileuploadPreAcquisitionChart"] =
        returnList["fileuploadPreAcquisitionChart"] +
        "\r\n" +
        fileemptymessages["fileuploadPreAcquisitionChart"];
    } else {
      returnList["fileuploadPreAcquisitionChart"] =
        fileemptymessages["fileuploadPreAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  returnList.fileName = req.files.fileuploadPreAcquisitionChart.name;

  return returnList;
};

exports.validateFileUploadQuestion6Page2 = function (req) {
  var returnList = { isValid: true, fileName: "No file selected" };
  var linefeedReqd = false;

  if (!isFileSelected(req)) {
    returnList["fileuploadPostAcquisitionChart"] =
      nofilemessages["fileuploadPostAcquisitionChart"];
    returnList.isValid = false;
    linefeedReqd = true;
    return returnList;
  }

  if (!isFileTypeCorrect(req.files.fileuploadPostAcquisitionChart.name)) {
    if (linefeedReqd) {
      returnList["fileuploadPostAcquisitionChart"] =
        returnList["fileuploadPostAcquisitionChart"] +
        "\r\n" +
        filetypemessages["fileuploadPostAcquisitionChart"];
    } else {
      returnList["fileuploadPostAcquisitionChart"] =
        filetypemessages["fileuploadPostAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (!isFileSizeCorrect(req.files.fileuploadPostAcquisitionChart)) {
    if (linefeedReqd) {
      returnList["fileuploadPostAcquisitionChart"] =
        returnList["fileuploadPostAcquisitionChart"] +
        "\r\n" +
        filesizemessages["fileuploadPostAcquisitionChart"];
    } else {
      returnList["fileuploadPostAcquisitionChart"] =
        filesizemessages["fileuploadPostAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (isFileEmpty(req.files.fileuploadPostAcquisitionChart)) {
    if (linefeedReqd) {
      returnList["fileuploadPostAcquisitionChart"] =
        returnList["fileuploadPostAcquisitionChart"] +
        "\r\n" +
        fileemptymessages["fileuploadPostAcquisitionChart"];
    } else {
      returnList["fileuploadPostAcquisitionChart"] =
        fileemptymessages["fileuploadPostAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  returnList.fileName = req.files.fileuploadPostAcquisitionChart.name;

  return returnList;
};

exports.validateFileUploadQuestion8Page1 = function (req) {
  var returnList = { isValid: true, fileName: "No file selected" };
  var linefeedReqd = false;

  if (!isFileSelected(req)) {
    returnList["fileuploadControllingOwnershipChart"] =
      nofilemessages["fileuploadControllingOwnershipChart"];
    returnList.isValid = false;
    linefeedReqd = true;
    return returnList;
  }

  if (!isFileTypeCorrect(req.files.fileuploadControllingOwnershipChart.name)) {
    if (linefeedReqd) {
      returnList["fileuploadControllingOwnershipChart"] +=
        "\r\n" + filetypemessages["fileuploadControllingOwnershipChart"];
    } else {
      returnList["fileuploadControllingOwnershipChart"] =
        filetypemessages["fileuploadControllingOwnershipChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (!isFileSizeCorrect(req.files.fileuploadControllingOwnershipChart)) {
    if (linefeedReqd) {
      returnList["fileuploadControllingOwnershipChart"] +=
        "\r\n" + filesizemessages["fileuploadControllingOwnershipChart"];
    } else {
      returnList["fileuploadControllingOwnershipChart"] =
        filesizemessages["fileuploadControllingOwnershipChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (isFileEmpty(req.files.fileuploadControllingOwnershipChart)) {
    if (linefeedReqd) {
      returnList["fileuploadControllingOwnershipChart"] +=
        "\r\n" + fileemptymessages["fileuploadControllingOwnershipChart"];
    } else {
      returnList["fileuploadControllingOwnershipChart"] =
        fileemptymessages["fileuploadControllingOwnershipChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  returnList.fileName = req.files.fileuploadControllingOwnershipChart.name;

  return returnList;
};

exports.validateFileUploadQuestion9Page1 = function (req) {
  var returnList = { isValid: true, fileName: "No file selected" };
  var linefeedReqd = false;

  if (req.files.fileuploadAdditionalDocumentation1 != null) {
    linefeedReqd = false;
    if (!isFileTypeCorrect(req.files.fileuploadAdditionalDocumentation1.name)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation1"] +=
          "\r\n" + filetypemessages["fileuploadAdditionalDocumentation1"];
      } else {
        returnList["fileuploadAdditionalDocumentation1"] =
          filetypemessages["fileuploadAdditionalDocumentation1"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (!isFileSizeCorrect(req.files.fileuploadAdditionalDocumentation1)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation1"] +=
          "\r\n" + filesizemessages["fileuploadAdditionalDocumentation1"];
      } else {
        returnList["fileuploadAdditionalDocumentation1"] =
          filesizemessages["fileuploadAdditionalDocumentation1"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (isFileEmpty(req.files.fileuploadAdditionalDocumentation1)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation1"] +=
          "\r\n" + fileemptymessages["fileuploadAdditionalDocumentation1"];
      } else {
        returnList["fileuploadAdditionalDocumentation1"] =
          fileemptymessages["fileuploadAdditionalDocumentation1"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }
    returnList.fileName =
      returnList.fileName === "No file selected"
        ? req.files.fileuploadAdditionalDocumentation1.name
        : returnList.fileName +
          ":" +
          req.files.fileuploadAdditionalDocumentation1.name;
  }

  if (req.files.fileuploadAdditionalDocumentation2 != null) {
    linefeedReqd = false;
    if (!isFileTypeCorrect(req.files.fileuploadAdditionalDocumentation2.name)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation2"] +=
          "\r\n" + filetypemessages["fileuploadAdditionalDocumentation2"];
      } else {
        returnList["fileuploadAdditionalDocumentation2"] =
          filetypemessages["fileuploadAdditionalDocumentation2"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (!isFileSizeCorrect(req.files.fileuploadAdditionalDocumentation2)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation2"] +=
          "\r\n" + filesizemessages["fileuploadAdditionalDocumentation2"];
      } else {
        returnList["fileuploadAdditionalDocumentation2"] =
          filesizemessages["fileuploadAdditionalDocumentation2"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (isFileEmpty(req.files.fileuploadAdditionalDocumentation2)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation2"] +=
          "\r\n" + fileemptymessages["fileuploadAdditionalDocumentation2"];
      } else {
        returnList["fileuploadAdditionalDocumentation2"] =
          fileemptymessages["fileuploadAdditionalDocumentation2"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }
    returnList.fileName =
      returnList.fileName === "No file selected"
        ? req.files.fileuploadAdditionalDocumentation2.name
        : returnList.fileName +
          ":" +
          req.files.fileuploadAdditionalDocumentation2.name;
  }

  if (req.files.fileuploadAdditionalDocumentation3 != null) {
    linefeedReqd = false;
    if (!isFileTypeCorrect(req.files.fileuploadAdditionalDocumentation3.name)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation3"] +=
          "\r\n" + filetypemessages["fileuploadAdditionalDocumentation3"];
      } else {
        returnList["fileuploadAdditionalDocumentation3"] =
          filetypemessages["fileuploadAdditionalDocumentation3"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (!isFileSizeCorrect(req.files.fileuploadAdditionalDocumentation3)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation3"] +=
          "\r\n" + filesizemessages["fileuploadAdditionalDocumentation3"];
      } else {
        returnList["fileuploadAdditionalDocumentation3"] =
          filesizemessages["fileuploadAdditionalDocumentation3"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (isFileEmpty(req.files.fileuploadAdditionalDocumentation3)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation3"] +=
          "\r\n" + fileemptymessages["fileuploadAdditionalDocumentation3"];
      } else {
        returnList["fileuploadAdditionalDocumentation3"] =
          fileemptymessages["fileuploadAdditionalDocumentation3"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }
    returnList.fileName =
      returnList.fileName === "No file selected"
        ? req.files.fileuploadAdditionalDocumentation3.name
        : returnList.fileName +
          ":" +
          req.files.fileuploadAdditionalDocumentation3.name;
  }

  if (req.files.fileuploadAdditionalDocumentation4 != null) {
    linefeedReqd = false;
    if (!isFileTypeCorrect(req.files.fileuploadAdditionalDocumentation4.name)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation4"] +=
          "\r\n" + filetypemessages["fileuploadAdditionalDocumentation4"];
      } else {
        returnList["fileuploadAdditionalDocumentation4"] =
          filetypemessages["fileuploadAdditionalDocumentation4"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (!isFileSizeCorrect(req.files.fileuploadAdditionalDocumentation4)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation4"] +=
          "\r\n" + filesizemessages["fileuploadAdditionalDocumentation4"];
      } else {
        returnList["fileuploadAdditionalDocumentation4"] =
          filesizemessages["fileuploadAdditionalDocumentation4"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (isFileEmpty(req.files.fileuploadAdditionalDocumentation4)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation4"] +=
          "\r\n" + fileemptymessages["fileuploadAdditionalDocumentation4"];
      } else {
        returnList["fileuploadAdditionalDocumentation4"] =
          fileemptymessages["fileuploadAdditionalDocumentation4"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }
    returnList.fileName =
      returnList.fileName === "No file selected"
        ? req.files.fileuploadAdditionalDocumentation4.name
        : returnList.fileName +
          ":" +
          req.files.fileuploadAdditionalDocumentation4.name;
  }

  return returnList;
};
/**** End MANDATORY form checks ****/

/**** RETROSPECTIVE Form File Upload validation checks ****/
exports.retroValidateFileUploadQuestion6Page1 = function (req) {
  var returnList = { isValid: true, fileName: "No file selected" };
  var linefeedReqd = false;

  if (!isFileSelected(req)) {
    returnList["fileuploadPreAcquisitionChart"] =
      nofilemessages["fileuploadPreAcquisitionChart"];
    returnList.isValid = false;
    linefeedReqd = true;
    return returnList;
  }

  if (!isFileTypeCorrect(req.files.fileuploadPreAcquisitionChart.name)) {
    if (linefeedReqd) {
      returnList["fileuploadPreAcquisitionChart"] =
        returnList["fileuploadPreAcquisitionChart"] +
        "\r\n" +
        filetypemessages["fileuploadPreAcquisitionChart"];
    } else {
      returnList["fileuploadPreAcquisitionChart"] =
        filetypemessages["fileuploadPreAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (!isFileSizeCorrect(req.files.fileuploadPreAcquisitionChart)) {
    if (linefeedReqd) {
      returnList["fileuploadPreAcquisitionChart"] =
        returnList["fileuploadPreAcquisitionChart"] +
        "\r\n" +
        filesizemessages["fileuploadPreAcquisitionChart"];
    } else {
      returnList["fileuploadPreAcquisitionChart"] =
        filesizemessages["fileuploadPreAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (isFileEmpty(req.files.fileuploadPreAcquisitionChart)) {
    if (linefeedReqd) {
      returnList["fileuploadPreAcquisitionChart"] =
        returnList["fileuploadPreAcquisitionChart"] +
        "\r\n" +
        fileemptymessages["fileuploadPreAcquisitionChart"];
    } else {
      returnList["fileuploadPreAcquisitionChart"] =
        fileemptymessages["fileuploadPreAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  returnList.fileName = req.files.fileuploadPreAcquisitionChart.name;

  return returnList;
};

exports.retroValidateFileUploadQuestion6Page2 = function (req) {
  var returnList = { isValid: true, fileName: "No file selected" };
  var linefeedReqd = false;

  if (!isFileSelected(req)) {
    returnList["fileuploadPostAcquisitionChart"] =
      nofilemessages["fileuploadPostAcquisitionChart"];
    returnList.isValid = false;
    linefeedReqd = true;
    return returnList;
  }

  if (!isFileTypeCorrect(req.files.fileuploadPostAcquisitionChart.name)) {
    if (linefeedReqd) {
      returnList["fileuploadPostAcquisitionChart"] =
        returnList["fileuploadPostAcquisitionChart"] +
        "\r\n" +
        filetypemessages["fileuploadPostAcquisitionChart"];
    } else {
      returnList["fileuploadPostAcquisitionChart"] =
        filetypemessages["fileuploadPostAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (!isFileSizeCorrect(req.files.fileuploadPostAcquisitionChart)) {
    if (linefeedReqd) {
      returnList["fileuploadPostAcquisitionChart"] =
        returnList["fileuploadPostAcquisitionChart"] +
        "\r\n" +
        filesizemessages["fileuploadPostAcquisitionChart"];
    } else {
      returnList["fileuploadPostAcquisitionChart"] =
        filesizemessages["fileuploadPostAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (isFileEmpty(req.files.fileuploadPostAcquisitionChart)) {
    if (linefeedReqd) {
      returnList["fileuploadPostAcquisitionChart"] =
        returnList["fileuploadPostAcquisitionChart"] +
        "\r\n" +
        fileemptymessages["fileuploadPostAcquisitionChart"];
    } else {
      returnList["fileuploadPostAcquisitionChart"] =
        fileemptymessages["fileuploadPostAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  returnList.fileName = req.files.fileuploadPostAcquisitionChart.name;

  return returnList;
};

exports.retroValidateFileUploadQuestion8Page1 = function (req) {
  var returnList = { isValid: true, fileName: "No file selected" };
  var linefeedReqd = false;

  if (!isFileSelected(req)) {
    returnList["fileuploadControllingOwnershipChart"] =
      nofilemessages["fileuploadControllingOwnershipChart"];
    returnList.isValid = false;
    linefeedReqd = true;
    return returnList;
  }

  if (!isFileTypeCorrect(req.files.fileuploadControllingOwnershipChart.name)) {
    if (linefeedReqd) {
      returnList["fileuploadControllingOwnershipChart"] +=
        "\r\n" + filetypemessages["fileuploadControllingOwnershipChart"];
    } else {
      returnList["fileuploadControllingOwnershipChart"] =
        filetypemessages["fileuploadControllingOwnershipChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (!isFileSizeCorrect(req.files.fileuploadControllingOwnershipChart)) {
    if (linefeedReqd) {
      returnList["fileuploadControllingOwnershipChart"] +=
        "\r\n" + filesizemessages["fileuploadControllingOwnershipChart"];
    } else {
      returnList["fileuploadControllingOwnershipChart"] =
        filesizemessages["fileuploadControllingOwnershipChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (isFileEmpty(req.files.fileuploadControllingOwnershipChart)) {
    if (linefeedReqd) {
      returnList["fileuploadControllingOwnershipChart"] +=
        "\r\n" + fileemptymessages["fileuploadControllingOwnershipChart"];
    } else {
      returnList["fileuploadControllingOwnershipChart"] =
        fileemptymessages["fileuploadControllingOwnershipChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  returnList.fileName = req.files.fileuploadControllingOwnershipChart.name;

  return returnList;
};

exports.retroValidateFileUploadQuestion9Page1 = function (req) {
  var returnList = { isValid: true, fileName: "No file selected" };
  var linefeedReqd = false;

  if (req.files.fileuploadAdditionalDocumentation1 != null) {
    linefeedReqd = false;
    if (!isFileTypeCorrect(req.files.fileuploadAdditionalDocumentation1.name)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation1"] +=
          "\r\n" + filetypemessages["fileuploadAdditionalDocumentation1"];
      } else {
        returnList["fileuploadAdditionalDocumentation1"] =
          filetypemessages["fileuploadAdditionalDocumentation1"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (!isFileSizeCorrect(req.files.fileuploadAdditionalDocumentation1)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation1"] +=
          "\r\n" + filesizemessages["fileuploadAdditionalDocumentation1"];
      } else {
        returnList["fileuploadAdditionalDocumentation1"] =
          filesizemessages["fileuploadAdditionalDocumentation1"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (isFileEmpty(req.files.fileuploadAdditionalDocumentation1)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation1"] +=
          "\r\n" + fileemptymessages["fileuploadAdditionalDocumentation1"];
      } else {
        returnList["fileuploadAdditionalDocumentation1"] =
          fileemptymessages["fileuploadAdditionalDocumentation1"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }
    returnList.fileName =
      returnList.fileName === "No file selected"
        ? req.files.fileuploadAdditionalDocumentation1.name
        : returnList.fileName +
          ":" +
          req.files.fileuploadAdditionalDocumentation1.name;
  }

  if (req.files.fileuploadAdditionalDocumentation2 != null) {
    linefeedReqd = false;
    if (!isFileTypeCorrect(req.files.fileuploadAdditionalDocumentation2.name)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation2"] +=
          "\r\n" + filetypemessages["fileuploadAdditionalDocumentation2"];
      } else {
        returnList["fileuploadAdditionalDocumentation2"] =
          filetypemessages["fileuploadAdditionalDocumentation2"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (!isFileSizeCorrect(req.files.fileuploadAdditionalDocumentation2)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation2"] +=
          "\r\n" + filesizemessages["fileuploadAdditionalDocumentation2"];
      } else {
        returnList["fileuploadAdditionalDocumentation2"] =
          filesizemessages["fileuploadAdditionalDocumentation2"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (isFileEmpty(req.files.fileuploadAdditionalDocumentation2)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation2"] +=
          "\r\n" + fileemptymessages["fileuploadAdditionalDocumentation2"];
      } else {
        returnList["fileuploadAdditionalDocumentation2"] =
          fileemptymessages["fileuploadAdditionalDocumentation2"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }
    returnList.fileName =
      returnList.fileName === "No file selected"
        ? req.files.fileuploadAdditionalDocumentation2.name
        : returnList.fileName +
          ":" +
          req.files.fileuploadAdditionalDocumentation2.name;
  }

  if (req.files.fileuploadAdditionalDocumentation3 != null) {
    linefeedReqd = false;
    if (!isFileTypeCorrect(req.files.fileuploadAdditionalDocumentation3.name)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation3"] +=
          "\r\n" + filetypemessages["fileuploadAdditionalDocumentation3"];
      } else {
        returnList["fileuploadAdditionalDocumentation3"] =
          filetypemessages["fileuploadAdditionalDocumentation3"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (!isFileSizeCorrect(req.files.fileuploadAdditionalDocumentation3)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation3"] +=
          "\r\n" + filesizemessages["fileuploadAdditionalDocumentation3"];
      } else {
        returnList["fileuploadAdditionalDocumentation3"] =
          filesizemessages["fileuploadAdditionalDocumentation3"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (isFileEmpty(req.files.fileuploadAdditionalDocumentation3)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation3"] +=
          "\r\n" + fileemptymessages["fileuploadAdditionalDocumentation3"];
      } else {
        returnList["fileuploadAdditionalDocumentation3"] =
          fileemptymessages["fileuploadAdditionalDocumentation3"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }
    returnList.fileName =
      returnList.fileName === "No file selected"
        ? req.files.fileuploadAdditionalDocumentation3.name
        : returnList.fileName +
          ":" +
          req.files.fileuploadAdditionalDocumentation3.name;
  }

  if (req.files.fileuploadAdditionalDocumentation4 != null) {
    linefeedReqd = false;
    if (!isFileTypeCorrect(req.files.fileuploadAdditionalDocumentation4.name)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation4"] +=
          "\r\n" + filetypemessages["fileuploadAdditionalDocumentation4"];
      } else {
        returnList["fileuploadAdditionalDocumentation4"] =
          filetypemessages["fileuploadAdditionalDocumentation4"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (!isFileSizeCorrect(req.files.fileuploadAdditionalDocumentation4)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation4"] +=
          "\r\n" + filesizemessages["fileuploadAdditionalDocumentation4"];
      } else {
        returnList["fileuploadAdditionalDocumentation4"] =
          filesizemessages["fileuploadAdditionalDocumentation4"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (isFileEmpty(req.files.fileuploadAdditionalDocumentation4)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation4"] +=
          "\r\n" + fileemptymessages["fileuploadAdditionalDocumentation4"];
      } else {
        returnList["fileuploadAdditionalDocumentation4"] =
          fileemptymessages["fileuploadAdditionalDocumentation4"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }
    returnList.fileName =
      returnList.fileName === "No file selected"
        ? req.files.fileuploadAdditionalDocumentation4.name
        : returnList.fileName +
          ":" +
          req.files.fileuploadAdditionalDocumentation4.name;
  }

  return returnList;
};
/**** End RETROSPECTIVE form checks ****/

/**** VOLUNTARY Form File Upload validation checks ****/
exports.voluntaryValidateFileUploadQuestion6Page1 = function (req) {
  var returnList = { isValid: true, fileName: "No file selected" };
  var linefeedReqd = false;

  if (!isFileSelected(req)) {
    returnList["fileuploadPreAcquisitionChart"] =
      nofilemessages["fileuploadPreAcquisitionChart"];
    returnList.isValid = false;
    linefeedReqd = true;
    return returnList;
  }

  if (!isFileTypeCorrect(req.files.fileuploadPreAcquisitionChart.name)) {
    if (linefeedReqd) {
      returnList["fileuploadPreAcquisitionChart"] =
        returnList["fileuploadPreAcquisitionChart"] +
        "\r\n" +
        filetypemessages["fileuploadPreAcquisitionChart"];
    } else {
      returnList["fileuploadPreAcquisitionChart"] =
        filetypemessages["fileuploadPreAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (!isFileSizeCorrect(req.files.fileuploadPreAcquisitionChart)) {
    if (linefeedReqd) {
      returnList["fileuploadPreAcquisitionChart"] =
        returnList["fileuploadPreAcquisitionChart"] +
        "\r\n" +
        filesizemessages["fileuploadPreAcquisitionChart"];
    } else {
      returnList["fileuploadPreAcquisitionChart"] =
        filesizemessages["fileuploadPreAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (isFileEmpty(req.files.fileuploadPreAcquisitionChart)) {
    if (linefeedReqd) {
      returnList["fileuploadPreAcquisitionChart"] =
        returnList["fileuploadPreAcquisitionChart"] +
        "\r\n" +
        fileemptymessages["fileuploadPreAcquisitionChart"];
    } else {
      returnList["fileuploadPreAcquisitionChart"] =
        fileemptymessages["fileuploadPreAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  returnList.fileName = req.files.fileuploadPreAcquisitionChart.name;

  return returnList;
};

exports.voluntaryValidateFileUploadQuestion6Page1Asset = function (req) {
  var returnList = { isValid: true, fileName: "No file selected" };
  var linefeedReqd = false;

  if (!isFileSelected(req)) {
    returnList["fileuploadPreAcquisitionChartAsset"] =
      nofilemessages["fileuploadPreAcquisitionChart"];
    returnList.isValid = false;
    linefeedReqd = true;
    return returnList;
  }

  if (!isFileTypeCorrect(req.files.fileuploadPreAcquisitionChartAsset.name)) {
    if (linefeedReqd) {
      returnList["fileuploadPreAcquisitionChartAsset"] +=
        "\r\n" + filetypemessages["fileuploadPreAcquisitionChart"];
    } else {
      returnList["fileuploadPreAcquisitionChartAsset"] =
        filetypemessages["fileuploadPreAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (!isFileSizeCorrect(req.files.fileuploadPreAcquisitionChartAsset)) {
    if (linefeedReqd) {
      returnList["fileuploadPreAcquisitionChartAsset"] +=
        "\r\n" + filesizemessages["fileuploadPreAcquisitionChart"];
    } else {
      returnList["fileuploadPreAcquisitionChartAsset"] =
        filesizemessages["fileuploadPreAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (isFileEmpty(req.files.fileuploadPreAcquisitionChartAsset)) {
    if (linefeedReqd) {
      returnList["fileuploadPreAcquisitionChartAsset"] +=
        "\r\n" + fileemptymessages["fileuploadPreAcquisitionChart"];
    } else {
      returnList["fileuploadPreAcquisitionChartAsset"] =
        fileemptymessages["fileuploadPreAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  returnList.fileName = req.files.fileuploadPreAcquisitionChartAsset.name;

  return returnList;
};

exports.voluntaryValidateFileUploadQuestion6Page2 = function (req) {
  var returnList = { isValid: true, fileName: "No file selected" };
  var linefeedReqd = false;

  if (!isFileSelected(req)) {
    returnList["fileuploadPostAcquisitionChart"] =
      nofilemessages["fileuploadPostAcquisitionChart"];
    returnList.isValid = false;
    linefeedReqd = true;
    return returnList;
  }

  if (!isFileTypeCorrect(req.files.fileuploadPostAcquisitionChart.name)) {
    if (linefeedReqd) {
      returnList["fileuploadPostAcquisitionChart"] =
        returnList["fileuploadPostAcquisitionChart"] +
        "\r\n" +
        filetypemessages["fileuploadPostAcquisitionChart"];
    } else {
      returnList["fileuploadPostAcquisitionChart"] =
        filetypemessages["fileuploadPostAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (!isFileSizeCorrect(req.files.fileuploadPostAcquisitionChart)) {
    if (linefeedReqd) {
      returnList["fileuploadPostAcquisitionChart"] =
        returnList["fileuploadPostAcquisitionChart"] +
        "\r\n" +
        filesizemessages["fileuploadPostAcquisitionChart"];
    } else {
      returnList["fileuploadPostAcquisitionChart"] =
        filesizemessages["fileuploadPostAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (isFileEmpty(req.files.fileuploadPostAcquisitionChart)) {
    if (linefeedReqd) {
      returnList["fileuploadPostAcquisitionChart"] =
        returnList["fileuploadPostAcquisitionChart"] +
        "\r\n" +
        fileemptymessages["fileuploadPostAcquisitionChart"];
    } else {
      returnList["fileuploadPostAcquisitionChart"] =
        fileemptymessages["fileuploadPostAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  returnList.fileName = req.files.fileuploadPostAcquisitionChart.name;

  return returnList;
};

exports.voluntaryValidateFileUploadQuestion6Page2Asset = function (req) {
  var returnList = { isValid: true, fileName: "No file selected" };
  var linefeedReqd = false;

  if (!isFileSelected(req)) {
    returnList["fileuploadPostAcquisitionChartAsset"] =
      nofilemessages["fileuploadPostAcquisitionChart"];
    returnList.isValid = false;
    linefeedReqd = true;
    return returnList;
  }

  if (!isFileTypeCorrect(req.files.fileuploadPostAcquisitionChartAsset.name)) {
    if (linefeedReqd) {
      returnList["fileuploadPostAcquisitionChartAsset"] +=
        "\r\n" + filetypemessages["fileuploadPostAcquisitionChart"];
    } else {
      returnList["fileuploadPostAcquisitionChartAsset"] =
        filetypemessages["fileuploadPostAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (!isFileSizeCorrect(req.files.fileuploadPostAcquisitionChartAsset)) {
    if (linefeedReqd) {
      returnList["fileuploadPostAcquisitionChartAsset"] +=
        "\r\n" + filesizemessages["fileuploadPostAcquisitionChart"];
    } else {
      returnList["fileuploadPostAcquisitionChartAsset"] =
        filesizemessages["fileuploadPostAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (isFileEmpty(req.files.fileuploadPostAcquisitionChartAsset)) {
    if (linefeedReqd) {
      returnList["fileuploadPostAcquisitionChartAsset"] +=
        "\r\n" + fileemptymessages["fileuploadPostAcquisitionChart"];
    } else {
      returnList["fileuploadPostAcquisitionChartAsset"] =
        fileemptymessages["fileuploadPostAcquisitionChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  returnList.fileName = req.files.fileuploadPostAcquisitionChartAsset.name;

  return returnList;
};

exports.voluntaryValidateFileUploadQuestion8Page1 = function (req) {
  var returnList = { isValid: true, fileName: "No file selected" };
  var linefeedReqd = false;

  if (!isFileSelected(req)) {
    returnList["fileuploadControllingOwnershipChart"] =
      nofilemessages["fileuploadControllingOwnershipChart"];
    returnList.isValid = false;
    linefeedReqd = true;
    return returnList;
  }

  if (!isFileTypeCorrect(req.files.fileuploadControllingOwnershipChart.name)) {
    if (linefeedReqd) {
      returnList["fileuploadControllingOwnershipChart"] +=
        "\r\n" + filetypemessages["fileuploadControllingOwnershipChart"];
    } else {
      returnList["fileuploadControllingOwnershipChart"] =
        filetypemessages["fileuploadControllingOwnershipChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (!isFileSizeCorrect(req.files.fileuploadControllingOwnershipChart)) {
    if (linefeedReqd) {
      returnList["fileuploadControllingOwnershipChart"] +=
        "\r\n" + filesizemessages["fileuploadControllingOwnershipChart"];
    } else {
      returnList["fileuploadControllingOwnershipChart"] =
        filesizemessages["fileuploadControllingOwnershipChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  if (isFileEmpty(req.files.fileuploadControllingOwnershipChart)) {
    if (linefeedReqd) {
      returnList["fileuploadControllingOwnershipChart"] +=
        "\r\n" + fileemptymessages["fileuploadControllingOwnershipChart"];
    } else {
      returnList["fileuploadControllingOwnershipChart"] =
        fileemptymessages["fileuploadControllingOwnershipChart"];
    }
    returnList.isValid = false;
    linefeedReqd = true;
  }

  returnList.fileName = req.files.fileuploadControllingOwnershipChart.name;

  return returnList;
};

exports.voluntaryValidateFileUploadQuestion9Page1 = function (req) {
  var returnList = { isValid: true, fileName: "No file selected" };
  var linefeedReqd = false;

  if (req.files.fileuploadAdditionalDocumentation1 != null) {
    linefeedReqd = false;
    if (!isFileTypeCorrect(req.files.fileuploadAdditionalDocumentation1.name)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation1"] +=
          "\r\n" + filetypemessages["fileuploadAdditionalDocumentation1"];
      } else {
        returnList["fileuploadAdditionalDocumentation1"] =
          filetypemessages["fileuploadAdditionalDocumentation1"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (!isFileSizeCorrect(req.files.fileuploadAdditionalDocumentation1)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation1"] +=
          "\r\n" + filesizemessages["fileuploadAdditionalDocumentation1"];
      } else {
        returnList["fileuploadAdditionalDocumentation1"] =
          filesizemessages["fileuploadAdditionalDocumentation1"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (isFileEmpty(req.files.fileuploadAdditionalDocumentation1)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation1"] +=
          "\r\n" + fileemptymessages["fileuploadAdditionalDocumentation1"];
      } else {
        returnList["fileuploadAdditionalDocumentation1"] =
          fileemptymessages["fileuploadAdditionalDocumentation1"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }
    returnList.fileName =
      returnList.fileName === "No file selected"
        ? req.files.fileuploadAdditionalDocumentation1.name
        : returnList.fileName +
          ":" +
          req.files.fileuploadAdditionalDocumentation1.name;
  }

  if (req.files.fileuploadAdditionalDocumentation2 != null) {
    linefeedReqd = false;
    if (!isFileTypeCorrect(req.files.fileuploadAdditionalDocumentation2.name)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation2"] +=
          "\r\n" + filetypemessages["fileuploadAdditionalDocumentation2"];
      } else {
        returnList["fileuploadAdditionalDocumentation2"] =
          filetypemessages["fileuploadAdditionalDocumentation2"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (!isFileSizeCorrect(req.files.fileuploadAdditionalDocumentation2)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation2"] +=
          "\r\n" + filesizemessages["fileuploadAdditionalDocumentation2"];
      } else {
        returnList["fileuploadAdditionalDocumentation2"] =
          filesizemessages["fileuploadAdditionalDocumentation2"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (isFileEmpty(req.files.fileuploadAdditionalDocumentation2)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation2"] +=
          "\r\n" + fileemptymessages["fileuploadAdditionalDocumentation2"];
      } else {
        returnList["fileuploadAdditionalDocumentation2"] =
          fileemptymessages["fileuploadAdditionalDocumentation2"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }
    returnList.fileName =
      returnList.fileName === "No file selected"
        ? req.files.fileuploadAdditionalDocumentation2.name
        : returnList.fileName +
          ":" +
          req.files.fileuploadAdditionalDocumentation2.name;
  }

  if (req.files.fileuploadAdditionalDocumentation3 != null) {
    linefeedReqd = false;
    if (!isFileTypeCorrect(req.files.fileuploadAdditionalDocumentation3.name)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation3"] +=
          "\r\n" + filetypemessages["fileuploadAdditionalDocumentation3"];
      } else {
        returnList["fileuploadAdditionalDocumentation3"] =
          filetypemessages["fileuploadAdditionalDocumentation3"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (!isFileSizeCorrect(req.files.fileuploadAdditionalDocumentation3)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation3"] +=
          "\r\n" + filesizemessages["fileuploadAdditionalDocumentation3"];
      } else {
        returnList["fileuploadAdditionalDocumentation3"] =
          filesizemessages["fileuploadAdditionalDocumentation3"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (isFileEmpty(req.files.fileuploadAdditionalDocumentation3)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation3"] +=
          "\r\n" + fileemptymessages["fileuploadAdditionalDocumentation3"];
      } else {
        returnList["fileuploadAdditionalDocumentation3"] =
          fileemptymessages["fileuploadAdditionalDocumentation3"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }
    returnList.fileName =
      returnList.fileName === "No file selected"
        ? req.files.fileuploadAdditionalDocumentation3.name
        : returnList.fileName +
          ":" +
          req.files.fileuploadAdditionalDocumentation3.name;
  }

  if (req.files.fileuploadAdditionalDocumentation4 != null) {
    linefeedReqd = false;
    if (!isFileTypeCorrect(req.files.fileuploadAdditionalDocumentation4.name)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation4"] +=
          "\r\n" + filetypemessages["fileuploadAdditionalDocumentation4"];
      } else {
        returnList["fileuploadAdditionalDocumentation4"] =
          filetypemessages["fileuploadAdditionalDocumentation4"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (!isFileSizeCorrect(req.files.fileuploadAdditionalDocumentation4)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation4"] +=
          "\r\n" + filesizemessages["fileuploadAdditionalDocumentation4"];
      } else {
        returnList["fileuploadAdditionalDocumentation4"] =
          filesizemessages["fileuploadAdditionalDocumentation4"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }

    if (isFileEmpty(req.files.fileuploadAdditionalDocumentation4)) {
      if (linefeedReqd) {
        returnList["fileuploadAdditionalDocumentation4"] +=
          "\r\n" + fileemptymessages["fileuploadAdditionalDocumentation4"];
      } else {
        returnList["fileuploadAdditionalDocumentation4"] =
          fileemptymessages["fileuploadAdditionalDocumentation4"];
      }
      returnList.isValid = false;
      linefeedReqd = true;
    }
    returnList.fileName =
      returnList.fileName === "No file selected"
        ? req.files.fileuploadAdditionalDocumentation4.name
        : returnList.fileName +
          ":" +
          req.files.fileuploadAdditionalDocumentation4.name;
  }

  return returnList;
};
/**** End VOLUNTARY form checks ****/
