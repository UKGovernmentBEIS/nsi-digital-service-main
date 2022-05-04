var validatorHelpers = require("./validationHelpers");

const messages = {
  q10WhichType: "Select the type of notifier",
  q1iNotifyingPartyOrRepresentative:
    "Select acquirer or representative of acquirer",
  q1iiNotifyingPartyName: "Enter the notifier’s name",
  q1iiNotifyingPartyBusinessaddress: "Enter the notifier's business address",
  q1iiNotifyingPartyIndividual: "Enter your full name",
  q1iiNotifyingPartyPosition: "Enter your position",
  q1iiNotifyingPartyEmail: "Enter your email",
  q1iiNotifyingPartyTelephone: "Enter your telephone number",
  q1iiAuthorised: "Select if you are authorised to receive correspondence",
  q1iiAuthorisedName: "Enter the full name of the authorised person",
  q1iiAuthorisedPosition: "Enter the position of the authorised person",
  q1iiAuthorisedEmail: "Enter the email of the authorised person",
  q1iiAuthorisedTelephone:
    "Enter the telephone number of the authorised person",
  q1iiiNotifyingPartyName: "Enter the notifier’s name",
  q1iiiNotifyingPartyIndividual:
    "Enter the name of the person within notifier we can contact if needed",
  q1iiiNotifyingPartyEmail:
    "Enter the email of the person within notifier we can contact if needed",
  q1iiiNotifyingPartyPhone:
    "Enter the telephone number of the person within notifier we can contact if needed",
  q1iiiRepresentatives: "Enter the name of the representative",
  q1iiiLeadRepresentatives: "Enter the name of the lead representatives",
  q1iiiAuthorisedIndividual:
    "Enter the full name of the authorised individual from representative",
  q1iiiRepresentativeEmail:
    "Enter the email of the authorised individual from representative",
  q1iiiRepresentativePhone:
    "Enter the telephone number of the authorised individual from representative",
  q1iiiRelationship: "Enter the representative’s relationship to the notifier",
  q1iiiAuthorised:
    "Select if this individual is authorised to accept correspondence",
  q1ivAdditionalAcquirer: "Select if there is more than one acquirer",
  q1ivaMultinotifiername: "Enter the name of the acquirer",
  q1ivaMultinotifierPercentage:
    "Enter the expected or proposed percentage of ownership",
  q1ivaMultinotifierAddress: "Enter the business address of the acquirer",
  q1ivaMultinotifierPhone: "Enter the telephone number of the acquirer",
  q1ivaMultinotifierEmail:
    "Enter the email address of the authorised individual",
  q2iSubmitTwelve:
    "Select if a notification has been submitted to an overseas investment screening regime in the last 12 months",
  q2iiAdditionalInfo: "",
  q2iCaseReference:
    "Enter a description of the overseas investment screening regimes",
  q30Reason: "",
  q3iSector: "Select all relevant sectors",
  q3iaAcquisitionInContemplationOrTakenPlace:
    "Select if the stage of the acquisition",
  q3iiQualifyingAssetOrQualifyingEntity:
    "Select if you are notifying about an entity or asset",
  question32aQualifyingEntity:
    "Enter a description of the acquisition and voting rights",
  question32aQualifyingEntityDetails:
    "Enter a description of the nature right or interest being acquired and the level of control it provides",
  question3iiiTriggerEvents: "There is a problem Select all relevant triggers",
  question3iiiDetailsPercentageShareDetails:
    "There is a problem Enter additional information",
  question3iiiDetailsPercentageVotingDetails:
    "There is a problem Enter additional information",
  question3iiiDetailsPreventPassageDetails:
    "There is a problem Enter additional information",
  question3iiiDetailsEnableInfluenceDetails:
    "There is a problem Enter additional information",
  question3ivMaterialInfluence:
    "Enter a description of the acquisition and how it enables material influence",
  question3ivMaterialInfluenceDetails:
    "Select if voting rights enable the acquirer to secure or prevent a class of resolution",
  question3vAcquisition: "",
  question3vAcquisitionDetails:
    "Enter a description of the acquisition and voting rights",
  q4iaquisitionDate:
    "Enter a valid date for when the acquisition is expected to take place",
  q4iAdditionalInfo: "Enter additional information",
  q4iiRegulatoryApproval: "Select if regulatory approval is required",
  q4ibRegulatorName: "Enter the name of the regulator",
  q4ibRegulatoryApproval: "Enter a valid expected date of regulatory approval",
  q4iiiOtherKeyDates: "Select if there are any other relevant key dates",
  q4icKeyDate: "Enter a valid key date",
  question4icShortDescription:
    "Enter a description of why the date is relevant",
  q5iNameQualifyingEntity: "Enter the name of the qualifying entity",
  q5iNameIndividualQualifyingEntity:
    "Enter the full name of the qualifying entity contact person",
  q5iEmail: "Enter the email of the qualifying entity contact person",
  q5iTelephone:
    "Enter the telephone number of the qualifying entity contact person",
  q5iCompaniesHouse: "Enter the Companies House registration number",
  q5iSIC: "Enter the SIC code",
  q5iCountry: "Enter the country of incorporation",
  q5iRegistration: "Enter the registration details",
  q5iActivities: "Select if entity carries out activities in UK",
  q5iActivitiesDescription:
    "Enter a description of the qualifying entity’s UK activities",
  q5iBusinessAddress: "Enter the business address of the qualifying entity",
  q5iWebsite: "Enter a valid website of the qualifying entity",
  q5iDescription:
    "Enter a description of the qualifying entity's UK activities",
  q5iiIsAuthorised:
    "Select if the entity is authorised to receive or hold classified information",
  q5iiaHighestClassification: "Select a classification level",
  q5iiaDepartment: "Select a government department or organisation",
  q5iiaOther:
    "Enter name of other government department, agency or public body",
  q5iiaDescription: "Enter a description of the information received or held",
  q5iiaAdditionalInfo: "Enter additional information",
  q5iiiIsLicenseRequired:
    "Select if the qualifying entity holds any UK licences",
  q5iiiaLicence: "Enter the name of a licence",
  q5iiiaIsApplicationSuccessful: "Select if the application was successful",
  q5iiiaIssuer: "Enter the name of the issuer or regulator",
  q5iiiaIssueDate: "Enter a valid date issued",
  q5ivIsDualUse: "Select if the entity holds or owns any dual use items",
  q5ivaItemName: "Enter the name of the item",
  q5ivaDescription: "Enter a description of the item",
  q5vIsPartyTo:
    "Select if the entity has supply relationships with the UK government",
  q5vaSupplyRelationship: "Enter a description of the supply relationship",
  q5vaArea: "Select an area",
  q5vaDepartment: "Enter a UK government department, agency or public body",
  q5vaEntity: "Enter a commercial entity or organisation",
  q5viIsFundedResearch:
    "Select if the entity had research and development funded by the UK government ",
  q5viaName: "Enter the name of the research and development project",
  q5viaArea: "Select an area",
  q5viaDescription: "Enter a description of the research and development",
  q5viaDepartment:
    "Enter a UK government department, agency or public body that funded the research and development",
  q5viaEntity:
    "Enter a commercial entities or organisations who funded the research and development",
  q5viiIsNSVSC: "Select if personnel require NSV security clearance",
  q5viiaLevel: "Enter the level of NSV security clearance",
  q5viiaHowMany:
    "Enter the number of personnel who have this level of clearance",
  q6iPreAcquisitionChartFileName: "Upload a pre-acquisition structure chart",
  q6iiPostAcquisitionChartFileName: "Upload a post-acquisition structure chart",
  q6iiiNonUKGovt:
    "Select if a non-UK government has a role in the entity’s operation or decision making",
  q6iiiNonUKGovernmentName:
    "Enter the name of the non-UK government or representative",
  q6iiiGovernmentInterest: "Enter a description of the role and interests",
  q8iControllingOwnershipFileName: "Upload an ownership chart",
  q8iiNameOfBoardMember: "Enter the name of the board member or equivalent",
  q8iiDateOfBirth: "Enter a valid date of birth",
  q8iiPositionHeld: "Enter the position held",
  q8iiClassifiedPolitically:
    "Select if the board member is classified as a PEP",
  q7iNameOfAcquirer: "Enter the name of the acquirer",
  q7iCountryOfOrigin: "Enter the country of incorporation",
  q7iEntityOrIndividual:
    "Select if the acquiring party is an entity or an individual",
  q7iCompaniesHouseReference: "Enter the Companies House registration number",
  q7iSICReference: "Enter the SIC code",
  q7iRegistrationDetailsCountryOfCorporation:
    "Enter the country of incorporation",
  q7iIncorporatedOutsideUk: "Select if the entity was incorporated in the UK",
  q7iDescriptionProductActivities:
    "Enter a description of the products and services",
  q7iiNonUKGovt:
    "Select if a non-UK government has share ownership or voting rights",
  q7iiNameOfNonUKGoverment: "Enter the name of the non-UK government",
  q7iiNameOfPersonActingNonUKGoverment:
    "Enter the name of the person or entity acting on behalf of non-UK government",
  q7iiShareOwnershipVotingRights:
    "Enter the percentage of share ownership or voting rights",
  q7iiiNonUKGovt:
    "Select if a non-UK government has a role in the operation or decision making",
  q7iiiNameOfNonUKGoverment: "Enter the name of the non-UK government",
  q7iiiBriefInterestDescription: "Enter a description of the role",
  q7ivContractualArrangements:
    "Select if there will be contractual arrangements about shareholding or voting rights",
  q7ivContractualArrangementsSummary:
    "Enter a summary of the contractual arrangements",
  q5altiNameOfAsset: "Enter the full name of the asset",
  q5altiAssetType: "Select the asset type",
  q5altiAddress: "Enter the address of qualifying asset",
  q5altiDescription: "Enter a description of the qualifying asset",
  q5altiiIsAuthorised:
    "Select if the qualifying asset is authorised to receive or hold classified information",
  q5altiiaHighestClassification: "Select a classification level",
  q5altiiaDepartment: "Select a government department or organisation",
  q5altiiaOther:
    "Enter name of other government department, agency or public body",
  q5altiiaDescription:
    "Enter a description of the information received or held",
  q5altiiaAdditionalInfo: "Enter additional information",
  q5altiiiIsLicenseRequired:
    "Select if the qualifying asset holds any UK licences",
  q5altiiiaLicence: "Enter the name of a licence",
  q5altiiiaIsApplicationSuccessful: "Select if the application was successful",
  q5altiiiaIssuer: "Enter the name of the issuer or regulator",
  q5altiiiaIssueDate: "Enter a valid date issued",
  q5altivIsDualUse: "Select if the asset holds or owns any dual use items",
  q5altivaItemName: "Enter the name of the item",
  q5altivaDescription: "Enter a description of the item",
  q5altvData: "Select if the qualifying asset is used to gather or hold data",
  q5altvDescription: "Enter a description of the data gathered or held",
  q5altviData:
    "Select if the qualifying asset holds any standards, accreditations or certifications",
  q5altviName:
    "Enter the names of standards, accreditation or certifications held",
  q6iiiContractualArrangementAsset:
    "Select if there are any contractual arrangements in place",
  q6vAdditionalInformation: "Enter a summary of the contractual arrangements",
  q2iCaseReferenceDuplicate: "Enter a unique case referece",
};

/* Checks the state of the validated output */
function checkState(validationOutput) {
  // find out if there are any messages.  This value will always be at lease 1 for true or false
  var messageLength = Object.keys(validationOutput).length;

  if (validationOutput.isValid === false) {
    return "Not started";
  } else if (validationOutput.isValid === true) {
    return "Completed";
  } else {
    return "In progress";
  }
}

/* sort the results into one final status */
function resultRundown(results) {
  var completed = 0;
  var inProgress = 0;
  var notStarted = 0;

  for (var index = 0; index < results.length; index++) {
    if (results[index] == "Completed") {
      completed = completed + 1;
    } else if (results[index] == "In progress") {
      inProgress = inProgress + 1;
    } else {
      notStarted = notStarted + 1;
    }
  }

  if (completed == results.length && results.length != 0) {
    return "Completed";
  } else if (inProgress > 0 || completed >= 1) {
    return "In progress";
  } else {
    return "Not started";
  }
}

/* ************************* QUESTION 1 CHECKS ******************************* */

/* Perform validation on question 1 - 0 */
exports.validateQuestion1Page0 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q10WhichType"])) {
    returnList["q10WhichType"] = messages["q10WhichType"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 1 - 1 */
exports.validateQuestion1Page1 = function (data) {
  var returnList = { isValid: true };

  if (
    validatorHelpers.isBlankCheck(data["q1iNotifyingPartyOrRepresentative"])
  ) {
    returnList["q1iNotifyingPartyOrRepresentative"] =
      messages["q1iNotifyingPartyOrRepresentative"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 1 - 2 */
exports.validateQuestion1Page2 = function (data, taskListCheck) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q1iiNotifyingPartyName"])) {
    returnList["q1iiNotifyingPartyName"] = messages["q1iiNotifyingPartyName"];
    returnList.isValid = false;
  }

  if (
    validatorHelpers.isBlankCheck(data["q1iiNotifyingPartyBusinessaddress"])
  ) {
    returnList["q1iiNotifyingPartyBusinessaddress"] =
      messages["q1iiNotifyingPartyBusinessaddress"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1iiNotifyingPartyIndividual"])) {
    returnList["q1iiNotifyingPartyIndividual"] =
      messages["q1iiNotifyingPartyIndividual"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1iiNotifyingPartyPosition"])) {
    returnList["q1iiNotifyingPartyPosition"] =
      messages["q1iiNotifyingPartyPosition"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1iiNotifyingPartyEmail"])) {
    returnList["q1iiNotifyingPartyEmail"] = messages["q1iiNotifyingPartyEmail"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1iiNotifyingPartyTelephone"])) {
    returnList["q1iiNotifyingPartyTelephone"] =
      messages["q1iiNotifyingPartyTelephone"];
    returnList.isValid = false;
  }

  // authorised correspondence section
  if (validatorHelpers.isBlankCheck(data["q1iiAuthorised"])) {
    returnList["q1iiAuthorised"] = messages["q1iiAuthorised"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isRadioValueNo(data["q1iiAuthorised"])) {
    // value is no so we need to check further fields
    if (validatorHelpers.isBlankCheck(data["q1iiAuthorisedName"])) {
      returnList["q1iiAuthorisedName"] = messages["q1iiAuthorisedName"];
      returnList.isValid = false;
    }

    if (validatorHelpers.isBlankCheck(data["q1iiAuthorisedPosition"])) {
      returnList["q1iiAuthorisedPosition"] = messages["q1iiAuthorisedPosition"];
      returnList.isValid = false;
    }

    if (validatorHelpers.isBlankCheck(data["q1iiAuthorisedEmail"])) {
      returnList["q1iiAuthorisedEmail"] = messages["q1iiAuthorisedEmail"];
      returnList.isValid = false;
    }

    if (validatorHelpers.isBlankCheck(data["q1iiAuthorisedTelephone"])) {
      returnList["q1iiAuthorisedTelephone"] =
        messages["q1iiAuthorisedTelephone"];
      returnList.isValid = false;
    }
  }

  return returnList;
};

/* Perform validation on question 1 - 3 */
exports.validateQuestion1Page3 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q1iiiNotifyingPartyName"])) {
    returnList["q1iiiNotifyingPartyName"] = messages["q1iiiNotifyingPartyName"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1iiiNotifyingPartyIndividual"])) {
    returnList["q1iiiNotifyingPartyIndividual"] =
      messages["q1iiiNotifyingPartyIndividual"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1iiiNotifyingPartyEmail"])) {
    returnList["q1iiiNotifyingPartyEmail"] =
      messages["q1iiiNotifyingPartyEmail"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1iiiNotifyingPartyPhone"])) {
    returnList["q1iiiNotifyingPartyPhone"] =
      messages["q1iiiNotifyingPartyPhone"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1iiiRepresentatives"])) {
    returnList["q1iiiRepresentatives"] = messages["q1iiiRepresentatives"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1iiiLeadRepresentatives"])) {
    returnList["q1iiiLeadRepresentatives"] =
      messages["q1iiiLeadRepresentatives"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1iiiAuthorisedIndividual"])) {
    returnList["q1iiiAuthorisedIndividual"] =
      messages["q1iiiAuthorisedIndividual"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1iiiRepresentativeEmail"])) {
    returnList["q1iiiRepresentativeEmail"] =
      messages["q1iiiRepresentativeEmail"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1iiiRepresentativePhone"])) {
    returnList["q1iiiRepresentativePhone"] =
      messages["q1iiiRepresentativePhone"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1iiiRelationship"])) {
    returnList["q1iiiRelationship"] = messages["q1iiiRelationship"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1iiiAuthorised"])) {
    returnList["q1iiiAuthorised"] = messages["q1iiiAuthorised"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 1 - 4 */
exports.validateQuestion1Page4 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q1ivAdditionalAcquirer"])) {
    returnList["q1ivAdditionalAcquirer"] = messages["q1ivAdditionalAcquirer"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 1 - 4a */
exports.validateQuestion1Page4a = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q1ivaMultinotifiername"])) {
    returnList["q1ivaMultinotifiername"] = messages["q1ivaMultinotifiername"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1ivaMultinotifierPercentage"])) {
    returnList["q1ivaMultinotifierPercentage"] =
      messages["q1ivaMultinotifierPercentage"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1ivaMultinotifierAddress"])) {
    returnList["q1ivaMultinotifierAddress"] =
      messages["q1ivaMultinotifierAddress"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1ivaMultinotifierPhone"])) {
    returnList["q1ivaMultinotifierPhone"] = messages["q1ivaMultinotifierPhone"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q1ivaMultinotifierEmail"])) {
    returnList["q1ivaMultinotifierEmail"] = messages["q1ivaMultinotifierEmail"];
    returnList.isValid = false;
  }

  return returnList;
};

/* ************************* QUESTION 2 CHECKS ******************************* */

/* Perform validation on question 2 - 1 */
exports.validateQuestion2Page2a = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q2iCaseReference"])) {
    returnList["q2iCaseReference"] = messages["q2iCaseReference"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 2 - 1 */
exports.validateQuestion2Page1 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q2iSubmitTwelve"])) {
    returnList["q2iSubmitTwelve"] = messages["q2iSubmitTwelve"];
    returnList.isValid = false;
  }

  return returnList;
};

/* ************************* QUESTION 3 CHECKS ******************************* */

/* Perform validation on question 3 - 1 */
exports.validateQuestion3Page1 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q3iSector"])) {
    returnList["q3iSector"] = messages["q3iSector"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 3 - 1a */
exports.validateQuestion3Page1a = function (data) {
  var returnList = { isValid: true };

  if (
    validatorHelpers.isBlankCheck(
      data["q3iaAcquisitionInContemplationOrTakenPlace"]
    )
  ) {
    returnList["q3iaAcquisitionInContemplationOrTakenPlace"] =
      messages["q3iaAcquisitionInContemplationOrTakenPlace"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 3 - 2 */
exports.validateQuestion3Page2 = function (data) {
  var returnList = { isValid: true };

  if (
    validatorHelpers.isBlankCheck(data["q3iiQualifyingAssetOrQualifyingEntity"])
  ) {
    returnList["q3iiQualifyingAssetOrQualifyingEntity"] =
      messages["q3iiQualifyingAssetOrQualifyingEntity"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 3 - 2a */
exports.validateQuestion3Page2a = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["question32aQualifyingEntity"])) {
    returnList["question32aQualifyingEntity"] =
      messages["question32aQualifyingEntity"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isRadioValueYes(data["question32aQualifyingEntity"])) {
    if (
      validatorHelpers.isBlankCheck(data["question32aQualifyingEntityDetails"])
    ) {
      returnList["question32aQualifyingEntityDetails"] =
        messages["question32aQualifyingEntityDetails"];
      returnList.isValid = false;
    }
  }

  return returnList;
};

/* Perform validation on question 3 - 3 */
exports.validateQuestion3Page3 = function (data) {
  var returnList = { isValid: true };

  if (
    !validatorHelpers.isBlankCheck(data["question3iiiDetailsPercentageShare"])
  ) {
    // check that the corresponding text area is filled
    if (
      validatorHelpers.isBlankCheck(
        data["question3iiiDetailsPercentageShareDetails"]
      )
    ) {
      returnList["question3iiiDetailsPercentageShareDetails"] =
        messages["question3iiiDetailsPercentageShareDetails"];
      returnList.isValid = false;
    }
  }

  if (
    !validatorHelpers.isBlankCheck(data["question3iiiDetailsPercentageVoting"])
  ) {
    // check that the corresponding text area is filled
    if (
      validatorHelpers.isBlankCheck(
        data["question3iiiDetailsPercentageVotingDetails"]
      )
    ) {
      returnList["question3iiiDetailsPercentageVotingDetails"] =
        messages["question3iiiDetailsPercentageVotingDetails"];
      returnList.isValid = false;
    }
  }

  if (
    !validatorHelpers.isBlankCheck(data["question3iiiDetailsPreventPassage"])
  ) {
    // check that the corresponding text area is filled
    if (
      validatorHelpers.isBlankCheck(
        data["question3iiiDetailsPreventPassageDetails"]
      )
    ) {
      returnList["question3iiiDetailsPreventPassageDetails"] =
        messages["question3iiiDetailsPreventPassageDetails"];
      returnList.isValid = false;
    }
  }

  if (
    !validatorHelpers.isBlankCheck(data["question3iiiDetailsEnableInfluence"])
  ) {
    // check that the corresponding text area is filled
    if (
      validatorHelpers.isBlankCheck(
        data["question3iiiDetailsEnableInfluenceDetails"]
      )
    ) {
      returnList["question3iiiDetailsEnableInfluenceDetails"] =
        messages["question3iiiDetailsEnableInfluenceDetails"];
      returnList.isValid = false;
    }
  }

  return returnList;
};

/* Perform validation on question 3 - 4 */
exports.validateQuestion3Page4 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["question3ivMaterialInfluence"])) {
    returnList["question3ivMaterialInfluence"] =
      messages["question3ivMaterialInfluence"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isRadioValueYes(data["question3ivMaterialInfluence"])) {
    if (
      validatorHelpers.isBlankCheck(data["question3ivMaterialInfluenceDetails"])
    ) {
      returnList["question3ivMaterialInfluenceDetails"] =
        messages["question3ivMaterialInfluenceDetails"];
      returnList.isValid = false;
    }
  }

  return returnList;
};

/* ************************* QUESTION 4 CHECKS ******************************* */

/* Perform validation on question 4 - 1 */
exports.validateQuestion4Page1 = function (data) {
  var returnList = { isValid: true };

  if (
    !validatorHelpers.isDateValid(
      data["q4iaquisitionDateDay"],
      data["q4iaquisitionDateMonth"],
      data["q4iaquisitionDateYear"],
      true
    )
  ) {
    returnList["q4iaquisitionDate"] = messages["q4iaquisitionDate"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q4iAdditionalInfo"])) {
    returnList["q4iAdditionalInfo"] = messages["q4iAdditionalInfo"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 4 - 02 */
exports.validateQuestion4Page02 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q4iiRegulatoryApproval"])) {
    returnList["q4iiRegulatoryApproval"] = messages["q4iiRegulatoryApproval"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 4 - 2a */
exports.validateQuestion4Page2a = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q4ibRegulatorName"])) {
    returnList["q4ibRegulatorName"] = messages["q4ibRegulatorName"];
    returnList.isValid = false;
  }

  if (
    !validatorHelpers.isDateValid(
      data["q4ibRegulatoryApprovalDay"],
      data["q4ibRegulatoryApprovalMonth"],
      data["q4ibRegulatoryApprovalYear"],
      true
    )
  ) {
    returnList["q4ibRegulatoryApproval"] = messages["q4ibRegulatoryApproval"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 4 - 03 */
exports.validateQuestion4Page03 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q4iiiOtherKeyDates"])) {
    returnList["q4iiiOtherKeyDates"] = messages["q4iiiOtherKeyDates"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 4 - 3a */
exports.validateQuestion4Page3a = function (data) {
  var returnList = { isValid: true };

  if (
    !validatorHelpers.isDateValid(
      data["q4icKeyDateDay"],
      data["q4icKeyDateMonth"],
      data["q4icKeyDateYear"],
      true
    )
  ) {
    returnList["q4icKeyDate"] = messages["q4icKeyDate"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["question4icShortDescription"])) {
    returnList["question4icShortDescription"] =
      messages["question4icShortDescription"];
    returnList.isValid = false;
  }

  return returnList;
};

/* ************************* QUESTION 5 CHECKS ******************************* */

/* Perform validation on question 5 - 1 */
exports.validateQuestion5Page1 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5iNameQualifyingEntity"])) {
    returnList["q5iNameQualifyingEntity"] = messages["q5iNameQualifyingEntity"];
    returnList.isValid = false;
  }

  if (
    validatorHelpers.isBlankCheck(data["q5iNameIndividualQualifyingEntity"])
  ) {
    returnList["q5iNameIndividualQualifyingEntity"] =
      messages["q5iNameIndividualQualifyingEntity"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5iEmail"])) {
    returnList["q5iEmail"] = messages["q5iEmail"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5iTelephone"])) {
    returnList["q5iTelephone"] = messages["q5iTelephone"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5iActivities"])) {
    returnList["q5iActivities"] = messages["q5iActivities"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isRadioValueYes(data["q5iActivities"])) {
    if (validatorHelpers.isBlankCheck(data["q5iActivitiesDescription"])) {
      returnList["q5iActivitiesDescription"] =
        messages["q5iActivitiesDescription"];
      returnList.isValid = false;
    }
  }

  if (validatorHelpers.isBlankCheck(data["q5iBusinessAddress"])) {
    returnList["q5iBusinessAddress"] = messages["q5iBusinessAddress"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5iDescription"])) {
    returnList["q5iDescription"] = messages["q5iDescription"];
    returnList.isValid = false;
  }

  if (!validatorHelpers.isBlankCheck(data["q5iWebsite"])) {
    if (!validatorHelpers.isWebsite(data["q5iWebsite"])) {
      returnList["q5iWebsite"] = messages["q5iWebsite"];
      returnList.isValid = false;
    }
  }

  return returnList;
};

/* Perform validation on question 5 - 1Alt */
exports.validateQuestion5Page1Alt = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5altiNameOfAsset"])) {
    returnList["q5altiNameOfAsset"] = messages["q5altiNameOfAsset"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5altiAssetType"])) {
    returnList["q5altiAssetType"] = messages["q5altiAssetType"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5altiAddress"])) {
    returnList["q5altiAddress"] = messages["q5altiAddress"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5altiDescription"])) {
    returnList["q5altiDescription"] = messages["q5altiDescription"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 2 */
exports.validateQuestion5Page2 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5iiIsAuthorised"])) {
    returnList["q5iiIsAuthorised"] = messages["q5iiIsAuthorised"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 2Alt */
exports.validateQuestion5Page2Alt = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5altiiIsAuthorised"])) {
    returnList["q5altiiIsAuthorised"] = messages["q5altiiIsAuthorised"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 2a */
exports.validateQuestion5Page2a = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5iiaHighestClassification"])) {
    returnList["q5iiaHighestClassification"] =
      messages["q5iiaHighestClassification"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5iiaDepartment"])) {
    returnList["q5iiaDepartment"] = messages["q5iiaDepartment"];
    returnList.isValid = false;
  }

  if (validatorHelpers.specificComparrison(data["q5iiaDepartment"], "other")) {
    if (validatorHelpers.isBlankCheck(data["q5iiaOther"])) {
      returnList["q5iiaOther"] = messages["q5iiaOther"];
      returnList.isValid = false;
    }
  }

  if (validatorHelpers.isBlankCheck(data["q5iiaDescription"])) {
    returnList["q5iiaDescription"] = messages["q5iiaDescription"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 2aAlt */
exports.validateQuestion5Page2aAlt = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5altiiaHighestClassification"])) {
    returnList["q5altiiaHighestClassification"] =
      messages["q5altiiaHighestClassification"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5altiiaDepartment"])) {
    returnList["q5altiiaDepartment"] = messages["q5altiiaDepartment"];
    returnList.isValid = false;
  }

  if (
    validatorHelpers.specificComparrison(data["q5altiiaDepartment"], "other")
  ) {
    if (validatorHelpers.isBlankCheck(data["q5altiiaOther"])) {
      returnList["q5altiiaOther"] = messages["q5altiiaOther"];
      returnList.isValid = false;
    }
  }

  if (validatorHelpers.isBlankCheck(data["q5altiiaDescription"])) {
    returnList["q5altiiaDescription"] = messages["q5altiiaDescription"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 3 */
exports.validateQuestion5Page3 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5iiiIsLicenseRequired"])) {
    returnList["q5iiiIsLicenseRequired"] = messages["q5iiiIsLicenseRequired"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 3Alt */
exports.validateQuestion5Page3Alt = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5altiiiIsLicenseRequired"])) {
    returnList["q5altiiiIsLicenseRequired"] =
      messages["q5altiiiIsLicenseRequired"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 3a */
exports.validateQuestion5Page3a = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5iiiaLicence"])) {
    returnList["q5iiiaLicence"] = messages["q5iiiaLicence"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5iiiaIssuer"])) {
    returnList["q5iiiaIssuer"] = messages["q5iiiaIssuer"];
    returnList.isValid = false;
  }

  if (
    !validatorHelpers.isDateValid(
      data["q5iiiaIssueDateDay"],
      data["q5iiiaIssueDateMonth"],
      data["q5iiiaIssueDateYear"],
      true
    )
  ) {
    returnList["q5iiiaIssueDate"] = messages["q5iiiaIssueDate"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 3aAlt */
exports.validateQuestion5Page3aAlt = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5altiiiaLicence"])) {
    returnList["q5altiiiaLicence"] = messages["q5altiiiaLicence"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5altiiiaIssuer"])) {
    returnList["q5altiiiaIssuer"] = messages["q5altiiiaIssuer"];
    returnList.isValid = false;
  }

  if (
    !validatorHelpers.isDateValid(
      data["q5altiiiaIssueDateDay"],
      data["q5altiiiaIssueDateMonth"],
      data["q5altiiiaIssueDateYear"],
      true
    )
  ) {
    returnList["q5altiiiaIssueDate"] = messages["q5altiiiaIssueDate"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 4 */
exports.validateQuestion5Page4 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5ivIsDualUse"])) {
    returnList["q5ivIsDualUse"] = messages["q5ivIsDualUse"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 4Alt */
exports.validateQuestion5Page4Alt = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5altivIsDualUse"])) {
    returnList["q5altivIsDualUse"] = messages["q5altivIsDualUse"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 4a */
exports.validateQuestion5Page4a = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5ivaItemName"])) {
    returnList["q5ivaItemName"] = messages["q5ivaItemName"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5ivaDescription"])) {
    returnList["q5ivaDescription"] = messages["q5ivaDescription"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 4aAlt */
exports.validateQuestion5Page4aAlt = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5altivaItemName"])) {
    returnList["q5altivaItemName"] = messages["q5altivaItemName"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5altivaDescription"])) {
    returnList["q5altivaDescription"] = messages["q5altivaDescription"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 5 */
exports.validateQuestion5Page5 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5vIsPartyTo"])) {
    returnList["q5vIsPartyTo"] = messages["q5vIsPartyTo"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 5Alt */
exports.validateQuestion5Page5Alt = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5altvData"])) {
    returnList["q5altvData"] = messages["q5altvData"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isRadioValueYes(data["q5altvData"])) {
    if (validatorHelpers.isBlankCheck(data["q5altvDescription"])) {
      returnList["q5altvDescription"] = messages["q5altvDescription"];
      returnList.isValid = false;
    }
  }

  return returnList;
};

/* Perform validation on question 5 - 5a */
exports.validateQuestion5Page5a = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5vaSupplyRelationship"])) {
    returnList["q5vaSupplyRelationship"] = messages["q5vaSupplyRelationship"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5vaArea"])) {
    returnList["q5vaArea"] = messages["q5vaArea"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5vaDepartment"])) {
    returnList["q5vaDepartment"] = messages["q5vaDepartment"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 6 */
exports.validateQuestion5Page6 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5viIsFundedResearch"])) {
    returnList["q5viIsFundedResearch"] = messages["q5viIsFundedResearch"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 6Alt */
exports.validateQuestion5Page6Alt = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5altviData"])) {
    returnList["q5altviData"] = messages["q5altviData"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isRadioValueYes(data["q5altviData"])) {
    if (validatorHelpers.isBlankCheck(data["q5altviName"])) {
      returnList["q5altviName"] = messages["q5altviName"];
      returnList.isValid = false;
    }
  }

  return returnList;
};

/* Perform validation on question 5 - 6a */
exports.validateQuestion5Page6a = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5viaName"])) {
    returnList["q5viaName"] = messages["q5viaName"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5viaArea"])) {
    returnList["q5viaArea"] = messages["q5viaArea"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5viaDescription"])) {
    returnList["q5viaDescription"] = messages["q5viaDescription"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5viaDepartment"])) {
    returnList["q5viaDepartment"] = messages["q5viaDepartment"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 7 */
exports.validateQuestion5Page7 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5viiIsNSVSC"])) {
    returnList["q5viiIsNSVSC"] = messages["q5viiIsNSVSC"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 5 - 7a */
exports.validateQuestion5Page7a = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q5viiaLevel"])) {
    returnList["q5viiaLevel"] = messages["q5viiaLevel"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q5viiaHowMany"])) {
    returnList["q5viiaHowMany"] = messages["q5viiaHowMany"];
    returnList.isValid = false;
  }

  return returnList;
};

/* ************************* QUESTION 6 CHECKS ******************************* */

/* Perform validation on question 6 - 3 */
exports.validateQuestion6Page3 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q6iiiNonUKGovt"])) {
    returnList["q6iiiNonUKGovt"] = messages["q6iiiNonUKGovt"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 6 - 3asset */
exports.validateQuestion6Page3Asset = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q6iiiContractualArrangementAsset"])) {
    returnList["q6iiiContractualArrangementAsset"] =
      messages["q6iiiContractualArrangementAsset"];
    returnList.isValid = false;
  }

  if (
    validatorHelpers.isRadioValueYes(data["q6iiiContractualArrangementAsset"])
  ) {
    if (validatorHelpers.isBlankCheck(data["q6vAdditionalInformation"])) {
      returnList["q6vAdditionalInformation"] =
        messages["q6vAdditionalInformation"];
      returnList.isValid = false;
    }
  }

  return returnList;
};

/* Perform validation on question 6 - 4a */
exports.validateQuestion6Page4a = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q6iiiNonUKGovernmentName"])) {
    returnList["q6iiiNonUKGovernmentName"] =
      messages["q6iiiNonUKGovernmentName"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q6iiiGovernmentInterest"])) {
    returnList["q6iiiGovernmentInterest"] = messages["q6iiiGovernmentInterest"];
    returnList.isValid = false;
  }

  return returnList;
};

/* ************************* QUESTION 7 CHECKS ******************************* */

/* Perform validation on question 7 - 1 */
exports.validateQuestion7Page1 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q7iNameOfAcquirer"])) {
    returnList["q7iNameOfAcquirer"] = messages["q7iNameOfAcquirer"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q7iCountryOfOrigin"])) {
    returnList["q7iCountryOfOrigin"] = messages["q7iCountryOfOrigin"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q7iEntityOrIndividual"])) {
    returnList["q7iEntityOrIndividual"] = messages["q7iEntityOrIndividual"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 7 - 3 */
exports.validateQuestion7Page3 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q7iDescriptionProductActivities"])) {
    returnList["q7iDescriptionProductActivities"] =
      messages["q7iDescriptionProductActivities"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 7 - 04 */
exports.validateQuestion7Page04 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q7iiNonUKGovt"])) {
    returnList["q7iiNonUKGovt"] = messages["q7iiNonUKGovt"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 7 - 4a */
exports.validateQuestion7Page4a = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q7iiNameOfNonUKGoverment"])) {
    returnList["q7iiNameOfNonUKGoverment"] =
      messages["q7iiNameOfNonUKGoverment"];
    returnList.isValid = false;
  }

  if (
    validatorHelpers.isBlankCheck(data["q7iiNameOfPersonActingNonUKGoverment"])
  ) {
    returnList["q7iiNameOfPersonActingNonUKGoverment"] =
      messages["q7iiNameOfPersonActingNonUKGoverment"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q7iiShareOwnershipVotingRights"])) {
    returnList["q7iiShareOwnershipVotingRights"] =
      messages["q7iiShareOwnershipVotingRights"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 7 - 05 */
exports.validateQuestion7Page05 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q7iiiNonUKGovt"])) {
    returnList["q7iiiNonUKGovt"] = messages["q7iiiNonUKGovt"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 7 - 5a */
exports.validateQuestion7Page5a = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q7iiiNameOfNonUKGoverment"])) {
    returnList["q7iiiNameOfNonUKGoverment"] =
      messages["q7iiiNameOfNonUKGoverment"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q7iiiBriefInterestDescription"])) {
    returnList["q7iiiBriefInterestDescription"] =
      messages["q7iiiBriefInterestDescription"];
    returnList.isValid = false;
  }

  return returnList;
};

/* Perform validation on question 7 - 6 */
exports.validateQuestion7Page6 = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q7ivContractualArrangements"])) {
    returnList["q7ivContractualArrangements"] =
      messages["q7ivContractualArrangements"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isRadioValueYes(data["q7ivContractualArrangements"])) {
    if (
      validatorHelpers.isBlankCheck(data["q7ivContractualArrangementsSummary"])
    ) {
      returnList["q7ivContractualArrangementsSummary"] =
        messages["q7ivContractualArrangementsSummary"];
      returnList.isValid = false;
    }
  }

  return returnList;
};

/* ************************* QUESTION 8 CHECKS ******************************* */

/* Perform validation on question 8 - 2a */
exports.validateQuestion8Page2a = function (data) {
  var returnList = { isValid: true };

  if (validatorHelpers.isBlankCheck(data["q8iiNameOfBoardMember"])) {
    returnList["q8iiNameOfBoardMember"] = messages["q8iiNameOfBoardMember"];
    returnList.isValid = false;
  }

  if (
    !validatorHelpers.isDateOfBirthValid(
      data["q8iiDateOfBirthDay"],
      data["q8iiDateOfBirthMonth"],
      data["q8iiDateOfBirthYear"],
      true
    )
  ) {
    returnList["q8iiDateOfBirth"] = messages["q8iiDateOfBirth"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q8iiPositionHeld"])) {
    returnList["q8iiPositionHeld"] = messages["q8iiPositionHeld"];
    returnList.isValid = false;
  }

  if (validatorHelpers.isBlankCheck(data["q8iiClassifiedPolitically"])) {
    returnList["q8iiClassifiedPolitically"] =
      messages["q8iiClassifiedPolitically"];
    returnList.isValid = false;
  }

  return returnList;
};

/* ************************* QUESTION 9 CHECKS ******************************* */

/* ************************* FORM STATUS CHECK ******************************* */

/* validate the actual status of the whole of question 1 for the route chosen by the user */
exports.validateQuestionStatusQ1 = function (data) {
  var qResults = [];

  qResults.push(checkState(this.validateQuestion1Page0(data)));
  qResults.push(checkState(this.validateQuestion1Page1(data)));

  if (data["q1iNotifyingPartyOrRepresentative "] === "notifyingParty") {
    qResults.push(checkState(this.validateQuestion1Page2(data)));
  } else if (data["q1iNotifyingPartyOrRepresentative "] === "representative") {
    qResults.push(checkState(this.validateQuestion1Page3(data)));
  }

  if (data["q10WhichType"] === "Acquirer") {
    qResults.push(checkState(this.validateQuestion1Page4(data)));

    if (validatorHelpers.isRadioValueYes(data["q1ivAdditionalAcquirer"])) {
      if (!validatorHelpers.isBlankCheck(data["q1ivaAdditionalAcquirerList"])) {
        qResults.push("Completed");
      }
    }
  }

  return resultRundown(qResults);
};

/* validate the actual status of the whole of question 2 for the route chosen by the user */
exports.validateQuestionStatusQ2 = function (data) {
  var qResults = [];

  qResults.push(checkState(this.validateQuestion2Page1(data)));

  return resultRundown(qResults);
};

/* validate the actual status of the whole of question 3 for the route chosen by the user */
exports.validateQuestionStatusQ3 = function (data) {
  var qResults = [];

  qResults.push(checkState(this.validateQuestion3Page1(data)));
  qResults.push(checkState(this.validateQuestion3Page1a(data)));
  qResults.push(checkState(this.validateQuestion3Page2(data)));

  if (data["q3iiQualifyingAssetOrQualifyingEntity"] === "qualifyingAsset") {
    qResults.push(checkState(this.validateQuestion3Page2a(data)));
  } else if (
    data["q3iiQualifyingAssetOrQualifyingEntity"] === "qualifyingEntity"
  ) {
    qResults.push(checkState(this.validateQuestion3Page3(data)));
    //qResults.push(checkState(this.validateQuestion3Page4(data)));
  }

  return resultRundown(qResults);
};

/* validate the actual status of the whole of question 4 for the route chosen by the user */
exports.validateQuestionStatusQ4 = function (data) {
  var qResults = [];

  qResults.push(checkState(this.validateQuestion4Page1(data)));

  if (validatorHelpers.isBlankCheck(data["q4iiRegulatoryApproval"])) {
    qResults.push("Not Started");
  }

  if (validatorHelpers.isRadioValueYes(data["q4iiRegulatoryApproval"])) {
    if (!validatorHelpers.isBlankCheck(data["q4ibRegulatoryApprovalList"])) {
      qResults.push("Completed");
    }
  }

  if (validatorHelpers.isBlankCheck(data["q4iiiOtherKeyDates"])) {
    qResults.push("Not Started");
  }

  if (validatorHelpers.isRadioValueYes(data["q4iiiOtherKeyDates"])) {
    if (!validatorHelpers.isBlankCheck(data["q4icKeyDatesList"])) {
      qResults.push("Completed");
    }
  }

  return resultRundown(qResults);
};

/* validate the actual status of the whole of question 5 for the route chosen by the user */
exports.validateQuestionStatusQ5 = function (data) {
  var qResults = [];
  const isAlt =
    data["q3iiQualifyingAssetOrQualifyingEntity"] === "qualifyingAsset";

  // are we dealing with an asset?
  if (isAlt) {
    qResults.push(checkState(this.validateQuestion5Page1Alt(data)));

    if (validatorHelpers.isBlankCheck(data["q5altiiIsAuthorised"])) {
      qResults.push("Not Started");
    }

    if (validatorHelpers.isRadioValueYes(data["q5altiiIsAuthorised"])) {
      if (
        !validatorHelpers.isBlankCheck(data["q5altiiaClassificationListItems"])
      ) {
        qResults.push("Completed");
      }
    }

    if (validatorHelpers.isBlankCheck(data["q5altiiiIsLicenseRequired"])) {
      qResults.push("Not Started");
    }

    if (validatorHelpers.isRadioValueYes(data["q5altiiiIsLicenseRequired"])) {
      if (!validatorHelpers.isBlankCheck(data["q5altiiiaLicenceListItems"])) {
        qResults.push("Completed");
      }
    }

    if (validatorHelpers.isBlankCheck(data["q5altivIsDualUse"])) {
      qResults.push("Not Started");
    }

    if (validatorHelpers.isRadioValueYes(data["q5altivIsDualUse"])) {
      if (!validatorHelpers.isBlankCheck(data["q5altivaDualUseListItems"])) {
        qResults.push("Completed");
      }
    }

    qResults.push(checkState(this.validateQuestion5Page5Alt(data)));
    qResults.push(checkState(this.validateQuestion5Page6Alt(data)));
  } else {
    qResults.push(checkState(this.validateQuestion5Page1(data)));

    if (validatorHelpers.isBlankCheck(data["q5iiIsAuthorised"])) {
      qResults.push("Not Started");
    }

    if (validatorHelpers.isRadioValueYes(data["q5iiIsAuthorised"])) {
      if (
        !validatorHelpers.isBlankCheck(data["q5iiaClassificationListItems"])
      ) {
        qResults.push("Completed");
      }
    }

    if (validatorHelpers.isBlankCheck(data["q5iiiIsLicenseRequired"])) {
      qResults.push("Not Started");
    }

    if (validatorHelpers.isRadioValueYes(data["q5iiiIsLicenseRequired"])) {
      if (!validatorHelpers.isBlankCheck(data["q5iiiaLicenceListItems"])) {
        qResults.push("Completed");
      }
    }

    if (validatorHelpers.isBlankCheck(data["q5ivIsDualUse"])) {
      qResults.push("Not Started");
    }

    if (validatorHelpers.isRadioValueYes(data["q5ivIsDualUse"])) {
      if (!validatorHelpers.isBlankCheck(data["q5ivaDualUseListItems"])) {
        qResults.push("Completed");
      }
    }

    if (validatorHelpers.isBlankCheck(data["q5vIsPartyTo"])) {
      qResults.push("Not Started");
    }

    if (validatorHelpers.isRadioValueYes(data["q5vIsPartyTo"])) {
      if (!validatorHelpers.isBlankCheck(data["q5vaPartyToListItems"])) {
        qResults.push("Completed");
      }
    }

    if (validatorHelpers.isBlankCheck(data["q5viIsFundedResearch"])) {
      qResults.push("Not Started");
    }

    if (validatorHelpers.isRadioValueYes(data["q5viIsFundedResearch"])) {
      if (
        !validatorHelpers.isBlankCheck(data["q5viaFundedResearchListItems"])
      ) {
        qResults.push("Completed");
      }
    }

    if (validatorHelpers.isBlankCheck(data["q5viIsFundedResearch"])) {
      qResults.push("Not Started");
    }

    if (validatorHelpers.isRadioValueYes(data["q5viiIsNSVSC"])) {
      if (!validatorHelpers.isBlankCheck(data["q5viiaNSVSCListItems"])) {
        qResults.push("Completed");
      }
    }
  }

  return resultRundown(qResults);
};

/* validate the actual status of the whole of question 6 for the route chosen by the user */
exports.validateQuestionStatusQ6 = function (data) {
  var qResults = [];
  const isAlt =
    data["q3iiQualifyingAssetOrQualifyingEntity"] === "qualifyingAsset";

  // are we dealing with an asset?
  if (isAlt) {
    if (
      data["q6iPreAcquisitionChartFileNameAsset"] == null ||
      data["q6iPreAcquisitionChartFileNameAsset"] == ""
    ) {
      qResults.push("Not Started");
    }

    if (
      data["q6iiPostAcquisitionChartFileNameAsset"] == null ||
      data["q6iiPostAcquisitionChartFileNameAsset"] == ""
    ) {
      qResults.push("Not Started");
    }

    qResults.push(checkState(this.validateQuestion6Page3Asset(data)));
  } else {
    if (
      data["q6iPreAcquisitionChartFileName"] == null ||
      data["q6iPreAcquisitionChartFileName"] == ""
    ) {
      qResults.push("Not Started");
    }

    if (
      data["q6iiPostAcquisitionChartFileName"] == null ||
      data["q6iiPostAcquisitionChartFileName"] == ""
    ) {
      qResults.push("Not Started");
    }

    qResults.push(checkState(this.validateQuestion6Page3(data)));

    if (validatorHelpers.isBlankCheck(data["q6iiiNonUKGovt"])) {
      qResults.push("Not Started");
    }

    if (validatorHelpers.isRadioValueYes(data["q6iiiNonUKGovt"])) {
      if (!validatorHelpers.isBlankCheck(data["nonUKGovernmentList"])) {
        qResults.push("Completed");
      }
    }
  }

  return resultRundown(qResults);
};

/* validate the actual status of the whole of question 7 for the route chosen by the user */
exports.validateQuestionStatusQ7 = function (data) {
  var qResults = [];

  qResults.push(checkState(this.validateQuestion7Page1(data)));

  qResults.push(checkState(this.validateQuestion7Page3(data)));
  qResults.push(checkState(this.validateQuestion7Page04(data)));

  if (validatorHelpers.isBlankCheck(data["q7iiNonUKGovt"])) {
    qResults.push("Not Started");
  }

  if (validatorHelpers.isRadioValueYes(data["q7iiNonUKGovt"])) {
    if (!validatorHelpers.isBlankCheck(data["q7iiNonUKGovernmentList"])) {
      qResults.push("Completed");
    }
  }

  if (validatorHelpers.isBlankCheck(data["q7iiiNonUKGovt"])) {
    qResults.push("Not Started");
  }

  if (validatorHelpers.isRadioValueYes(data["q7iiiNonUKGovt"])) {
    if (!validatorHelpers.isBlankCheck(data["q7iiiNonUKRoleInOperationList"])) {
      qResults.push("Completed");
    }
  }

  qResults.push(checkState(this.validateQuestion7Page6(data)));

  return resultRundown(qResults);
};

/* validate the actual status of the whole of question 8 for the route chosen by the user */
exports.validateQuestionStatusQ8 = function (data) {
  var qResults = [];

  if (
    data["q8iControllingOwnershipFileName"] == null ||
    data["q8iControllingOwnershipFileName"] == ""
  ) {
    qResults.push("Not Started");
  }

  if (!validatorHelpers.isBlankCheck(data["q8iiBoardMembersList"])) {
    qResults.push("Completed");
  }

  return resultRundown(qResults);
};

/* Call all of the validation summary methods */
exports.validateAllRootQuestions = function (data) {
  returnList = {};

  returnList["question1State"] = this.validateQuestionStatusQ1(data);
  returnList["question2State"] = this.validateQuestionStatusQ2(data);
  returnList["question3State"] = this.validateQuestionStatusQ3(data);
  returnList["question4State"] = this.validateQuestionStatusQ4(data);
  returnList["question5State"] = this.validateQuestionStatusQ5(data);
  returnList["question6State"] = this.validateQuestionStatusQ6(data);
  returnList["question7State"] = this.validateQuestionStatusQ7(data);
  returnList["question8State"] = this.validateQuestionStatusQ8(data);
  //returnList["question9State"] = "Not Started";

  return returnList;
};

/* Does a simple true false check on the form to see if it is complete */
exports.areAllQuestionsComplete = function (data) {
  returnVal = true;

  var results = this.validateAllRootQuestions(data);

  Object.keys(results).forEach(function (key) {
    if (results[key] != "Completed") {
      returnVal = false;
    }
  });

  return returnVal;
};
