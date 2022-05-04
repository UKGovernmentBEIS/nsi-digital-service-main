const msal = require("@azure/msal-node");
const config = require("../config");
const policies = require("../authentication/policies");

/**
 * The MSAL.js library allows you to pass your custom state as state parameter in the Request object
 * By default, MSAL.js passes a randomly generated unique state parameter value in the authentication requests.
 * The state parameter can also be used to encode information of the app's state before redirect.
 * You can pass the user's state in the app, such as the page or view they were on, as input to this parameter.
 * For more information, visit: https://docs.microsoft.com/azure/active-directory/develop/msal-js-pass-custom-state-authentication-request
 */
const APP_STATES = {
  LOGIN: "login",
  CALL_API: "call_api",
  PASSWORD_RESET: "password_reset",
};

/* Scopes definition */
const SCOPES = {
  oidc: ["openid", "profile"],
};

const authConfig = {
  authority: policies.authorities.signUpSignIn.authority,
  azureB2CClientId: config.properties.azureClientID,
  azureB2CClientSecret: config.properties.azureSecret,
  azureB2CRedirectUrl: config.properties.azureRedirectURL,
  azureB2CKnownAuthorities: policies.authorityDomain,
  azureb2cLogoutURL: config.properties.azureLogoutURL,
};

/**
 * Confidential Client Application Configuration
 */
const confidentialClientConfig = {
  auth: {
    clientId: authConfig.azureB2CClientId,
    authority: authConfig.authority,
    clientSecret: authConfig.azureB2CClientSecret,
    knownAuthorities: [authConfig.azureB2CKnownAuthorities],
    redirectUri: authConfig.azureB2CRedirectUrl,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

// Create msal application object
const cca = new msal.ConfidentialClientApplication(confidentialClientConfig);

async function authenticateRequest(req, res, next) {
  if (
    req.path != "/" &&
    req.path != "/login" &&
    req.path != "/logoutperm" &&
    req.path != "/redirect" &&
    req.path != "/help-signin" &&
    req.path != "/terms-and-conditions" &&
    req.path != "/privacy" &&
    req.path != "/cookies" &&
    req.path != "/accessibility" &&
    req.path != "/help" &&
    !req.path.startsWith("/public") &&
    !req.path.startsWith("/assets") &&
    !req.path.startsWith("/govuk") &&
    !req.path.startsWith("/favicon") &&
    req.path != "/start" &&
    !req.path.startsWith("/node_modules")
  ) {
    if (!req.session.authContainer) {
      res.redirect("/logoutperm");
    } else {
      // expiry check
      var utcSeconds = req.session.authContainer.idTokenClaims.exp;
      var expiryDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
      expiryDate.setUTCSeconds(utcSeconds);
      expiryDate.setTime(expiryDate.getTime() - 300000); //60,000 ms per minute * 5 = 300,000 ms
      var nowDate = new Date();

      // perform a safety check to ensure we cannot cross accounts
      var accountList = await cca.getTokenCache().getAllAccounts();
      var specificAccount = null;

      for (var index = 0; index < accountList.length; index++) {
        if (
          req.session.authContainer.uniqueId ==
          accountList[index].localAccountId
        ) {
          // we have found it
          specificAccount = accountList[index];
          break;
        }
      }

      // let's log out as we are in an unknown state
      if (specificAccount == null) {
        res.redirect("/logoutperm");
        return;
      }

      // are we five minutes or more away from the expiry?
      if (nowDate > expiryDate) {
        var accounts = await cca.getTokenCache().getAllAccounts();
        var account = null;

        for (var index = 0; index < accounts.length; index++) {
          if (
            req.session.authContainer.uniqueId == accounts[index].localAccountId
          ) {
            // we have found it
            account = accounts[index];
            break;
          }
        }

        // let's log out as we are in an unknown state
        if (account == null) {
          res.redirect("/logoutperm");
          return;
        }

        // Build silent request
        const silentRequest = {
          account: account,
          scopes: SCOPES.oidc,
        };

        // Acquire Token Silently to be used in Resource API calll
        cca
          .acquireTokenSilent(silentRequest)
          .then((response) => {
            // Handle successful resource API response
            console.log("Token obtained successfully");

            // final check
            if (response.uniqueId == req.session.authContainer.uniqueId) {
              req.session.authContainer = response;
            } else {
              // we don't trust this so log out
              res.redirect("/logoutperm");
              return;
            }

            next();
          })
          .catch((error) => {
            // Handle resource API request error
            console.log("Could not obtain a new token");

            try {
              if (account != null) {
                cca.getTokenCache().removeAccount(account);
              }
            } catch (error) {
              console.log("Account not found.");
            }

            res.redirect("/logoutperm");
          });
      } else {
        next();
      }
    }
  } else {
    next();
  }
}

module.exports = {
  authenticateRequest,
  cca,
  authConfig,
  confidentialClientConfig,
  SCOPES,
  APP_STATES,
};
