const {
  DefaultAzureCredential,
  ManagedIdentityCredential,
} = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const { removeProperties } = require("@babel/types");

let isInitialised = false;

let properties = {
  // Service name used in header. Eg: 'Renew your passport'
  serviceName: "Submit a National Security and Investment notification",

  // Run mode for Azure Function
  // Possible serviceRunMode: LOCAL_ENV, DEV_ENV_NSI, DEV_ENV_DEV1, PREPROD_ENV, PROD_ENV
  serviceRunMode: process.env.SERVICERUNMODE || "LOCAL_ENV",

  // Default port that prototype runs on
  port: "3000",

  // Gov.UK notify live key
  govukNotifyKeyLive: "",

  // Gov.UK notify Demo key
  govukNotifyKeyDemo: "",

  // Gov.UK notify Run mode
  govukRunMode: process.env.GOVUKNOTIFYSERVICERUNMODE || "Live",

  publicKey: "",

  privateKey: "",

  azureb2cPolicySignUpSignIn: "",
  azureb2cPolicyResetPassword: "",
  azureb2cPolicyEditProfile: "",
  azureb2cPolicyAuthorityDomain: "",
  insightConnectionString:
    process.env.APPLICATIONINSIGHTS_CONNECTION_STRING ||
    "InstrumentationKey=b843ef7f-b618-47e2-b498-0ba30c9b930f;IngestionEndpoint=https://uksouth-1.in.applicationinsights.azure.com/;LiveEndpoint=https://uksouth.livediagnostics.monitor.azure.com/",

  // NSI Deployment to DEV settings
  azureRedirectURL: "",
  azureLogoutURL: "",
  azureClientID: "",
  azureSecret: "",

  secureCookie: true,

  db: {
    user: "",
    host: "",
    database: "",
    password: "",
    port: "",
    ssl: true,
  },
};

loadConfig = function () {
  return new Promise(function (resolve, reject) {
    if (!isInitialised) {
      const promises = [];
      const keyVaultName = process.env["KEY_VAULT_NAME"];
      const KVUri = "https://" + keyVaultName + ".vault.azure.net";

      const credential = new ManagedIdentityCredential();

      const client = new SecretClient(KVUri, credential);

      //LOCAL_ENV, DEV_ENV_NSI, DEV_ENV_DEV1, PREPROD_ENV, PROD_ENV
      if (properties.serviceRunMode == "LOCAL_ENV") {
        properties.db.user = "postgres";
        properties.db.host = "localhost";
        properties.db.database = "beisnotification";
        properties.db.password = "Pass2020!";
        properties.db.port = "5490";
        properties.db.ssl = false;

        properties.privateKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;

        properties.govukNotifyKeyLive =
          "live_nsi_api_key-0b26c96c-cc76-4151-9cf9-8b4615ecc22f-a90f7657-b0c2-4a00-b048-d3a14adab9df";
        properties.govukNotifyKeyDemo =
          "demoapikey-0b26c96c-cc76-4151-9cf9-8b4615ecc22f-367195ba-6715-4f88-a110-c9304518b877";

        properties.azureRedirectURL = "http://localhost:3000/redirect";
        properties.azureLogoutURL =
          "https://beisnsib2c.b2clogin.com/beisnsib2c.onmicrosoft.com/B2C_1_NSI_Notification_portal/oauth2/v2.0/logout?post_logout_redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F";
        properties.azureSecret = "Ik87Q~BJ3CgKyTP0ixNw2bR1.a5NmZ5Lusf8P";
        properties.azureClientID = "25779987-c21d-4232-ac50-3c146fc859e0";

        properties.azureb2cPolicySignUpSignIn =
          "https://beisnsib2c.b2clogin.com/Beisnsib2c.onmicrosoft.com/B2C_1_NSI_Notification_portal";
        properties.azureb2cPolicyResetPassword =
          "https://beisnsib2c.b2clogin.com/Beisnsib2c.onmicrosoft.com/B2C_1_NSI_Notification_reset";
        properties.azureb2cPolicyEditProfile =
          "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/B2C_1_edit_profile";
        properties.azureb2cPolicyAuthorityDomain = "beisnsib2c.b2clogin.com";

        properties.secureCookie = false;

        properties.insightConnectionString =
          "InstrumentationKey=b843ef7f-b618-47e2-b498-0ba30c9b930f;IngestionEndpoint=https://uksouth-1.in.applicationinsights.azure.com/;LiveEndpoint=https://uksouth.livediagnostics.monitor.azure.com/";

        isInitialised = true;

        resolve(properties);
      } else if (properties.serviceRunMode == "DEV_ENV_NSI") {
        properties.db.user = "Isuadmin@devpostgresql02";
        properties.db.host = "devpostgresql02.postgres.database.azure.com";
        properties.db.database = "beisnotification";
        properties.db.password = "Xw7s3BxpjPmzDZeaWb6C";
        properties.db.port = "5432";
        properties.db.ssl = true;

        properties.privateKey = `-----BEGIN PRIVATE KEY-----
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
x9phq+GpGRqqp+7O9+lD5FSge6N1VdU=
-----END PRIVATE KEY-----`;

        properties.govukNotifyKeyLive =
          "live_nsi_api_key-0b26c96c-cc76-4151-9cf9-8b4615ecc22f-a90f7657-b0c2-4a00-b048-d3a14adab9df";
        properties.govukNotifyKeyDemo =
          "demoapikey-0b26c96c-cc76-4151-9cf9-8b4615ecc22f-367195ba-6715-4f88-a110-c9304518b877";

        properties.azureRedirectURL =
          "https://nsinotification.azurewebsites.net/redirect";
        properties.azureLogoutURL =
          "https://beisnsib2c.b2clogin.com/beisnsib2c.onmicrosoft.com/B2C_1_NSI_Notification_portal/oauth2/v2.0/logout?post_logout_redirect_uri=https%3A%2F%2Fnsinotification.azurewebsites.net%2F";
        properties.azureSecret = "Ik87Q~BJ3CgKyTP0ixNw2bR1.a5NmZ5Lusf8P";
        properties.azureClientID = "25779987-c21d-4232-ac50-3c146fc859e0";

        properties.azureb2cPolicySignUpSignIn =
          "https://beisnsib2c.b2clogin.com/Beisnsib2c.onmicrosoft.com/B2C_1_NSI_Notification_portal";
        properties.azureb2cPolicyResetPassword =
          "https://beisnsib2c.b2clogin.com/Beisnsib2c.onmicrosoft.com/B2C_1_NSI_Notification_reset";
        properties.azureb2cPolicyEditProfile =
          "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/B2C_1_edit_profile";
        properties.azureb2cPolicyAuthorityDomain = "beisnsib2c.b2clogin.com";

        properties.insightConnectionString =
          "InstrumentationKey=b843ef7f-b618-47e2-b498-0ba30c9b930f;IngestionEndpoint=https://uksouth-1.in.applicationinsights.azure.com/;LiveEndpoint=https://uksouth.livediagnostics.monitor.azure.com/";

        properties.secureCookie = true;

        isInitialised = true;

        resolve(properties);
      } else if (properties.serviceRunMode == "DEV_ENV_DEV1") {
        properties.db.user = "isuadmin@devpostgresql01";
        properties.db.host = "devpostgresql01.postgres.database.azure.com";
        properties.db.database = "beisnotification";
        properties.db.password = "Xw7s3BxpjPmzDZeaWb6C";
        properties.db.port = "5432";
        properties.db.ssl = true;

        properties.privateKey = `-----BEGIN PRIVATE KEY-----
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
x9phq+GpGRqqp+7O9+lD5FSge6N1VdU=
-----END PRIVATE KEY-----`;

        properties.govukNotifyKeyLive =
          "live_nsi_api_key-0b26c96c-cc76-4151-9cf9-8b4615ecc22f-a90f7657-b0c2-4a00-b048-d3a14adab9df";
        properties.govukNotifyKeyDemo =
          "demoapikey-0b26c96c-cc76-4151-9cf9-8b4615ecc22f-367195ba-6715-4f88-a110-c9304518b877";

        properties.azureRedirectURL =
          "https://notificationdev1.azurewebsites.net/redirect";
        properties.azureLogoutURL =
          "https://beisnsib2c.b2clogin.com/beisnsib2c.onmicrosoft.com/B2C_1_NSI_Notification_portal/oauth2/v2.0/logout?post_logout_redirect_uri=https%3A%2F%2Fnotificationdev1.azurewebsites.net%2F";
        properties.azureSecret = "Ik87Q~BJ3CgKyTP0ixNw2bR1.a5NmZ5Lusf8P";
        properties.azureClientID = "25779987-c21d-4232-ac50-3c146fc859e0";

        properties.azureb2cPolicySignUpSignIn =
          "https://beisnsib2c.b2clogin.com/Beisnsib2c.onmicrosoft.com/B2C_1_NSI_Notification_portal";
        properties.azureb2cPolicyResetPassword =
          "https://beisnsib2c.b2clogin.com/Beisnsib2c.onmicrosoft.com/B2C_1_NSI_Notification_reset";
        properties.azureb2cPolicyEditProfile =
          "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/B2C_1_edit_profile";
        properties.azureb2cPolicyAuthorityDomain = "beisnsib2c.b2clogin.com";

        properties.insightConnectionString =
          "InstrumentationKey=b843ef7f-b618-47e2-b498-0ba30c9b930f;IngestionEndpoint=https://uksouth-1.in.applicationinsights.azure.com/;LiveEndpoint=https://uksouth.livediagnostics.monitor.azure.com/";

        properties.secureCookie = true;

        isInitialised = true;

        resolve(properties);
      } else {
        promises.push(client.getSecret("DBUSER"));
        promises.push(client.getSecret("DBHOST"));
        promises.push(client.getSecret("DBDATABASE"));
        promises.push(client.getSecret("DBPASSWORD"));
        promises.push(client.getSecret("GOVUKNOTIFYSERVICELIVE"));
        promises.push(client.getSecret("GOVUKNOTIFYSERVICEDEMO"));
        promises.push(client.getSecret("AZURESECRET"));
        promises.push(client.getSecret("AZURECLIENTID"));
        promises.push(client.getSecret("PRIVATEKEYENCODED"));

        // set the env settings
        properties.azureRedirectURL = process.env.AZUREREDIRECTURL;
        properties.azureLogoutURL = process.env.AZURELOGOUTURL;
        properties.azureb2cPolicySignUpSignIn =
          process.env.AZUREB2CPOLICYSIGNUPSIGNIN;
        properties.azureb2cPolicyResetPassword =
          process.env.AZUREB2CPOLICYRESETPASSWORD;
        properties.azureb2cPolicyEditProfile =
          process.env.AZUREB2CPOLICYEDITPROFILE;
        properties.azureb2cPolicyAuthorityDomain =
          process.env.AZUREB2CPOLICYAUTHORITYDOMAIN;

        properties.secureCookie = true;

        Promise.all(promises)
          .then((results) => {
            properties.db.user = results[0].value;
            properties.db.host = results[1].value;
            properties.db.database = results[2].value;
            properties.db.password = results[3].value;

            properties.govukNotifyKeyLive = results[4].value;
            properties.govukNotifyKeyDemo = results[5].value;

            properties.azureSecret = results[6].value;
            properties.azureClientID = results[7].value;
            properties.privateKey = Buffer.from(
              results[8].value,
              "base64"
            ).toString();

            isInitialised = true;

            resolve(properties);
          })
          .catch(function (err) {
            console.error(err);
            reject(err);
          });
      }
    }
  });
};

module.exports = {
  loadConfig,
  properties,
};
