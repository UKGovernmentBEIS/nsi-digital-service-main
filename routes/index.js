var express = require("express");
var router = express.Router();
var webHelper = require("../localmodules/webHelpers");

var indexController = require("../controllers/index.controller");
const notificationDataUtils = require("../localmodules/notificationDataUtils");
const OPTIONS = require("../constants/options");
const { auditLog, ACTIONS } = require("../localmodules/audit");

/* GET Clear data */
router.get("/cleardata", function (req, res, next) {
  req.session.data = null;
  req.session.uploadValidation = null;

  res.redirect("/");
});

/* GET home page */
router.get("/", function (req, res, next) {
  req.session.authCodeRequest = null;
  req.session.tokenRequest = null;
  res.render("start");
});

router.get("/create-account", function (req, res, next) {
  res.render("create-account");
});

router.get("/signin", function (req, res, next) {
  res.render("signin");
});

/* GET form selection screen */
router.get("/form-selection", function (req, res, next) {
  // clear the data as we are starting a new one
  req.session.data = {};

  res.render("form-selection");
});

/* POST form selection screen */
router.post("/form-selection", function (req, res, next) {
  const { formType } = req.session.data;
  let form = "mandatory";

  if (formType === "retrospective") {
    form = "retrospective";
  }

  if (formType === "voluntary") {
    form = "voluntary";
  }

  notificationDataUtils.createNotificationData(req, form);

  console.log(
    "Form Selection Post Ref:" + req.session.data["notificationReference"]
  );

  webHelper.sessionRedirect(next, res, req, "/reference");
});

/* GET dashboard screen */
router.get("/dashboard", async function (req, res, next) {
  req.session.data = {};

  const { data } = await notificationDataUtils.getNotifications(
    req.session.authContainer.uniqueId
  );

  const notificationsWithNotes = data.filter(
    (item) => JSON.parse(item.notificationdata).notes
  );
  const hasNotes = notificationsWithNotes.length >= 1;
  let messages = [];

  if (hasNotes) {
    notificationsWithNotes.forEach((item) => {
      const notes = JSON.parse(item.notificationdata).notes;
      const notifierNotes = notes.filter(
        (note) => note.recipient === "Notifier"
      );

      messages = [...messages, ...notifierNotes];
    });
  }

  res.render("dashboard", {
    unreadCount: messages.filter((item) => !item.isRead).length,
    messagesCount: messages.length,
  });
});

router.get("/reference", function (req, res, next) {
  res.render("reference");
});

router.get("/help", function (req, res, next) {
  var isAuthenticated = false;
  if (req.session.authContainer) {
    isAuthenticated = true;
  }
  res.render("help", { isAuthenticated: isAuthenticated });
});

router.get("/feedback", function (req, res, next) {
  res.render("feedback");
});

router.get("/accessibility", function (req, res, next) {
  var isAuthenticated = false;
  if (req.session.authContainer) {
    isAuthenticated = true;
  }
  res.render("accessibility", { isAuthenticated: isAuthenticated });
});

router.get("/cookies", function (req, res, next) {
  var isAuthenticated = false;
  if (req.session.authContainer) {
    isAuthenticated = true;
  }
  res.render("cookies", { isAuthenticated: isAuthenticated });
});

router.get("/cookie-settings", function (req, res, next) {
  let cookie = null;

  if (req.cookies["nsi-cookie-consent"]) {
    cookie = JSON.parse(req.cookies["nsi-cookie-consent"]);
  }

  res.render("cookie-settings", { cookie });
});

router.post("/cookie-settings", function (req, res, next) {
  const cookieSettings = {
    necessary: true,
    preferences: false,
    statistics: true,
    marketing: false,
    consented: true,
    version: 3,
  };

  res.cookie(
    "nsi-cookie-consent",
    JSON.stringify({
      ...cookieSettings,
      statistics: req.body.cookie === "useCookie" ? true : false,
    })
  );

  webHelper.sessionRedirect(next, res, req, "/cookie-settings");
});

router.get("/privacy", function (req, res, next) {
  var isAuthenticated = false;
  if (req.session.authContainer) {
    isAuthenticated = true;
  }
  res.render("privacy", { isAuthenticated: isAuthenticated });
});

router.get("/terms-and-conditions", function (req, res, next) {
  var isAuthenticated = false;
  if (req.session.authContainer) {
    isAuthenticated = true;
  }
  res.render("terms", { isAuthenticated: isAuthenticated });
});

router.get("/help-signin", function (req, res, next) {
  var isAuthenticated = false;
  if (req.session.authContainer) {
    isAuthenticated = true;
  }
  res.render("help-signin", { isAuthenticated: isAuthenticated });
});

router.post("/reference", function (req, res, next) {
  const { formType } = req.session.data;
  let form = "mandatory";

  if (formType === "retrospective") {
    form = "retrospective";
  }

  if (formType === "voluntary") {
    form = "voluntary";
  }

  webHelper.sessionRedirect(next, res, req, "/" + form + "/task-list");
});

router.get("/in-progress-notifications", async function (req, res, next) {
  const { data } = await notificationDataUtils.getNotificationsStatus(
    req.session.authContainer.uniqueId
  );

  const mappedData = data
    .filter((item) => item.status === 1)
    .map((item) => {
      const {
        userNotificationReference,
        notificationReference,
        status,
        formType,
      } = JSON.parse(item.notificationdata);
      return {
        userNotificationReference,
        notificationReference,
        notificationtype:
          OPTIONS.notificationTypeMappings[item.notificationtype],
        status: OPTIONS.statusMappings[item.status],
      };
    });

  res.render("in-progress-notifications", { data: mappedData });
});

router.get("/request-info-notifications", async function (req, res, next) {
  const { data } = await notificationDataUtils.getNotificationsStatus(
    req.session.authContainer.uniqueId
  );

  const mappedData = data
    .filter((item) => item.status === 7)
    .map((item) => {
      const {
        userNotificationReference,
        notificationReference,
        status,
        formType,
      } = JSON.parse(item.notificationdata);
      return {
        userNotificationReference,
        notificationReference,
        notificationtype:
          OPTIONS.notificationTypeMappings[item.notificationtype],
        status: OPTIONS.statusMappings[item.status],
      };
    });

  res.render("request-info-notifications", { data: mappedData });
});

router.get("/select-notification/:reference", async function (req, res, next) {
  const { data } = await notificationDataUtils.getNotification(
    req.params.reference,
    req.session.authContainer.uniqueId
  );

  auditLog(
    req.params.reference,
    req.session.authContainer.uniqueId,
    ACTIONS.READ
  );

  req.session.data = JSON.parse(data.notificationdata);

  // The form type is not updated in the json block
  if (req.session.data.formType == "" || req.session.data.formType == null) {
    req.session.data.formType = data.notificationtype;
  }

  webHelper.sessionRedirect(
    next,
    res,
    req,
    "/" + req.session.data.formType + "/task-list"
  );
});

router.get("/submitted-notifications", async function (req, res, next) {
  const { data } = await notificationDataUtils.getNotificationsStatus(
    req.session.authContainer.uniqueId
  );

  const mappedData = data
    .filter((item) => item.status != 1 && item.status != 7)
    .map((item) => {
      const { userNotificationReference, notificationReference, formType } =
        JSON.parse(item.notificationdata);
      return {
        userNotificationReference,
        notificationReference,
        notificationtype:
          OPTIONS.notificationTypeMappings[item.notificationtype],
        status: OPTIONS.statusMappings[item.status],
      };
    });

  res.render("submitted-notifications", { data: mappedData });
});

router.get(
  "/view-submitted-notification/:reference",
  async function (req, res, next) {
    const { data } = await notificationDataUtils.getNotification(
      req.params.reference,
      req.session.authContainer.uniqueId
    );

    auditLog(
      req.params.reference,
      req.session.authContainer.uniqueId,
      ACTIONS.READ
    );

    req.session.data = JSON.parse(data.notificationdata);

    // The form type is not updated in the json block
    if (req.session.data.formType == "" || req.session.data.formType == null) {
      req.session.data.formType = data.notificationtype;
    }

    webHelper.sessionRedirect(
      next,
      res,
      req,
      "/" + req.session.data.formType + "/check-your-answers/check-your-answers"
    );
  }
);

router.get("/messages", async function (req, res, next) {
  const { data } = await notificationDataUtils.getNotifications(
    req.session.authContainer.uniqueId
  );

  const notificationsWithNotes = data.filter(
    (item) => JSON.parse(item.notificationdata).notes
  );
  const hasNotes = notificationsWithNotes.length >= 1;
  let messages = [];

  if (hasNotes) {
    notificationsWithNotes.forEach((item) => {
      const notes = JSON.parse(item.notificationdata).notes;
      const notifierNotes = notes.filter(
        (note) => note.recipient === "Notifier"
      );

      messages = [...messages, ...notifierNotes];
    });
  }

  res.render("messages", {
    messages,
    unreadCount: messages.filter((item) => !item.isRead).length,
  });
});

router.get(
  "/message/:reference/:messageId/:action",
  async function (req, res, next) {
    const reference = req.params.reference;
    const messageId = req.params.messageId;
    const isRead = req.params.action;

    const { data } = await notificationDataUtils.getNotification(
      reference,
      req.session.authContainer.uniqueId
    );

    auditLog(
      req.params.reference,
      req.session.authContainer.uniqueId,
      ACTIONS.READ
    );

    const updatedNotificationData = JSON.parse(data.notificationdata);

    const updatedNotes = updatedNotificationData.notes.map((note) => {
      if (note.id === messageId) {
        return {
          ...note,
          isRead: isRead == "true" ? true : false,
        };
      }

      return note;
    });

    updatedNotificationData.notes = updatedNotes;

    req.session.data.notes = updatedNotes;

    webHelper
      .updateMessageStatus(req, res, next, updatedNotificationData, reference)
      .then(() => {
        webHelper.sessionRedirect(next, res, req, "/messages");
      })
      .catch((error) => console.log(error));
  }
);

module.exports = router;
