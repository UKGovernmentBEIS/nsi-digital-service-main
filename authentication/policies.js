const config = require("../config");

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_NSI_Notification_portal",
    resetPassword: "B2C_1_NSI_Notification_reset",
    editProfile: "B2C_1_edit_profile", // not done
  },
  authorities: {
    signUpSignIn: {
      authority: config.properties.azureb2cPolicySignUpSignIn,
    },
    resetPassword: {
      authority: config.properties.azureb2cPolicyResetPassword,
    },
    editProfile: {
      authority: config.properties.azureb2cPolicyEditProfile,
    },
  },
  authorityDomain: config.properties.azureb2cPolicyAuthorityDomain,
};

module.exports = b2cPolicies;
