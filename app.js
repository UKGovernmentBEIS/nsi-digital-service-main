const config = require("./config.js");
let appInsights = require("applicationinsights");
appInsights
  .setup(config.properties.insightConnectionString)
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true, false)
  .setUseDiskRetryCaching(true)
  .setAutoCollectPreAggregatedMetrics(true)
  .setSendLiveMetrics(true)
  .setAutoCollectHeartbeat(true)
  .setInternalLogging(true, true)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
  .setWebSnippetInjection(true)
  .start();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const nunjucks = require("nunjucks");
const sessionInMemory = require("express-session");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");

// Local dependencie
const constantsMW = require("./middleware/constants");

// session database store handler
const pgSession = require("connect-pg-simple")(sessionInMemory);
const contentSecurityPolicy = require("helmet-csp");
const nocache = require("nocache");

var app = express();

config
  .loadConfig()
  .then(function (data) {
    const auth = require("./middleware/authmodule");
    const utils = require("./localmodules/utils.js");
    const webHelper = require("./localmodules/webHelpers");
    var dbConnector = require("./localmodules/dbConnect");
    const policies = require("./authentication/policies");
    var crypto = require("crypto");

    var indexRouter = require("./routes/index");

    /* MANDATORY NOTIFICATION */
    var mandatoryIndexRouter = require("./routes/mandatory/mandatoryIndexRouter");
    var mandatoryGuidelinesRouter = require("./routes/mandatory/guidelinesRouter");
    var mandatoryQuestion1Router = require("./routes/mandatory/question1router");
    var mandatoryQuestion2Router = require("./routes/mandatory/question2router");
    var mandatoryQuestion3Router = require("./routes/mandatory/question3router");
    var mandatoryQuestion4Router = require("./routes/mandatory/question4router");
    var mandatoryQuestion5Router = require("./routes/mandatory/question5router");
    var mandatoryQuestion6Router = require("./routes/mandatory/question6router");
    var mandatoryQuestion7Router = require("./routes/mandatory/question7router");
    var mandatoryQuestion8Router = require("./routes/mandatory/question8router");
    var mandatoryQuestion9Router = require("./routes/mandatory/question9Router");
    var mandatoryCheckYourAnswersRouter = require("./routes/mandatory/checkYourAnswersRouter");
    var mandatoryMultiNotifierRouter = require("./routes/mandatory/mandatoryMultiNotifierRouter");

    /* RETROSPECTIVE NOTIFICATION */
    var retrospectiveIndexRouter = require("./routes/retrospective/retrospectiveIndexRouter");
    var retrospectiveGuidelinesRouter = require("./routes/retrospective/guidelinesRouter");
    var retrospectiveQuestion1Router = require("./routes/retrospective/question1router");
    var retrospectiveQuestion2Router = require("./routes/retrospective/question2router");
    var retrospectiveQuestion3Router = require("./routes/retrospective/question3router");
    var retrospectiveQuestion4Router = require("./routes/retrospective/question4router");
    var retrospectiveQuestion5Router = require("./routes/retrospective/question5router");
    var retrospectiveQuestion6Router = require("./routes/retrospective/question6router");
    var retrospectiveQuestion7Router = require("./routes/retrospective/question7router");
    var retrospectiveQuestion8Router = require("./routes/retrospective/question8router");
    var retrospectiveQuestion9Router = require("./routes/retrospective/question9Router");
    var retrospectiveCheckYourAnswersRouter = require("./routes/retrospective/checkYourAnswersRouter");
    var retrospectiveMultiNotifierRouter = require("./routes/retrospective/retrospectiveMultiNotifierRouter");

    /* VOLUNTARY NOTIFICATION */
    var voluntaryIndexRouter = require("./routes/voluntary/voluntaryIndexRouter");
    var voluntaryGuidelinesRouter = require("./routes/voluntary/guidelinesRouter");
    var voluntaryQuestion1Router = require("./routes/voluntary/question1router");
    var voluntaryQuestion2Router = require("./routes/voluntary/question2router");
    var voluntaryQuestion3Router = require("./routes/voluntary/question3router");
    var voluntaryQuestion4Router = require("./routes/voluntary/question4router");
    var voluntaryQuestion5Router = require("./routes/voluntary/question5router");
    var voluntaryQuestion6Router = require("./routes/voluntary/question6router");
    var voluntaryQuestion7Router = require("./routes/voluntary/question7router");
    var voluntaryQuestion8Router = require("./routes/voluntary/question8router");
    var voluntaryQuestion9Router = require("./routes/voluntary/question9Router");
    var voluntaryCheckYourAnswersRouter = require("./routes/voluntary/checkYourAnswersRouter");
    var voluntaryMultiNotifierRouter = require("./routes/voluntary/voluntaryMultiNotifierRouter");

    var prototypesRouter = require("./routes/prototypesRouter");

    /* ********************************************************************** SECURITY HEADERS */
    app.use(helmet());
    app.use(nocache());

    app.use((req, res, next) => {
      res.setHeader(
        "Permissions-Policy",
        "accelerometer=(), autoplay=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(self), usb=(), web-share=(), xr-spatial-tracking=()"
      );
      next();
    });

    function createNonce(req, res) {
      if (!req.path.startsWith("/public") && !req.path.startsWith("/assets")) {
        res.locals.cspNonce = crypto.randomBytes(16).toString("hex");
      }
      return res.locals.cspNonce;
    }

    app.use(
      contentSecurityPolicy({
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: [
            "https://js.monitor.azure.com/ https://uksouth-1.in.applicationinsights.azure.com/",
          ],
          scriptSrc: [
            "'self'",
            (req, res) => `'nonce-${createNonce(req, res)}'`,
            "https://js.monitor.azure.com/ https://uksouth-1.in.applicationinsights.azure.com/",
            "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='",
          ],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
        reportOnly: false,
      })
    );
    /* ********************************************************************** SECURITY HEADERS */

    // Set up App
    var nunjucksConfig = {
      autoescape: true,
      noCache: true,
      watch: false,
    };

    // use the file upload with limits
    app.use(
      fileUpload({
        limits: { fileSize: 10 * 1024 * 1024 },
      })
    );

    nunjucksConfig.express = app;

    var nunjucksAppEnv = nunjucks.configure(
      ["views", "node_modules/govuk-frontend/"],
      nunjucksConfig
    );

    app.set("view engine", "html");

    app.use(logger("dev"));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(constantsMW);
    //app.use(express.static(path.join(__dirname, 'public')));
    app.use("/public", express.static(path.join(__dirname, "/public")));
    app.use("/assets", express.static(path.join(__dirname, "/assets")));

    // Session uses service name to avoid clashes with other prototypes
    const sessionName =
      "govuk-frontend-kit-" +
      Buffer.from(config.properties.serviceName, "utf8").toString("hex");

    app.use(
      sessionInMemory({
        store: new pgSession({
          pgPromise: dbConnector.dbConn,
        }),
        secret: "dsdcksdmclksdclkm4l3l4kml3k4mrlk34mrl3k4r",
        resave: false,
        cookie: {
          maxAge: 30 * 60 * 1000, // 30 minutes : 30 * 24 * 60 * 60 * 1000, // 30 days
          secret: config.properties.secureCookie,
        },
      })
    );

    /* ********************************************************************** AUTHENTICATION */
    /* authentication middleware for checking the authenticated routes */
    app.use(auth.authenticateRequest);

    /* GET the logout route */
    app.get("/logoutperm", function (req, res) {
      req.session.destroy(function () {
        console.log("user logged out.");
        res.redirect(auth.authConfig.azureb2cLogoutURL);
      });
    });

    // Initiates auth code grant for login
    app.get("/login", (req, res) => {
      if (!req.session.authCodeRequest) {
        req.session.authCodeRequest = {};
        req.session.authCodeRequest.redirectUri =
          auth.confidentialClientConfig.auth.redirectUri;
      }
      if (!req.session.tokenRequest) {
        req.session.tokenRequest = {};
        req.session.tokenRequest.redirectUri =
          auth.confidentialClientConfig.auth.redirectUri;
      }
      if (
        req.session.authCodeRequest.state === auth.APP_STATES.PASSWORD_RESET
      ) {
        // if coming for password reset, set the authority to password reset
        getAuthCode(
          policies.authorities.resetPassword.authority,
          [],
          auth.APP_STATES.PASSWORD_RESET,
          res,
          req
        );
        req.session.authCodeRequest.state = auth.APP_STATES.LOGIN;
      } else {
        // else, LOGIN as usual
        //getAuthCode(policies.authorities.signUpSignIn.authority, SCOPES.oidc, state, res);
        getAuthCode(
          policies.authorities.signUpSignIn.authority,
          auth.SCOPES.oidc,
          auth.APP_STATES.LOGIN,
          res,
          req
        );
      }
    });

    // Second leg of auth code grant
    app.get("/redirect", (req, res, next) => {
      // determine where the request comes from
      if (req.query.state === auth.APP_STATES.LOGIN) {
        // prepare the request for authentication
        req.session.tokenRequest.scopes = auth.SCOPES.oidc;
        req.session.tokenRequest.code = req.query.code;

        auth.cca
          .acquireTokenByCode(req.session.tokenRequest)
          .then((response) => {
            const { state } = req.query;
            req.session.authContainer = response;
            //res.redirect('/dashboard');
            webHelper.sessionRedirect(next, res, req, "/dashboard");
          })
          .catch((error) => {
            if (req.query.error) {
              /**
               * When the user selects 'forgot my password' on the sign-in page, B2C service will throw an error.
               * We are to catch this error and redirect the user to LOGIN again with the resetPassword authority.
               * For more information, visit: https://docs.microsoft.com/azure/active-directory-b2c/user-flow-overview#linking-user-flows
               */
              if (
                JSON.stringify(req.query.error_description).includes(
                  "AADB2C90118"
                )
              ) {
                req.session.authCodeRequest.authority =
                  policies.authorities.resetPassword;
                req.session.authCodeRequest.state =
                  auth.APP_STATES.PASSWORD_RESET;
                return res.redirect("/login");
              }
            }
            res.status(500).send(error);
          });
      } else if (req.query.state === auth.APP_STATES.CALL_API) {
      } else if (req.query.state === auth.APP_STATES.PASSWORD_RESET) {
        // once the password is reset, redirect the user to LOGIN again with the new password
        req.session.authCodeRequest.state = auth.APP_STATES.LOGIN;
        res.redirect("/login");
      } else {
        res.status(500).send("Unknown");
      }
    });

    /**
     * Request Configuration
     * We manipulate these two request objects below
     * to acquire a token with the appropriate claims.
     */
    /*const authCodeRequest = {
      redirectUri: auth.confidentialClientConfig.auth.redirectUri,
    };

    const tokenRequest = {
      redirectUri: auth.confidentialClientConfig.auth.redirectUri,
    };
*/
    // Initialize MSAL Node
    //const cca = new msal.ConfidentialClientApplication(confidentialClientConfig);

    // Store accessToken in memory
    app.locals.accessToken = null;

    /**
     * This method is used to generate an auth code request
     * @param {string} authority: the authority to request the auth code from
     * @param {array} scopes: scopes to request the auth code for
     * @param {string} state: state of the application
     * @param {object} res: express middleware response object
     */
    const getAuthCode = (authority, scopes, state, res, req) => {
      // prepare the request
      req.session.authCodeRequest.authority = authority;
      req.session.authCodeRequest.scopes = scopes;
      req.session.authCodeRequest.state = state;

      req.session.tokenRequest.authority = authority;

      // request an authorization code to exchange for a token
      return auth.cca
        .getAuthCodeUrl(req.session.authCodeRequest)
        .then((response) => {
          res.redirect(response);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    };
    /* ********************************************************************** */

    app.use(utils.autoStoreData);

    app.use("/", indexRouter);
    app.use("/mandatory/", mandatoryIndexRouter);
    app.use("/mandatory/guidelines/", mandatoryGuidelinesRouter);
    app.use("/mandatory/question1/", mandatoryQuestion1Router);
    app.use("/mandatory/question2/", mandatoryQuestion2Router);
    app.use("/mandatory/question3/", mandatoryQuestion3Router);
    app.use("/mandatory/question4/", mandatoryQuestion4Router);
    app.use("/mandatory/question5/", mandatoryQuestion5Router);
    app.use("/mandatory/question6/", mandatoryQuestion6Router);
    app.use("/mandatory/question7/", mandatoryQuestion7Router);
    app.use("/mandatory/question8/", mandatoryQuestion8Router);
    app.use("/mandatory/question9/", mandatoryQuestion9Router);
    app.use("/mandatory/check-your-answers/", mandatoryCheckYourAnswersRouter);
    app.use("/mandatory/multinotifier/", mandatoryMultiNotifierRouter);

    app.use("/retrospective/", retrospectiveIndexRouter);
    app.use("/retrospective/guidelines/", retrospectiveGuidelinesRouter);
    app.use("/retrospective/question1/", retrospectiveQuestion1Router);
    app.use("/retrospective/question2/", retrospectiveQuestion2Router);
    app.use("/retrospective/question3/", retrospectiveQuestion3Router);
    app.use("/retrospective/question4/", retrospectiveQuestion4Router);
    app.use("/retrospective/question5/", retrospectiveQuestion5Router);
    app.use("/retrospective/question6/", retrospectiveQuestion6Router);
    app.use("/retrospective/question7/", retrospectiveQuestion7Router);
    app.use("/retrospective/question8/", retrospectiveQuestion8Router);
    app.use("/retrospective/question9/", retrospectiveQuestion9Router);
    app.use(
      "/retrospective/check-your-answers/",
      retrospectiveCheckYourAnswersRouter
    );
    app.use("/retrospective/multinotifier/", retrospectiveMultiNotifierRouter);

    app.use("/voluntary/", voluntaryIndexRouter);
    app.use("/voluntary/guidelines/", voluntaryGuidelinesRouter);
    app.use("/voluntary/question1/", voluntaryQuestion1Router);
    app.use("/voluntary/question2/", voluntaryQuestion2Router);
    app.use("/voluntary/question3/", voluntaryQuestion3Router);
    app.use("/voluntary/question4/", voluntaryQuestion4Router);
    app.use("/voluntary/question5/", voluntaryQuestion5Router);
    app.use("/voluntary/question6/", voluntaryQuestion6Router);
    app.use("/voluntary/question7/", voluntaryQuestion7Router);
    app.use("/voluntary/question8/", voluntaryQuestion8Router);
    app.use("/voluntary/question9/", voluntaryQuestion9Router);
    app.use("/voluntary/check-your-answers/", voluntaryCheckYourAnswersRouter);
    app.use("/voluntary/multinotifier/", voluntaryMultiNotifierRouter);

    // Used for content design prototyping
    app.use("/prototypes/", prototypesRouter);

    // Add variables that are available in all views
    app.locals.serviceName = config.properties.serviceName;
    app.locals.insightConnectionString =
      config.properties.insightConnectionString;

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      let formName = "";
      const forms = ["mandatory", "retrospective", "voluntary"];

      forms.forEach((form) => {
        if (req.path.includes(form)) {
          formName = form;
        }
      });

      // render the error page
      res.status(err.status || 500);
      res.render("error", { message: err.message, formName });
    });

    // Prevent search indexing
    app.use(function (req, res, next) {
      // Setting headers stops pages being indexed even if indexed pages link to them.
      res.setHeader("X-Robots-Tag", "noindex");
      next();
    });

    app.get("/robots.txt", function (req, res) {
      res.type("text/plain");
      res.send("User-agent: *\nDisallow: /");
    });
  })
  .catch(function (error) {
    console.log("Error: " + error);
  });

module.exports = app;
