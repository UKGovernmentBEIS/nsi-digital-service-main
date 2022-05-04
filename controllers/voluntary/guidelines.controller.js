var webHelper = require("../../localmodules/webHelpers");
/* ************************* GUIDELINES ***************************** */

/* Handles the get for guidelines */
exports.getGuidelines = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  res.render("voluntary/guidelines", { data: req.session.data });
};

/* Handles the post for guidelines */
exports.getGuidelinesPost = async function (req, res, next) {
  //log.Debug("Starting get notification activities", "notifications.controller", "GET:getNotificationsList");

  // sort out the check box
  if (
    req.body.guidelinesAccepted == null ||
    req.body.guidelinesAccepted == ""
  ) {
    req.session.data["guidelinesAccepted"] = "";
  }

  webHelper.sessionRedirect(next, res, req, "/voluntary/task-list");
};
