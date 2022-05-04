const crypto = require("crypto");
var dbConnector = require("./dbConnect");
const { auditLog, ACTIONS } = require("./audit");
const { logger } = require("../logger");

// store the data to the database
async function createNotificationData(req, formType) {
  var nowDate = new Date();
  var notificationList = null;
  var uniqueRefFound = false;

  const cs = new dbConnector.pgp.helpers.ColumnSet(
    [
      "reference",
      "notificationdata",
      "ownerid",
      "notificationtype",
      "createddate",
      "author",
    ],
    { table: "notifications" }
  );

  req.session.data = null;
  req.session.data = {};

  // TODO: Check the uniqueness against the pre-allocated application references for other notifications.
  //while (!uniqueRefFound) {
  var appRefCodePrefix = crypto.randomBytes(16).toString("hex").substring(0, 4);
  var appRefCodeSuffix = crypto
    .randomBytes(16)
    .toString("hex")
    .substring(16, 20);
  var newRef = appRefCodePrefix + "-" + appRefCodeSuffix;

  //notificationList = await getNotificationList(newRef);
  //if (notificationList != null && notificationList.length == 0) {
  req.session.data.status = 1;
  req.session.data.notificationReference = newRef;
  req.session.data.formType = formType;

  var convData = JSON.stringify(req.session.data);
  //uniqueRefFound = true;
  //}
  //}

  // data input values:
  const values = [
    {
      reference: newRef,
      notificationdata: convData,
      ownerid: req.session.authContainer.uniqueId,
      notificationtype: formType,
      createddate: nowDate,
      status: 1,
      author: req.session.authContainer.uniqueId,
    },
  ];

  // generating a multi-row insert query:
  const query = dbConnector.pgp.helpers.insert(values, cs) + "RETURNING id";

  // executing the query:
  try {
    dbConnector.dbConn
      .one(query)
      .then(function (data) {
        req.session.data.notificationid = data.id;
        logger.info({
          message: "create Notification Data successful",
          meta: {
            action: ACTIONS.UPDATE,
            function: "createNotificationData",
            source: "NSIwebapp",
            eventId: 801,
            user: req.session.authContainer.uniqueId,
            notificationid: req.session.data.notificationReference,
          },
        });
      })
      .finally(() => {
        auditLog(newRef, req.session.authContainer.uniqueId, ACTIONS.UPDATE);
      });
  } catch (error) {
    logger.error({
      message: "create Notification Data Error",
      error,
      meta: {
        action: ACTIONS.UPDATE,
        function: "createNotificationData",
        source: "NSIwebapp",
        eventId: 801,
        user: req.session.authContainer.uniqueId,
        notificationid: req.session.data.notificationReference,
      },
    });
  }
}

async function updateNotificationData(req) {
  if (req.session.data.status == 1 || req.session.data.status == 7) {
    var convData = JSON.stringify(req.session.data);
    const dataSingle = {
      notificationdata: convData,
      reference: req.session.data.notificationReference,
    };

    const condition = dbConnector.pgp.as.format(
      " WHERE reference = ${reference}",
      dataSingle
    );

    var update =
      dbConnector.pgp.helpers.update(
        dataSingle,
        ["notificationdata"],
        "notifications"
      ) + condition;
    dbConnector.dbConn
      .none(update)
      .then(function () {
        auditLog(
          req.session.data.notificationReference,
          req.session.authContainer.uniqueId,
          ACTIONS.UPDATE
        );
        logger.info({
          message: "update notification data successful",
          meta: {
            action: ACTIONS.UPDATE,
            function: "updateNotificationData",
            source: "NSIwebapp",
            eventId: 901,
            user: req.session.authContainer.uniqueId,
            notificationid: req.session.data.notificationReference,
          },
        });
      })
      .catch(function (err) {
        logger.error({
          message: "update notification data Error",
          err,
          meta: {
            action: ACTIONS.UPDATE,
            function: "updateNotificationData",
            source: "NSIwebapp",
            eventId: 901,
            user: req.session.authContainer.uniqueId,
            notificationid: req.session.data.notificationReference,
          },
        });
      });
  }
}

// Get a list of notifications based on the notification reference.
// Required to validate the uniqueness of the reference
async function getNotificationList(notificationRef) {
  return new Promise(function (resolve, reject) {
    var notificationsList = [];

    var sqlString =
      "select notifications.id, " +
      "notifications.reference, " +
      "notifications.createddate " +
      "from notifications where reference = '" +
      notificationRef +
      "' " +
      "order by notifications.createddate desc";

    dbConnector.dbConn
      .any(sqlString, notificationRef)
      .then(function (data) {
        for (
          var loopNotifications = 0;
          loopNotifications < data.length;
          loopNotifications++
        ) {
          var tmpDate = new Date(data[loopNotifications].createddate);

          // Create an object to save current row's data
          var notificationItem = {
            id: data[loopNotifications].id,
            reference: data[loopNotifications].reference,
            createddate:
              tmpDate.getDate() +
              "/" +
              (tmpDate.getMonth() + 1) +
              "/" +
              tmpDate.getFullYear(),
          };
          // Add object into array
          notificationsList.push(notificationItem);
        }
        resolve(notificationsList);
        logger.info({
          message: "get notification list successful",
          meta: {
            action: ACTIONS.READ,
            function: "getNotificationList",
            source: "NSIwebapp",
            eventId: 1001,
            user: "N/A",
            notificationid: notificationRef,
          },
        });
      })
      .catch(function (err) {
        reject("error");
        logger.error({
          message: "get notification list error",
          err,
          meta: {
            action: ACTIONS.READ,
            function: "getNotificationList",
            source: "NSIwebapp",
            eventId: 1001,
            user: "N/A",
            notificationid: notificationRef,
          },
        });
      });
  });
}

async function getNotifications(authorId) {
  return new Promise(function (resolve, reject) {
    dbConnector.dbConn
      .any("SELECT notificationdata FROM notifications where author = $1", [
        authorId,
      ])
      .then(function (data) {
        resolve({ data });
        logger.info({
          message: "get notifications successful",
          meta: {
            action: ACTIONS.READ,
            function: "getNotifications",
            source: "NSIwebapp",
            eventId: 1101,
            user: "N/A",
            notificationid: "N/A",
          },
        });
      })
      .catch(function (err) {
        reject("error");
        logger.error({
          message: "get notifications error",
          err,
          meta: {
            action: ACTIONS.READ,
            function: "getNotifications",
            source: "NSIwebapp",
            eventId: 1101,
            user: "N/A",
            notificationid: "N/A",
          },
        });
      });
  });
}

async function getNotificationsStatus(authorId) {
  return new Promise(function (resolve, reject) {
    dbConnector.dbConn
      .any("SELECT * FROM notifications where author = $1", [authorId])
      .then(function (data) {
        resolve({ data });
        logger.info({
          message: "get notifications status successful",
          meta: {
            action: ACTIONS.READ,
            function: "getNotificationsStatus",
            source: "NSIwebapp",
            eventId: 1201,
            user: "N/A",
            notificationid: "N/A",
          },
        });
      })
      .catch(function (err) {
        reject("error");
        logger.error({
          message: "get notifications status error",
          err,
          meta: {
            action: ACTIONS.READ,
            function: "getNotificationsStatus",
            source: "NSIwebapp",
            eventId: 1201,
            user: "N/A",
            notificationid: "N/A",
          },
        });
      });
  });
}

async function getNotification(reference, authorId) {
  return new Promise(function (resolve, reject) {
    dbConnector.dbConn
      .one(
        "SELECT notificationtype, notificationdata FROM notifications WHERE reference = $1 AND author = $2",
        [reference, authorId]
      )
      .then(function (data) {
        resolve({ data });
        logger.info({
          message: "get notification successful",
          meta: {
            action: ACTIONS.READ,
            function: "getNotification",
            source: "NSIwebapp",
            eventId: 1301,
            user: "N/A",
            notificationid: reference,
          },
        });
      })
      .catch(function (err) {
        reject("error");
        logger.error({
          message: "get notification error",
          err,
          meta: {
            action: ACTIONS.READ,
            function: "getNotification",
            source: "NSIwebapp",
            eventId: 1301,
            user: "N/A",
            notificationid: reference,
          },
        });
      });
  });
}

/* Generates a new multi notifier reference and updates the notification */
async function generateMultiNotifierReference(notificationReference, userId) {
  return new Promise(function (resolve, reject) {
    var appRefCodePrefix = crypto
      .randomBytes(16)
      .toString("hex")
      .substring(0, 4);
    var appRefCodeSuffix = crypto
      .randomBytes(16)
      .toString("hex")
      .substring(16, 20);
    var newRef = appRefCodePrefix + "-" + appRefCodeSuffix;

    // update the notification reference table
    saveMultiNotifierReference(newRef)
      .then(function (newId) {
        updateNotificationWithMultiNotifierReference(
          notificationReference,
          newId,
          userId,
          true
        )
          .then(function () {
            resolve(newRef);
          })
          .then(() => {
            auditLog(notificationReference, userId, ACTIONS.UPDATE);
          })
          .catch(function (error) {
            reject(error);
          });
      })
      .then(() => {
        auditLog(notificationReference, userId, ACTIONS.UPDATE);
      })
      .catch(function (error) {
        reject(error);
      });

    // update the notification
  });
}

/* creates the new multi notifier reference in the db and returns its id */
function saveMultiNotifierReference(newReference) {
  return new Promise(function (resolve, reject) {
    const cs = new dbConnector.pgp.helpers.ColumnSet(
      ["referencecode", "status"],
      { table: "multinotifierreference" }
    );

    // data input values:
    const values = [
      {
        referencecode: newReference,
        status: "Active",
      },
    ];

    // generating a multi-row insert query:
    const query = dbConnector.pgp.helpers.insert(values, cs) + "RETURNING id";

    // executing the query:
    try {
      dbConnector.dbConn.one(query).then(function (data) {
        resolve(data.id);
      });
      logger.info({
        message: "save multiNotifier reference successful",
        meta: {
          action: ACTIONS.UPDATE,
          function: "saveMultiNotifierReference",
          source: "NSIwebapp",
          eventId: 1401,
          user: "N/A",
          notificationid: newReference,
        },
      });
    } catch (error) {
      reject(error);
      logger.error({
        message: "save multiNotifier reference error",
        error,
        meta: {
          action: ACTIONS.UPDATE,
          function: "saveMultiNotifierReference",
          source: "NSIwebapp",
          eventId: 1401,
          user: "N/A",
          notificationid: newReference,
        },
      });
    }
  });
}

function updateNotificationWithMultiNotifierReference(
  notificationReference,
  multiNotifierReferenceId,
  userId,
  isMaster
) {
  return new Promise(function (resolve, reject) {
    const dataSingle = {
      multinotifierreference: multiNotifierReferenceId,
      reference: notificationReference,
      ismasternotifier: isMaster,
      author: userId,
    };

    const condition = dbConnector.pgp.as.format(
      " WHERE reference = ${reference} AND author = ${author}",
      dataSingle
    );

    var update =
      dbConnector.pgp.helpers.update(
        dataSingle,
        ["multinotifierreference", "ismasternotifier"],
        "notifications"
      ) + condition;
    dbConnector.dbConn
      .none(update)
      .then(function () {
        resolve("Success");
        logger.info({
          message:
            "update notification with multi notifier reference successful",
          meta: {
            action: ACTIONS.UPDATE,
            function: "updateNotificationWithMultiNotifierReference",
            source: "NSIwebapp",
            eventId: 1501,
            user: userId,
            notificationid: notificationReference,
          },
        });
      })
      .catch(function (err) {
        reject(err);
        logger.error({
          message: "update notification with multi notifier reference error",
          err,
          meta: {
            action: ACTIONS.UPDATE,
            function: "updateNotificationWithMultiNotifierReference",
            source: "NSIwebapp",
            eventId: 1501,
            user: userId,
            notificationid: notificationReference,
          },
        });
      });
  });
}

/* checks that the supplied multi notifier reference exists and then updates the notification */
function checkAndUpdateMultiNotificationReference(
  notificationReference,
  multiNotiferReference,
  userId
) {
  return new Promise(function (resolve, reject) {
    checkMultiNotifierReferenceExists(multiNotiferReference)
      .then(function (id) {
        updateNotificationWithMultiNotifierReference(
          notificationReference,
          id,
          userId,
          false
        )
          .then(function () {
            resolve("Success");
          })
          .then(() => {
            auditLog(notificationReference, userId, ACTIONS.UPDATE);
          })
          .catch(function (error) {
            reject(error);
          });
      })
      .then(() => {
        auditLog(notificationReference, userId, ACTIONS.READ);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

/* performs the existence check for the multi notifier reference */
function checkMultiNotifierReferenceExists(multiNotifierReference) {
  return new Promise(function (resolve, reject) {
    dbConnector.dbConn
      .one("SELECT id FROM multinotifierreference where referencecode = $1", [
        multiNotifierReference,
      ])
      .then(function (data) {
        resolve(data.id);
        logger.info({
          message: "check multi notifier reference exists successful",
          meta: {
            action: ACTIONS.READ,
            function: "checkMultiNotifierReferenceExists",
            source: "NSIwebapp",
            eventId: 1601,
            user: "N/A",
            notificationid: "N/A",
          },
        });
      })
      .catch(function (err) {
        reject(err);
        logger.error({
          message: "check multi notifier reference exists error",
          err,
          meta: {
            action: ACTIONS.READ,
            function: "checkMultiNotifierReferenceExists",
            source: "NSIwebapp",
            eventId: 1601,
            user: "N/A",
            notificationid: "N/A",
          },
        });
      });
  });
}

module.exports = {
  createNotificationData,
  updateNotificationData,
  getNotifications,
  getNotificationsStatus,
  getNotification,
  generateMultiNotifierReference,
  checkAndUpdateMultiNotificationReference,
};
