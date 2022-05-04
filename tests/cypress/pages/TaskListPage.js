import faker from "faker";
import CommonFunctions from "./CommonFunctions";
let common = new CommonFunctions();

//Common ID
//const testData = require('../fixtures/MandatoryData.json');
const SAVEBUTTON = "//button[contains(text(),'Save and continue')]";
const INPUT_VALUE = "ABC";
const EMAIL = "ABC@acubed.it";
const ADDINFO = "Question5 Addtional INFO";
const NOTIFICATION_REFERENCE = "#userNotificationReference";
const ERROR_MESSAGE_TEXT = ".govuk-list > li > a";

const CREATE_NEW_NOTIFICATION = ":nth-child(1) > b > .task-link";
const FORM_TYPE_MANDATORY = "#formTypeMandatory";
const FORM_TYPE_VOLUNTARY = "#formTypeVoluntary";
const FORM_TYPE_RETROSOECTIVE = "#formTypeRetrospective";

//Read and accept guidelines
const READ_AND_ACCEPT_GUIDELINES = "Read and accept guidelines";
const GUIDELINESACCEPTED = "#guidelinesAccepted";
const SUBMITTEDGUIDELINES = "#submitButtonGuidelines";
const STEP1_STATUS = "#finalapp-status";

//Question 1
const ACQUIRING_PARTY = "#q1iAcquirerOrRepresentative1";
const REPRESE_OF_ACQUIRING = "#q1iAcquirerOrRepresentative2";
const ACQUIRER_FULLNAME = "#q1iiAcquirerFullname";
const ACQUIRER_INDIVIDUAL = "#q1iiAcquirerIndividual";
const ACQUIRER_POSITION = "#q1iiAcquirerPosition";
const ACQUIRER_BUSINESSADDRESS = "#q1iiAcquirerBusinessaddress";
const QUESTION1_TELEPHONE = "#q1iiAcquirerTelephone";
const QUESTION1_EMAIL = "#q1iiAcquirerEmail";
const QUESTION1_AUTHORISED_YES = "#q1iiAuthorisedYes";
const QUESTION1_AUTHORISED_NO = "#q1iiAuthorisedNo";
const QUESTION1_AUTHORISED_NAME = "#q1iiAuthorisedName";
const QUESTION1_AUTHORISED_POSITION = "#q1iiAuthorisedPosition";
const QUESTION1_AUTHORISED_EMAIL = "#q1iiAuthorisedEmail";
const QUESTION1_AUTHORISED_TELEPHONE = "#q1iiAuthorisedTelephone";
const QUESTION1_NOTIFIER_REPRESENTATIVE = "#q1ivaMultinotifierRepresentative";
const QUESTION1_NOTIFIER_PERCENTAGE = "#q1ivaMultinotifierPercentage";
const QUESTION1_NOTIFIER_ADDRESS = "#q1ivaMultinotifierAddress";
const QUESTION1_NOTIFIER_Phone = "#q1ivaMultinotifierPhone";
const QUESTION1_NOTIFIER_EMAIL = "#q1ivaMultinotifierEmail";
//const QUESTION1_CONSENTAGREE = '#q1iiAcquirerConsentAgree';
//const QUESTION1_CONSENT_DISAGREE = '#q1iiAcquirerConsentDisagree';
//const QUESTION1_ACQUIRER_CONSENT_BY_EMAIL = '#q1iiAcquirerContactByEmail';
const QUESTION1_ADDITIONAL_ACQUIRER_YES = "#q1ivAdditionalAcquirerYes";
const QUESTION1_ADDITIONAL_ACQUIRER_NO = "#q1ivAdditionalAcquirerNo";
const QUESTION1_MULTINOTIFIE_NAME = "#q1ivaMultinotifiername";
const QUESTION1_MULTINOTIFER_INDU_NAME = "#q1ivaMultinotifierindividualname";
const QUESTION1_MULTINOTIFER_EMAIL = "#q1ivaMultinotifieremail";
const QUESTION1_MULTINOTIFER_ADDITIONAL_INFO =
  "#q1ivaMultinotifierAdditionalinfo";
const QUESTION1_ADD_ANOTHERACQUIRER_YES = "#q1ivbAddAnotherAcquirerYes";
const QUESTION1_ADD_ANOTHERACQUIRER_NO = "#q1ivbAddAnotherNo";
const QUESTION1_PREVIOUS_NOTICICATION_YES = "#q1vPreviousNotificationYes";
const QUESTION1_PREVIOUS_NOTICICATION_NO = "#q1vPreviousNotificationNo";
const QUESTION1_PREVIOUS_NOTICICATION_DONOTKNOW =
  "#q1vPreviousNotificationDoNotKnow";

//Question 2
const QUESTION2_SUBMIT_TWELVE_YES = "#q2iSubmitTwelveYes";
const QUESTION2_SUBMIT_TWELVE_NO = "#q2iSubmitTwelveNo";
const QUESTION2_SUBMIT_TWELVE_DONOTKNOW = "#q2iSubmitTwelveDontknow";
const QUESTION2_CASE_REFERENCE = "#q2iCaseReference";
const QUESTION2_SUBMIT_TWELVE_YES1 = "#q2iiSubmitTwelveYes";
const QUESTION2_SUBMIT_TWELVE_NO1 = "#q2iiSubmitTwelveNo";
const QUESTION2_SUBMIT_TWELVE_DONOTKNOW1 = "#q2iiSubmitTwelveDontknow";
const QUESTION2_COUNTRY_NAME = "#q2iiNameCountry";
const QUESTION2_CASE_REFERENCE1 = "#q2iiCaseReference";
const QUESTION2_ADDITIONAL_INFO = "#q2iiAdditionalInfo";
const QUESTION2_ADD_ANOTHER_NOTIFICATION_YES = "#q211addanothernotificationYes";
const QUESTION2_ADD_ANOTHER_NOTIFICATION_NO = "#q211addanothernotificationNo";
const QUESTION2_CASEREFERENCE = "#q2iCaseReference";
const QUESTION2_DATE_SUBMISSION_DAY = "#q2iDateSubmissionDay";
const QUESTION2_DATE_SUBMISSION_MONTH = "#q2iDateSubmissionMonth";
const QUESTION2_DATE_SUBMISSION_YEAR = "#q2iDateSubmissionYear";
const QUESTION2_IV_US = "#question2ivUS";
const QUESTION2_IV_CANADA = "#question2ivCanada";
const QUESTION2_IV_AUSTRALIA = "#question2ivAustralia";
const QUESTION2_IV_NEWZEALAND = "#question2ivNewZealand";
const QUESTION2_IV_OTHER = "#question2ivOther";
const QUESTION2_IV_NO = "#question2ivNo";
const QUESTION2_IV_DONOTKNOW = "#question2ivDontKnow";
const QUESTION2_IV_INFO_CASENO_US = "#question2ivUSInfoCasenumber";
const QUESTION2__IV_INFO_ADDTIONAL_US = "#question2ivUSInfoAdditional";
const QUESTION2_IV_INFO_CASENO_CANADA = "#question2ivCanadaInfoCasenumber";
const QUESTION2__IV_INFO_ADDTIONAL_CANADA = "#question2ivCanadaInfoAdditional";
const QUESTION2_IV_INFO_CASENO_AUSTRALIA =
  "#question2ivAustraliaInfoCasenumber";
const QUESTION2__IV_INFO_ADDTIONAL_AUSTRALIA =
  "#question2ivAustraliaInfoAdditional";
const QUESTION2_IV_INFO_CASENO_NEWZEALAND =
  "#question2ivNewZealandInfoCasenumber";
const QUESTION2__IV_INFO_ADDTIONAL_NEWZELAND =
  "#question2ivNewZealandInfoAdditional";

//Question 3

const QUESTION3_SECTOR1 = "#q3iSector1";
const QUESTION3_SECTOR2 = "#q3iSector2";
const QUESTION3_SECTOR3 = "#q3iSector3";
const QUESTION3_SECTOR4 = "#q3iSector4";
const QUESTION3_SECTOR5 = "#q3iSector5";
const QUESTION3_SECTOR6 = "#q3iSector6";
const QUESTION3_SECTOR7 = "#q3iSector7";
const QUESTION3_SECTOR8 = "#q3iSector8";
const QUESTION3_SECTOR9 = "#q3iSector9";
const QUESTION3_SECTOR10 = "#q3iSector10";
const QUESTION3_SECTOR11 = "#q3iSector11";
const QUESTION3_SECTOR12 = "#q3iSector12";
const QUESTION3_SECTOR13 = "#q3iSector13";
const QUESTION3_SECTOR14 = "#q3iSector14";
const QUESTION3_SECTOR15 = "#q3iSector15";
const QUESTION3_SECTOR16 = "#q3iSector16";
const QUESTION3_SECTOR17 = "#q3iSector17";
const QUESTION3_REASON = "#q3iiReason";
const QUESTION3_PERCENT_25 = "#question3iiiPercent25";
const QUESTION3_PERCENT_50 = "#question3iiiPercent50";
const QUESTION3_PERCENT_75 = "#question3iiiPercent75";
const QUESTION3_PERCENTAGE_SHARE = "#question3ivPercentageShare";
const QUESTION3_PERCENTAGE_VOTINGRIGHTS = "#question3ivPercentageVotingRights";
const QUESTION3_ACQUISITION_YES = "#question3vAcquisitionYes";
const QUESTION3_ACQUISITION_NO = "#question3vAcquisitionNo";
const QUESTION3_ACQUISITION_DETAILS = "#question3ivAcquisitionDetails";
const QUESTION3_ACQUISITION_DETAILS1 = "#question3vAcquisitionDetails";

//Question 4
const QUESTION4_AQUISITIONDATE_DAY = "#q4iaquisitionDateDay";
const QUESTION4_AQUISITIONDATE_MONTH = "#q4iaquisitionDateMonth";
const QUESTION4_AQUISITIONDATE_YEAR = "#q4iaquisitionDateYear";
const QUESTION4_AQUISITIONDATE_DONTKNOW = "#q3iDontKnow";
const QUESTION4_AQUISITIONDATE_ADDINFO = "#q4iAdditionalInfo";
const QUESTION4_ADDANOTHER_REGULATORY_APP_YES = "#q4iiRegulatoryApprovalYes";
const QUESTION4_ADDANOTHER_REGULATORY_APP_NO =
  "#q4ibaddanotherRegulatoryApprovalNo";
const QUESTION4_ADDANOTHER_REGULATORY_APP_DONTKNOW =
  "#q4iiRegulatoryApprovalDoNotKnow";
const QUESTION4_ADDANOTHER_REGULATORY_APP_NA =
  "#q4iiaddanotherRegulatoryApprovalNa";
const QUESTION4_REGULATORY_APPROVAL_DAY = "#q4ibRegulatoryApprovalDay";
const QUESTION4_REGULATORY_APPROVAL_MONTH = "#q4ibRegulatoryApprovalMonth";
const QUESTION4_REGULATORY_APPROVAL_YEAR = "#q4ibRegulatoryApprovalYear";
const QUESTION4_REGULATORY_APPROVAL_NAME = "#q4ibRegulatorName";
const QUESTION4_REGULATORY__ADD_INFO = "#q4ibRegulatorName";
const QUESTION4_REGULATORY_APPROVAL_CHANGE =
  '.hmrc-add-to-a-list__change > .govuk-link > [aria-hidden="true"]';
const QUESTION4_REGULATORY_APPROVAL_REMOVE = ".hmrc-add-to-a-list__remove";
const QUESTION4_REGULATORY_APPROVAL_REMOVE_YES = "#q4ibremoveYes";
const QUESTION4_REGULATORY_APPROVAL_REMOVE_NO = "#q4ibremoveNo";
const QUESTION4_ADDTIONAL_KEYDATES_YES = "#q4iiiOtherKeyDatesYes"; //"#q4icAdditionalKeyDatesYes";
const QUESTION4_ADDTIONAL_KEYDATES_NO = "#q4icAdditionalKeyDatesNo";
const QUESTION4_ADDTIONAL_KEYDATES_NA = "#q4iiiOtherKeyDatesDoNotKnow"; //"#q4icAdditionalKeyDatesNa";
const QUESTION4_KEYDATE_DAY = "#q4icKeyDate-day"; //"#q4icKeyDateDay" ;     //
const QUESTION4_KEYDATE_MONTH = "#q4icKeyDate-month"; // "#q4icKeyDateMonth";      //
const QUESTION4_KEYDATE_YEAR = "#q4icKeyDate-year"; //"#q4icKeyDateYear";   //
const QUESTION4_KEYDATE_SHORT_DESC = "#question4icShortDescription";

//Question 5
const QUESTION5_QUALIFYING_ENTITY_NAME = "#q5iNameQualifyingEntity";
const QUESTION5_INDIVIDUAL_QUALIFYING_ENTITY_NAME =
  "#q5iNameIndividualQualifyingEntity";
const QUESTION5_EMAIL = "#q5iEmail";
const QUESTION5_TELEPHONE = "#q5iTelephone";
const QUESTION5_COMPANIESHOUSE = "#q5iCompaniesHouse";
const QUESTION5_SIC = "#q5iSIC";
const QUESTION5_COUNTRY = "#q5iCountry";
const QUESTION5_REGISTRATION = "#q5iRegistration";
const QUESTION5_ACTIVITIES_YES = "#q5iActivitiesYes";
const QUESTION5_ACTIVITIES_NO = "#q5iActivitiesNo";
const QUESTION5_ACTIVITIES_DESCRIPTION = "#q5iActivitiesDescription";
const QUESTION5_BUSINESS_ADDRESS = "#q5iBusinessAddress";
const QUESTION5_WEBSITE = "#q5iWebsite";
const QUESTION5_DESCRIPTION = "#q5iDescription";
//const QUESTION5_ADDITIONAL_INFO ='#q5iAdditionalInfo';
const QUESTION5_IS_AUTHORISED_YES = "#q5iiIsAuthorisedYes";
const QUESTION5_IS_AUTHORISED_NO = "#q5iiIsAuthorisedNo";
const QUESTION5_IS_AUTHORISED_DONOTKNOW = "#q5iiIsAuthorisedDoNotKnow";
//const QUESTION5_IS_LISTED_YES ='#q5iiIsListedYes';
//const QUESTION5_IS_LISTED_NO ='#q5iiIsListedNo';
//const QUESTION5_IS_LISTED_DONOTKNOW ='#q5iiIsListedDoNotKnow';

const QUESTION5_IS_LISTED_ADDITIONAL_INFO = "#q5iiAdditionalInfo";
const QUESTION5_PROTECTED_LIST = "#q5iiaProtectedList";
const QUESTION5_ADDANOTHER_NO = "#q5iibAddAnotherNo";
const QUESTION5_ADDANOTHER_YES = "#q5iibAddAnotherYes";
const QUESTION5_AUTHORISED_YES = "#q5iiiIsAuthorisedYes";
const QUESTION5_AUTHORISED_NO = "#q5iiiIsAuthorisedNo";
const QUESTION5_AUTHORISED_DONOTKNOW = "#q5iiiIsAuthorisedDoNotKnow";
const QUESTION5_AUTHORISED_ADDTIONAL_INFO = "#q5iiaAdditionalInfo";
const QUESTION5_HIGHEST_CLASSIFICATION = "#q5iiaHighestClassification";
const QUESTION5_OTHERL_INFO = "#q5iiaOther";
const QUESTION5_DESCRIPTION1 = "#q5iiaDescription";
const QUESTION5_DEPARTMENT = "#q5iiiaDepartment";
const QUESTION5_ADDANOTHER_YES3 = "#q5iiibAddAnotherYes";
const QUESTION5_ADDANOTHER_NO3 = "#q5iibAddAnotherNo";
const QUESTION5_APPROVAL_REQUIRED_YES = "#q5ivIsApprovalRequiredYes";
const QUESTION5_APPROVAL_REQUIRED_NO = "#q5ivIsApprovalRequiredNo";
const QUESTION5_APPROVAL_REQUIRED_DONOTKNOW =
  "#q5ivIsApprovalRequiredDoNotKnow";
const QUESTION5_LICENSE_REQUIRED_YES = "#q5iiiIsLicenseRequiredYes";
const QUESTION5_LICENSE_REQUIRED_NO = "#q5iiiIsLicenseRequiredNo";
const QUESTION5_LICENSE_REQUIRED_DONOTKNOW = "#q5iiiIsLicenseRequiredDoNotKnow";
const QUESTION5_LICENSE_REQUIRED_ADDITIONAL_INFO = "#q5ivAdditionalInfo";
const QUESTION5_IS_DUALUSE_YES = "#q5ivIsDualUseYes";
const QUESTION5_IS_DUALUSE_NO = "#q5ivIsDualUseNo";
const QUESTION5_IS_DUALUSE_UNCERTAIN = "#q5ivIsDualUseUncertain";
const QUESTION5_IS_DUALUSE_ADDITIONAL_INFO = "#q5ivAdditionalInfo";
const QUESTION5_VIAITEM_NAME = "#q5ivaItemName";
const QUESTION5_VIAITEM_DESC = "#q5ivaDescription";
const QUESTION5_VI_ADDANOTHER_NO = "#q5ivbAddAnotherNo";
const QUESTION5_VI_ADDANOTHER_YES = "#q5ivbAddAnotherYes";
const QUESTION5_IS_PARTY_TO_YES = "#q5vIsPartyToYes";
const QUESTION5_IS_PARTY_TO_NO = "#q5vIsPartyToNo";
const QUESTION5_IS_PARTY_TO_DONOTKNOW = "#q5vIsPartyToDoNotKnow";
const QUESTION5_IS_PARTY_TO_ADDI_INFO = "#q5vAdditionalInfo";
const QUESTION5_IA_SUPPLY_RELATIONSHIP = "#q5vaSupplyRelationship";
const QUESTION5_IA_DEPARMENT = "#q5vaDepartment";
const QUESTION5_IA_ENTI = "#q5vaEntity";
const QUESTION5_IB_ANOTHER_YES = "#q5vbAddAnotherYes";
const QUESTION5_IB_ANOTHER_NO = "#q5vbAddAnotherNo";
const QUESTION5_IS_FUNDED_RESEARCH_YES = "#q5viIsFundedResearchYes";
const QUESTION5_IS_FUNDED_RESEARCH_NO = "#q5viIsFundedResearchNo";
const QUESTION5_IS_FUNDED_RESEARCH_DONOTKNOW = "#q5viIsFundedResearchDoNotKnow";
const QUESTION5_IS_FUNDED_RESEARCH_ADDI_INFO = "#q5viAdditionalInfo";
const QUESTION5_IA_NAME1 = "#q5viaName";
const QUESTION5_IA_DESC1 = "#q5viaDescription";
const QUESTION5_IA_DEPARTMENT1 = "#q5viaDepartment";
const QUESTION5_IS_FUNDED_RESEARCH_ADDI_INFO1 = "#q5viaEntity";
const QUESTION5_IB_ANOTHER_YES1 = "#q5vibAddAnotherYes";
const QUESTION5_IB_ANOTHER_NO1 = "#q5vibAddAnotherNo";

const QUESTION5_NSVSC_YES = "#q5viiIsNSVSCYes";
const QUESTION5_NSVSC_NO = "#q5viiIsNSVSCNo";
const QUESTION5_NSVSC_DONOTKNOW = "#q5viiIsNSVSCDoNotKnow";
const QUESTION5_NSVSC_ADD_INFO = "#q5viiAdditionalInfo";
const QUESTION5_NSVSC_LEVEL = "#q5viiaLevel";
const QUESTION5_NSVSC_HOWMANY = "#q5viiaHowMany";
const QUESTION5_NSVSC_ADD_ANOTHER_YES = "#q5viibAddAnotherYes";
const QUESTION5_NSVSC_ADD_ANOTHER_NO = "#q5viibAddAnotherNo";

//Question 6

const filePath = "Image/abc.pdf";
const QUESTION6_SUBMIT_BUTTON_PG1_SUCCESS = "#submitButtonQ6Pg1Success";
const QUESTION6_CONT_TEXT_VALIDATION = ".govuk-notification-banner__content";
const QUESTION6_SUBMIT_BUTTON_PG2_SUCCESS = "#submitButtonQ6Pg2Success";
const QUESTION6_NON_Uk_GOVT_YES = "#q6iiiNonUKGovtYes";
const QUESTION6_NON_Uk_GOVT_NO = "#q6iiiNonUKGovtNo";
const QUESTION6_NON_Uk_GOVT_DONOTKNOW = "#q6iiiNonUKGovtDontKnow";
const QUESTION6_ADD_NONUK_GOVERNMENT_YES = "#addNonUKGovernmentYes";
const QUESTION6_ADD_NONUK_GOVERNMENT_NO = "#addNonUKGovernmentNo";
const QUESTION6_NONUK_GOVERNMENT_NAME = "#q6iiiNonUKGovernmentName";
const QUESTION6_GOVERNMENT_INTEREST = "#q6iiiGovernmentInterest";
const QUESTION6_ADDITIONAL_INFORMATION = "#q6vAdditionalInformation";

//const SAVEBUTTON = "//button[contains(text(),'Save & Continue')]";
const QUESTION6_STATUS = "#question6b-status";

class TaskListPage {
  MandatoryTasklistURL() {
    cy.visit("https://nsinotification.azurewebsites.net/mandatory/task-list");
  }
  FormMandatory() {
    cy.get(CREATE_NEW_NOTIFICATION).click();
    cy.WaitForBrowser();
    cy.get(FORM_TYPE_MANDATORY).click();
    cy.WaitForBrowser();
    cy.xpath(SAVEBUTTON).click();
    cy.get(NOTIFICATION_REFERENCE).type("REF13456");
    cy.xpath(SAVEBUTTON).click();
  }

  FormVoluntary() {
    cy.get(CREATE_NEW_NOTIFICATION).click();
    cy.WaitForBrowser();
    cy.get(FORM_TYPE_VOLUNTARY).click();
    cy.WaitForBrowser();
    cy.xpath(SAVEBUTTON).click();
  }

  Readandaccept() {
    common.navigateApplicationLink(READ_AND_ACCEPT_GUIDELINES);
    cy.WaitForBrowser();
    cy.get(GUIDELINESACCEPTED).click();
    cy.WaitForBrowser();
    cy.get(SUBMITTEDGUIDELINES).click();
    cy.WaitForBrowser();
    // cy.get(STEP1_STATUS).invoke('text').should('eq','Completed');
    //common.statusCheck("Read and accept guidelines");
  }

  Question1(testData) {
    cy.WaitForBrowser();
    common.navigateApplicationLink("About you and the");
    cy.get(ACQUIRING_PARTY).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(ACQUIRER_FULLNAME).type(testData.acquirerFullname);
    cy.get(ACQUIRER_INDIVIDUAL).type(testData.acquirerIndividual);
    cy.get(ACQUIRER_POSITION).type(testData.acquirerPosition);
    //cy.get()
    cy.get(ACQUIRER_BUSINESSADDRESS).type(testData.acquirerBusinessAddress);
    cy.get(QUESTION1_EMAIL).type(testData.acquirerEmail);
    cy.get(QUESTION1_TELEPHONE).type(testData.acquirerTelephine);
    cy.get(QUESTION1_AUTHORISED_YES).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION1_ADDITIONAL_ACQUIRER_YES).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION1_MULTINOTIFIE_NAME).type(testData.acquirerMultinotiferName);
    cy.get(QUESTION1_MULTINOTIFER_INDU_NAME).type(
      testData.acquirerMultinotifierIndividualName
    );
    cy.get(QUESTION1_NOTIFIER_REPRESENTATIVE).type(
      testData.acquirerNotifierRepresentantive
    );
    cy.get(QUESTION1_NOTIFIER_PERCENTAGE).type(
      testData.acquirerNotifierPercentage
    );
    cy.get(QUESTION1_NOTIFIER_ADDRESS).type(testData.acquirerNotifierAddress);
    cy.get(QUESTION1_NOTIFIER_Phone).type(testData.acquirerNotifierPhone);
    cy.get(QUESTION1_NOTIFIER_EMAIL).type(testData.acquirerNotifierEmail);
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION1_ADD_ANOTHERACQUIRER_NO).click();
    cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION1_PREVIOUS_NOTICICATION_NO).click();
    //  cy.xpath(SAVEBUTTON).click();
    //common.statusCheck("About you and the acquiring party");
  }

  Question2(testData) {
    cy.WaitForBrowser();
    common.navigateApplicationLink("Related notifications");
    cy.get(QUESTION2_SUBMIT_TWELVE_YES).click();
    cy.xpath(SAVEBUTTON).click();
    // cy.get("#q2iCaseReference").type("Abc12222")
    if (testData.questionCaseReference == "") {
      cy.xpath(SAVEBUTTON).click();
      cy.get(ERROR_MESSAGE_TEXT).contains("Enter a case reference");
      cy.get(QUESTION2_CASE_REFERENCE).clear().type(faker.datatype.string(20));
    } else {
      cy.get(QUESTION2_CASE_REFERENCE)
        .clear()
        .type(testData.questionCaseReference);
    }
    // cy.get(QUESTION2_COUNTRY_NAME).type("UK");
    //cy.get(QUESTION2_CASE_REFERENCE1).type("ABC987654");
    //cy.get(QUESTION2_ADDITIONAL_INFO).type("QUESTION2 Additional information");
    cy.xpath(SAVEBUTTON).click();

    cy.get(QUESTION2_ADD_ANOTHER_NOTIFICATION_YES).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION2_CASE_REFERENCE).type("ABC987654");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION2_ADD_ANOTHER_NOTIFICATION_NO).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION2_SUBMIT_TWELVE_YES1).click();
    if (testData.questionAdditionalInfo == "") {
      cy.xpath(SAVEBUTTON).click();
      cy.get(ERROR_MESSAGE_TEXT).contains("Enter");
      cy.get(QUESTION2_ADDITIONAL_INFO).type(faker.datatype.string(20));
    } else {
      cy.get(QUESTION2_ADDITIONAL_INFO)
        .clear()
        .type(testData.questionAdditionalInfo);
    }
    cy.xpath(SAVEBUTTON).click();

    //cy.get(QUESTION2_CASEREFERENCE).type("Notifications")
    // cy.get(QUESTION2_DATE_SUBMISSION_DAY).type("10");
    // cy.get(QUESTION2_DATE_SUBMISSION_MONTH).type("05");
    //cy.get(QUESTION2_DATE_SUBMISSION_YEAR).type("2019");
    //cy.xpath(SAVEBUTTON).click();
    //cy.get( QUESTION2_ADD_ANOTHER_NOTIFICATION_NO).click();
    // cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION2_IV_US).click();
    // cy.get(QUESTION2_IV_INFO_CASENO_US).type("US1234")
    // cy.get(QUESTION2__IV_INFO_ADDTIONAL_US).type("US Additional Info");
    // cy.get(QUESTION2_IV_CANADA).click();
    // cy.get(QUESTION2_IV_INFO_CASENO_CANADA).type("CANADA1234");
    // cy.get(QUESTION2__IV_INFO_ADDTIONAL_CANADA ).type("CANADA Additional Info");
    // cy.get(QUESTION2_IV_AUSTRALIA).click();
    // cy.get(QUESTION2_IV_INFO_CASENO_AUSTRALIA).type("AUST 1234");
    // cy.get(QUESTION2__IV_INFO_ADDTIONAL_AUSTRALIA).type("AUSTRALIA Additional Info");
    // cy.get(QUESTION2_IV_NEWZEALAND).click();
    // cy.get(QUESTION2_IV_INFO_CASENO_NEWZEALAND).type("NEWZELAND 1234");
    // cy.get(QUESTION2__IV_INFO_ADDTIONAL_NEWZELAND).type("NEWZELAND Additional Info");
    // cy.xpath(SAVEBUTTON).click();
    //common.statusCheck("Question 2");
  }

  Question3(testData) {
    cy.WaitForBrowser();
    common.navigateApplicationLink("Relevant sectors and trigger events");
    cy.get(QUESTION3_SECTOR1).click();
    cy.get(QUESTION3_SECTOR2).click();
    cy.get(QUESTION3_SECTOR3).click();
    cy.get(QUESTION3_SECTOR4).click();
    cy.get(QUESTION3_SECTOR5).click();
    cy.get(QUESTION3_SECTOR6).click();
    cy.get(QUESTION3_SECTOR7).click();
    cy.get(QUESTION3_SECTOR8).click();
    cy.get(QUESTION3_SECTOR9).click();
    cy.get(QUESTION3_SECTOR10).click();
    cy.get(QUESTION3_SECTOR11).click();
    cy.get(QUESTION3_SECTOR12).click();
    cy.get(QUESTION3_SECTOR13).click();
    cy.get(QUESTION3_SECTOR14).click();
    cy.get(QUESTION3_SECTOR15).click();
    cy.get(QUESTION3_SECTOR16).click();
    cy.get(QUESTION3_SECTOR17).click();
    cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION3_REASON).type("This is Question 3 Reason");
    //  cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION3_PERCENT_25).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION3_ACQUISITION_YES).click();
    if (testData.aquisitionAndVotingDetails == "") {
      cy.xpath(SAVEBUTTON).click();
      cy.get(ERROR_MESSAGE_TEXT).contains(
        "Enter a description of the acquisition and voting rights"
      );
      cy.get(QUESTION3_ACQUISITION_DETAILS1).type(
        "Acquisition Details_" + faker.datatype.number({ min: 1, max: 10 })
      );
    } else {
      cy.get(QUESTION3_ACQUISITION_DETAILS1).type(
        testData.aquisitionAndVotingDetails
      );
    }
    cy.xpath(SAVEBUTTON).click();
    //common.statusCheck("Question 3");
  }

  Question4(testData) {
    cy.WaitForBrowser();
    common.navigateApplicationLink("Key dates");
    cy.get(QUESTION4_AQUISITIONDATE_DAY).type(testData.q4aquisitionDateDay);
    cy.get(QUESTION4_AQUISITIONDATE_MONTH).type(testData.q4aquisitionDateMonth);
    cy.get(QUESTION4_AQUISITIONDATE_YEAR).type(testData.q4aquisitionDateYear);
    cy.get(QUESTION4_AQUISITIONDATE_ADDINFO).type("QUESTION 4 Additional Info");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION4_ADDANOTHER_REGULATORY_APP_YES).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION4_REGULATORY_APPROVAL_DAY).type(
      testData.q4regulatoryApprovalDay
    );
    cy.get(QUESTION4_REGULATORY_APPROVAL_MONTH).type(
      testData.q4regulatoryApprovalMonth
    );
    cy.get(QUESTION4_REGULATORY_APPROVAL_YEAR).type(
      testData.q4regulatoryApprovalYear
    );
    cy.get(QUESTION4_REGULATORY_APPROVAL_NAME).type(
      testData.q4regulatoryApprovalName
    );
    cy.get(QUESTION4_REGULATORY__ADD_INFO).type("Addtional Info");
    cy.xpath(SAVEBUTTON).click();
    cy.WaitForBrowser();
    cy.get(QUESTION4_REGULATORY_APPROVAL_CHANGE).click();
    cy.get(QUESTION4_REGULATORY_APPROVAL_NAME).type(
      testData.q4regulatoryApprovalName
    );
    cy.xpath(SAVEBUTTON).click();
    cy.WaitForBrowser();
    cy.get(QUESTION4_REGULATORY_APPROVAL_REMOVE).click();
    cy.get(QUESTION4_REGULATORY_APPROVAL_REMOVE_NO).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION4_REGULATORY_APPROVAL_REMOVE).click();
    cy.get(QUESTION4_REGULATORY_APPROVAL_REMOVE_YES).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION4_ADDANOTHER_REGULATORY_APP_NO).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION4_ADDTIONAL_KEYDATES_YES).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION4_KEYDATE_DAY).type(testData.q4keyDateDay);
    cy.get(QUESTION4_KEYDATE_MONTH).type(testData.q4keyDateMonth);
    cy.get(QUESTION4_KEYDATE_YEAR).type(testData.q4keyDateYear);
    cy.get(QUESTION4_KEYDATE_SHORT_DESC).type("QUESTION4 SHORT DESCRIPTION");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION4_ADDTIONAL_KEYDATES_NO).click();
    cy.xpath(SAVEBUTTON).click();
    //  common.statusCheck("Question 4");
  }
  Question5(testData) {
    cy.WaitForBrowser();
    common.navigateApplicationLink("About the qualifying entity");
    cy.get(QUESTION5_QUALIFYING_ENTITY_NAME).type(
      testData.q5qualifyingEntityName
    );
    cy.get(QUESTION5_INDIVIDUAL_QUALIFYING_ENTITY_NAME).type(
      "INDIVIDUAL_QUALIFYING_ENTITY_NAME"
    );
    cy.get(QUESTION5_EMAIL).type("question5@acubed.it");
    cy.get(QUESTION5_TELEPHONE).type("09999999999");
    cy.get(QUESTION5_COMPANIESHOUSE).type(testData.q5companieshouse);
    cy.get(QUESTION5_SIC).type(testData.q5sic);
    //cy.get(QUESTION5_COUNTRY).type("UK");
    cy.get(QUESTION5_REGISTRATION).type(testData.q5registration);
    cy.get(QUESTION5_ACTIVITIES_YES).click();
    cy.get(QUESTION5_ACTIVITIES_DESCRIPTION).type("Activites description");
    cy.get(QUESTION5_BUSINESS_ADDRESS).type("Victory ,LONDON,UK");
    cy.get(QUESTION5_WEBSITE).type(testData.q5website);
    cy.get(QUESTION5_DESCRIPTION).type("QUESTION5 DESCRIPTION");
    //cy.get(QUESTION5_ADDITIONAL_INFO).type("QUESTION5 ADDITIONAL INFORMATION");
    cy.xpath(SAVEBUTTON).click();
    cy.WaitForBrowser();
    cy.get(QUESTION5_IS_AUTHORISED_YES).click();
    //cy.get(QUESTION5_IS_LISTED_ADDITIONAL_INFO).type(ADDINFO);
    cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION5_ADDANOTHER_NO).click();
    // cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION5_PROTECTED_LIST).type("Question 5 Protected LIST");
    // cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION5_ADDANOTHER_NO).click();
    // cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION5_AUTHORISED_YES).click();
    // cy.get(QUESTION5_AUTHORISED_ADDTIONAL_INFO).type("Question5 Addtional Information");
    // cy.xpath(SAVEBUTTON).click();
    cy.WaitForBrowser();
    common.selectDropdown(
      "//select[@id='q5iiaHighestClassification']",
      "Official"
    );
    common.selectDropdown("//select[@id='q5iiaDepartment']", "Cabinet Office");
    cy.get(QUESTION5_OTHERL_INFO).type("QUESTION5_OTHERL_INFO");
    cy.get(QUESTION5_DESCRIPTION1).type("QUESTION5_DESCRIPTION1");
    cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION5_AUTHORISED_ADDTIONAL_INFO).type( "QUESTION5_AUTHORISED_ADDTIONAL_INFO"    );
    // cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_ADDANOTHER_NO3).click();
    cy.xpath(SAVEBUTTON).click();
    //cy.get(QUESTION5_APPROVAL_REQUIRED_NO).click();
    //cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_LICENSE_REQUIRED_NO).click();
    //cy.get(QUESTION5_LICENSE_REQUIRED_ADDITIONAL_INFO).type("ADDTIONAL INFO FOR LICENSE" );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_IS_DUALUSE_YES).click();
    // cy.get(QUESTION5_IS_DUALUSE_ADDITIONAL_INFO).type( "QUESTION5 IS DUALUSE ADDITIONAL INFO"   );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_VIAITEM_NAME).type("BEIS");
    cy.get(QUESTION5_VIAITEM_DESC).type("BEIS Q5 Addtional Information");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_VI_ADDANOTHER_NO).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_IS_PARTY_TO_YES).click();
    //cy.get(QUESTION5_IS_PARTY_TO_ADDI_INFO).type("QUESTION5 IS PARTY TO Additional Information "    );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_IA_SUPPLY_RELATIONSHIP).type("Supply Relationship ");
    common.selectDropdown("//select[@id='q5vaArea']", "Defence");
    cy.get(QUESTION5_IA_DEPARMENT).type("Defence");
    cy.get(QUESTION5_IA_ENTI).type("ENTI");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_IB_ANOTHER_NO).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_IS_FUNDED_RESEARCH_YES).click();
    //cy.get(QUESTION5_IS_FUNDED_RESEARCH_ADDI_INFO).type( "QUESTION5 IS FUNDED RESEARCH Additional Infor" );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_IA_NAME1).type("BEIS -ISU");
    common.selectDropdown("//select[@id='q5viaArea']", "Defence");
    cy.get(QUESTION5_IA_DESC1).type("BEIS -ISU Project");
    cy.get(QUESTION5_IA_DEPARTMENT1).type(testData.q5iaDepartment);
    cy.get(QUESTION5_IS_FUNDED_RESEARCH_ADDI_INFO1).type(
      "BEIS -ISU  Additional Information"
    );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_IB_ANOTHER_NO1).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_NSVSC_YES).click();
    // cy.get(QUESTION5_NSVSC_ADD_INFO).type("QUESTION5 NSVSC Add Infor");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_NSVSC_LEVEL).type("SC");
    cy.get(QUESTION5_NSVSC_HOWMANY).type(" 1");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_NSVSC_ADD_ANOTHER_NO).click();
    cy.xpath(SAVEBUTTON).click();
    //common.statusCheck("Question 5");
  }

  Question6(testData) {
    cy.WaitForBrowser();
    common.navigateApplicationLink(
      "Ownership and structure of qualifying entity"
    );

    common.Fileupload(filePath);
    cy.wait(1000);
    cy.xpath(SAVEBUTTON).click();
    /*
    cy.get(QUESTION6_CONT_TEXT_VALIDATION).should(
      "contain",
      "You have successfully uploaded the pre-acquisition chart pdf document: abc.pdf"
    );
     // cy.get(QUESTION6_SUBMIT_BUTTON_PG1_SUCCESS).click();
    */

    cy.wait(1000);

    common.Fileupload(filePath);
    cy.wait(1000);
    cy.xpath(SAVEBUTTON).click();
    cy.wait(1000);
    /* cy.get(QUESTION6_CONT_TEXT_VALIDATION).should(
      "contain",
      "You have successfully uploaded the post-acquisition chart pdf document: abc.pdf"
    );
     //cy.get(QUESTION6_SUBMIT_BUTTON_PG2_SUCCESS).click();
    */

    cy.get(QUESTION6_NON_Uk_GOVT_YES).click();
    cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION6_ADD_NONUK_GOVERNMENT_YES).click();
    // cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION6_NONUK_GOVERNMENT_NAME).type(
      "QUESTION6 NONUK GOVERNMENT NAME"
    );
    cy.get(QUESTION6_GOVERNMENT_INTEREST).type(testData.q7nameofnonukgov);
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION6_ADD_NONUK_GOVERNMENT_NO).click();
    cy.xpath(SAVEBUTTON).click();
    /*  cy.get(QUESTION6_ADDITIONAL_INFORMATION).type(
      "QUESTION6 ADDITIONAL INFORMATION"
    );
    
    cy.xpath(SAVEBUTTON).click();
    */
    //common.statusCheck("Question 6");
  }
}
export default TaskListPage;
