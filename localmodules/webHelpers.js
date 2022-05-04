const config = require("../config");
var dbConnector = require("./dbConnect");
const { logger } = require("../logger");
const { ACTIONS } = require("./audit");
const { Duplex } = require("stream");
const signHelper = require("./signingHelpers");
var uuid = require("uuid");
var NotifyClient = require("notifications-node-client").NotifyClient;
const session = require("express-session");
var notifyClient = new NotifyClient(
  config.properties.govukRunMode == "Live"
    ? config.properties.govukNotifyKeyLive
    : config.properties.govukNotifyKeyDemo
);
var signedData = "";

/*
  Handles the redirect issue whereby the session is only saved after the redirect has already happened.
*/
exports.sessionRedirect = function (next, res, req, path) {
  req.session.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(path);
  });
};

// Function to store the content of the file in the database
exports.storeFileContent = function (
  req,
  documentType,
  questionRef,
  documentName,
  documentContent,
  controlId
) {
  return new Promise(function (resolve, reject) {
    var nowDate = new Date();

    const cs = new dbConnector.pgp.helpers.ColumnSet(
      [
        "notificationreference",
        "documenttype",
        "questionref",
        "documentname",
        "documentcontent",
        "createddate",
      ],
      { table: "notificationdocuments" }
    );

    // data input values:
    const values = [
      {
        notificationreference: req.session.data.notificationReference,
        documenttype: documentType,
        questionref: questionRef,
        documentname: documentName,
        documentcontent: documentContent,
        createddate: nowDate,
      },
    ];

    // generating a multi-row insert query:
    const query = dbConnector.pgp.helpers.insert(values, cs) + "RETURNING id";

    // executing the query:
    dbConnector.dbConn
      .one(query)
      .then(function (data) {
        req.session.data[controlId] = data.id;
        resolve("success");
        logger.info({
          message: "store file content successful",
          meta: {
            action: ACTIONS.UPDATE,
            function: "storeFileContent",
            source: "NSIwebapp",
            eventId: 201,
            user: req.session.authContainer.uniqueId,
            notificationid: req.session.data.notificationReference,
          },
        });
      })
      .catch(function (err) {
        console.log("Error saving the uploaded document: " + err);
        reject("error");
        logger.error({
          message: "store file content error",
          err,
          meta: {
            action: ACTIONS.UPDATE,
            function: "storeFileContent",
            source: "NSIwebapp",
            eventId: 201,
            user: req.session.authContainer.uniqueId,
            notificationid: req.session.data.notificationReference,
          },
        });
      });
  });
};

/*
Params:
listKey: The list or the collection from which items needs to be removed
removeId: Control containing Yes or No of whether item should be removed 
id: Name of the control containing the id.
*/
exports.removeItem = function (req, listKey, removeId, id) {
  let recordIndex = null;

  if (req.session.data[removeId] === "Yes") {
    for (var i = 0; i < req.session.data[listKey].length; i++) {
      if (req.session.data[listKey][i].id === req.session.data[id]) {
        recordIndex = i;

        // got the record so jump out
        break;
      }
    }

    req.session.data[listKey].splice(recordIndex, 1);
  }

  req.session.data[removeId] = "";
};

// Function to delete the uploaded notification document
exports.deleteUploadedFile = function (recordId) {
  return new Promise(function (resolve, reject) {
    // deleting rows and returning the number of rows deleted
    dbConnector.dbConn
      .result(
        "DELETE FROM notificationdocuments WHERE id = $1",
        [recordId],
        (r) => r.rowCount
      )
      .then(function (data) {
        // data --> no of rows that were deleted
        resolve("success");
        logger.info({
          message: "Delete file successful",
          meta: {
            action: ACTIONS.DELETE,
            function: "deleteUploadedFile",
            source: "NSIwebapp",
            eventId: 301,
            user: "N/A",
            notificationid: "N/A",
          },
        });
      })
      .catch(function (err) {
        reject("error");
        logger.error({
          message: "Delete file error",
          err,
          meta: {
            action: ACTIONS.DELETE,
            function: "deleteUploadedFile",
            source: "NSIwebapp",
            eventId: 301,
            user: "N/A",
            notificationid: "N/A",
          },
        });
      });
  });
};

/* Handles the retrieval of the notification document  */
exports.getNotificationDocument = function (recordId) {
  return new Promise(function (resolve, reject) {
    dbConnector.dbConn
      .one("SELECT * FROM notificationdocuments WHERE id = $1", [recordId])
      .then(function (data) {
        // data --> cotains the fields
        resolve({
          documentname: data.documentname,
          documentcontent: data.documentcontent,
          documenttype: data.documenttype,
        });
        logger.info({
          message: "Get Notification document successful",
          meta: {
            action: ACTIONS.READ,
            function: "getNotificationDocument",
            source: "NSIwebapp",
            eventId: 401,
            user: "N/A",
            notificationid: "N/A",
          },
        });
      })
      .catch(function (err) {
        reject("error");
        logger.error({
          message: "Retrieve notification document error",
          err,
          meta: {
            action: ACTIONS.READ,
            function: "getNotificationDocument",
            source: "NSIwebapp",
            eventId: 401,
            user: "N/A",
            notificationid: "N/A",
          },
        });
      });
  });
};

/* Function to convert raw buffer into a readable stream */
exports.bufferToStream = function (rawBuffer) {
  let objDuplex = new Duplex();
  objDuplex.push(rawBuffer);
  objDuplex.push(null);
  return objDuplex;
};

function sendNotificationEmails(req, res) {
  return new Promise(function (resolve, reject) {
    var templateId = "419358a2-215c-4ddd-905d-72cdba1de567";

    // Send email to Logged in User and Authorised Contact
    // account.idTokenClaims.given_name and account.idTokenClaims.family_name

    const promises = [];
    var sendMultipleEmail = true;
    var loggedInUserEmail = req.session.authContainer.account.username;
    var authorisedContactEmail = req.session.data.authorisedContactEmail;
    var authorisedContactName = req.session.data.authorisedContactName;
    var displayNameLoggedInUser =
      req.session.authContainer.account.idTokenClaims.given_name +
      " " +
      req.session.authContainer.account.idTokenClaims.family_name;

    // If the authorised contact is the same as the logged in user then no need to send second email
    if (authorisedContactEmail == loggedInUserEmail) {
      sendMultipleEmail = false;
    }

    var personalisationLoggedInUser = {
      display_name:
        displayNameLoggedInUser == " "
          ? "Unknown Name"
          : displayNameLoggedInUser,
      notification_number: req.session.data.notificationReference,
      team_name: "Investment Security Unit team",
    };

    var personalisationAuthorisedUser = {
      display_name:
        authorisedContactName == "" ? "Unknown Name" : authorisedContactName,
      notification_number: req.session.data.notificationReference,
      team_name: "Investment Security Unit team",
    };

    // Promise push for the logged in user email
    promises.push(
      notifyClient.sendEmail(templateId, loggedInUserEmail, {
        personalisation: personalisationLoggedInUser,
        reference: uuid.v4(),
      })
    );

    if (sendMultipleEmail) {
      promises.push(
        notifyClient.sendEmail(templateId, authorisedContactEmail, {
          personalisation: personalisationAuthorisedUser,
          reference: uuid.v4(),
        })
      );
    }

    Promise.all(promises)
      .then((results) => {
        // All email(s) sent
        console.log(results);
        resolve("success");
        logger.info({
          message: "send notification emails successful",
          meta: {
            action: "SEND EMAILS",
            function: "sendNotificationEmails",
            source: "NSIwebapp",
            eventId: 501,
            user: req.session.authContainer.uniqueId,
            notificationid: req.session.data.notificationReference,
          },
        });
      })
      .catch(function (err) {
        console.error(err);
        reject("failed");
        logger.error({
          message: "send notification emails error",
          err,
          meta: {
            action: "SEND EMAILS",
            function: "sendNotificationEmails",
            source: "NSIwebapp",
            eventId: 501,
            user: req.session.authContainer.uniqueId,
            notificationid: req.session.data.notificationReference,
          },
        });
      });
  });
}

exports.submitNotification = function (req, res, next, path) {
  sendNotificationEmails(req, res)
    .then(function (response) {
      console.log(response);

      var dateSubmitted = new Date();
      // Email sent successfully, now try and update the database status
      req.session.data.status = 2;
      var convData = JSON.stringify(req.session.data);

      // Create a copy of the session data to remove the keys not needed for signing purposes
      var sessionDataCopy = signHelper.sanitiseObject(req.session.data);
      const dataBuffer = Buffer.from(JSON.stringify(sessionDataCopy));

      // sign the data
      signedData = signHelper.signMessageNodeVer(dataBuffer, "base64");

      // verify the data
      //var verificationResult = signHelper.verifyMessageNodeVer(dataBuffer, signedData, 'base64');
      //console.log('Verification Result:' + verificationResult);

      const dataSingle = {
        notificationdata: convData,
        reference: req.session.data.notificationReference,
        datesubmitted: dateSubmitted,
        signedsubmittedpayload: signedData,
        status: 2,
      };

      const condition = dbConnector.pgp.as.format(
        " WHERE reference = ${reference}",
        dataSingle
      );

      var update =
        dbConnector.pgp.helpers.update(
          dataSingle,
          [
            "status",
            "notificationdata",
            "datesubmitted",
            "signedsubmittedpayload",
          ],
          "notifications"
        ) + condition;
      dbConnector.dbConn
        .none(update)
        .then(function () {
          req.session.save(function (err) {
            if (err) return next(err);
            logger.info({
              message: "submit notification update db status successful",
              meta: {
                action: ACTIONS.UPDATE,
                function: "submitNotification",
                source: "NSIwebapp",
                eventId: 601,
                user: req.session.authContainer.uniqueId,
                notificationid: req.session.data.notificationReference,
              },
            });
            res.redirect(path);
          });
        })
        .catch(function (err) {
          logger.error({
            message: "submit notification update db status error",
            err,
            meta: {
              action: ACTIONS.UPDATE,
              function: "submitNotification",
              source: "NSIwebapp",
              eventId: 601,
              user: req.session.authContainer.uniqueId,
              notificationid: req.session.data.notificationReference,
            },
          });
          console.log("Updating db: " + err);
        });
    })
    .catch(function (err) {
      console.error(err);
    });
};

exports.updateMessageStatus = function (req, res, next, data, reference) {
  return new Promise(function (resolve, reject) {
    var convData = JSON.stringify(data);
    const dataSingle = {
      notificationdata: convData,
      reference: reference,
    };

    const condition = dbConnector.pgp.as.format(
      "WHERE reference = ${reference}",
      dataSingle
    );

    var update =
      dbConnector.pgp.helpers.update(
        { notificationdata: convData },
        ["notificationdata"],
        "notifications"
      ) + condition;

    dbConnector.dbConn
      .none(update)
      .then(function () {
        resolve();
        logger.info({
          message: "update message status successful",
          meta: {
            action: ACTIONS.UPDATE,
            function: "updateMessageStatus",
            source: "NSIwebapp",
            eventId: 701,
            user: req.session.authContainer.uniqueId,
            notificationid: req.session.data.notificationReference,
          },
        });
      })
      .catch(function (err) {
        console.log("Updating db: " + err);
        reject("error");
        logger.error({
          message: "update message status error",
          err,
          meta: {
            action: ACTIONS.UPDATE,
            function: "updateMessageStatus",
            source: "NSIwebapp",
            eventId: 701,
            user: req.session.authContainer.uniqueId,
            notificationid: req.session.data.notificationReference,
          },
        });
      });
  });
};
