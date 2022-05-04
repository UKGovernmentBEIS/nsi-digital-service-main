//import './Login';
import faker from "faker";
import CommonFunctions from "./CommonFunctions";
let common = new CommonFunctions();

//Common ID
const SAVEBUTTON = "//button[contains(text(),'Save and continue')]";
const INPUT_VALUE = "ABC";
const EMAIL = "ABC@acubed.it";
const ADDINFO = "Question5 Addtional INFO";
const CREATE_NEW_NOTIFICATION = ":nth-child(1) > b > .task-link";
const FORM_TYPE_MANDATORY = "#formTypeMandatory";
const FORM_TYPE_VOLUNTARY = "#formTypeVoluntary";
const FORM_TYPE_RETROSOECTIVE = "#formTypeRetrospective";
const NOTIFICATION_REFERENCE = "#userNotificationReference";
const ERROR_MESSAGE_TEXT = ".govuk-list > li > a";

//Read and accept guidelines
const READ_AND_ACCEPT_GUIDELINES = "Read and accept guidelines";
const GUIDELINESACCEPTED = "#guidelinesAccepted";
const SUBMITTEDGUIDELINES = "#submitButtonGuidelines";
const STEP1_STATUS = "#finalapp-status";

//Question 1
const QUESTION1_WHICH_TYPE_ACQUIRER = "#q10WhichTypeAcquirer";
const QUESTION1_WHICH_TYPE_SELLER = "#q10WhichTypeSeller";
const QUESTION1_WHICH_TYPE_QE = "#q10WhichTypeQE";
const QUESTION1_NOTIFYINGPARTY_OR_REPRESENTATIVE1 =
  "#q1iNotifyingPartyOrRepresentative1";
const QUESTION1_NOTIFYINGPARTY_OR_REPRESENTATIVE2 =
  "#q1iNotifyingPartyOrRepresentative2";
const QUESTION1_NOTIFYINGPARTY_NAME = "#q1iiNotifyingPartyName";
const QUESTION1_NOTIFYINGPARTY_BUSINESS_ADDRESS =
  "#q1iiNotifyingPartyBusinessaddress";
const QUESTION1_NOTIFYINGPARTY_INDIVIDUAL = "#q1iiNotifyingPartyIndividual";
const QUESTION1_NOTIFYINGPARTY_PARTY_POSITION = "#q1iiNotifyingPartyPosition";
const QUESTION1_NOTIFYINGPARTY_EMAIL = "#q1iiNotifyingPartyEmail";
const QUESTION1_NOTIFYINGPARTY_TELEPHONE = "#q1iiNotifyingPartyTelephone";
const QUESTION1_AUTHORISED_YES = "#q1iiAuthorisedYes";
const QUESTION1_AUTHORISED_NO = "#q1iiAuthorisedNo";
const QUESTION1_ADDITIONAL_ACQUIRER_YES = "#q1ivAdditionalAcquirerYes";
const QUESTION1_ADDITIONAL_ACQUIRER_NO = "#q1ivAdditionalAcquirerNo";
const QUESTION1_ADDITIONAL_ACQUIRER_DONOTKNOW =
  "#q1ivAdditionalAcquirerDoNotKnow";
const QUESTION1_MULTI_NOTIFIER_NAME = "#q1ivaMultinotifiername";
const QUESTION1_MULTI_NOTIFIER_INDIVIDUAL_NAME =
  "#q1ivaMultinotifierindividualname";
const QUESTION1_MULTI_NOTIFIER_REPRESENTATIVE =
  "#q1ivaMultinotifierRepresentative";
const QUESTION1_MULTI_NOTIFIER_PERCENTAGE = "#q1ivaMultinotifierPercentage";
const QUESTION1_MULTI_NOTIFIER_ADDRESS = "#q1ivaMultinotifierAddress";
const QUESTION1_MULTI_NOTIFIER_PHONE = "#q1ivaMultinotifierPhone";
const QUESTION1_MULTI_NOTIFIER_EMAIL = "#q1ivaMultinotifierEmail";
const QUESTION1_ADD_ANOTHER_YES = "#q1ivbAddAnotherYes";
const QUESTION1_ADD_ANOTHER_NO = "#q1ivbAddAnotherNo";
const QUESTION1_PREVIOUS_NOTIFICATION_YES = "#q1vPreviousNotificationYes";
const QUESTION1_PREVIOUS_NOTIFICATION_REF = "#q1vPreviousNotificationRef";
const QUESTION1_PREVIOUS_NOTIFICATION_NO = "#q1vPreviousNotificationNo";
const QUESTION1_PREVIOUS_NOTIFICATION_DONOTKNOW =
  "#q1vPreviousNotificationDoNotKnow";

//Question 2
const QUESTION2_SUBMIT_TWELVE_YES = "#q2iSubmitTwelveYes";

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
const QUESTION3_ACQUISITION_INCONTEMPLATION =
  "#q3iaAcquisitionInContemplationOrTakenPlace1";
const QUESTION3_ACQUISITION_TAKENPLACE =
  "#q3iaAcquisitionInContemplationOrTakenPlace2";
const QUESTION3_QUALIFYING_ASSET = "#q3iiQualifyingAssetOrQualifyingEntity1";
const QUESTION3_QUALIFYING_ENTITY = "#q3iiQualifyingAssetOrQualifyingEntity2";
const QUESTION3_QUALIFYING_ENTITY_YES = "#question32aQualifyingEntityYes";
const QUESTION3_QUALIFYING_ENTITY_NO = "#question32aQualifyingEntityNo";
const QUESTION3_QUALIFYING_ENTITY_DETAILS =
  "#question32aQualifyingEntityDetails";

//Question 4
const QUESTION4_AQUISITIONDATE_DAY = "#q4iaquisitionDateDay";

//Question 5

const QUESTION5_NAME_ASSET = "#q5altiNameOfAsset";
const QUESTION5_ASSET_TYPE_LAND = "#q5altiAssetTypeLand";
const QUESTION5_ASSET_TYPE_PROPERTY = "#q5altiAssetTypeProperty";
const QUESTION5_ASSET_TYPE_ECONOMIC = "#q5altiAssetTypeEconomicValue";
const QUESTION5_ADDRESS = "#q5altiAddress";
const QUESTION5_DESCRIPTION_1 = "#q5altiDescription";
const QUESTION5_ADDITIONAL_INFO_1 = "#q5altiAdditionalInfo";

const QUESTION5_REGISTRATION = "#q5iRegistration";
const QUESTION5_ACTIVITIES_YES = "#q5iActivitiesYes";
const QUESTION5_ACTIVITIES_NO = "#q5iActivitiesNo";
const QUESTION5_ACTIVITIES_DESCRIPTION = "#q5iActivitiesDescription";
const QUESTION5_BUSINESS_ADDRESS = "#q5iBusinessAddress";
const QUESTION5_WEBSITE = "#q5iWebsite";
const QUESTION5_DESCRIPTION = "#q5iDescription";
//const QUESTION5_ADDITIONAL_INFO ='#q5iAdditionalInfo';
const QUESTION5_IS_AUTHORISED_YES = "#q5altiiIsAuthorisedYes"; //"#q5iiIsAuthorisedYes";
const QUESTION5_IS_AUTHORISED_NO = "#q5altiiIsAuthorisedNo"; //"#q5iiIsAuthorisedNo";
const QUESTION5_IS_AUTHORISED_DONOTKNOW = "#q5altiiIsAuthorisedDoNotKnow"; //"#q5iiIsAuthorisedDoNotKnow";
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
const QUESTION5_AUTHORISED_ADDTIONAL_INFO = "#q5altiiaAdditionalInfo";
const QUESTION5_HIGHEST_CLASSIFICATION = "#q5iiaHighestClassification";
const QUESTION5_OTHERL_INFO = "#q5altiiaOther";
const QUESTION5_DESCRIPTION1 = "#q5altiiaDescription";
const QUESTION5_DEPARTMENT = "#q5iiiaDepartment";
const QUESTION5_ADDANOTHER_YES3 = "#q5altiibAddAnotherYes";
const QUESTION5_ADDANOTHER_NO3 = "#q5altiibAddAnotherNo";
const QUESTION5_APPROVAL_REQUIRED_YES = "#q5ivIsApprovalRequiredYes";
const QUESTION5_APPROVAL_REQUIRED_NO = "#q5ivIsApprovalRequiredNo";
const QUESTION5_APPROVAL_REQUIRED_DONOTKNOW =
  "#q5ivIsApprovalRequiredDoNotKnow";
const QUESTION5_LICENSE_REQUIRED_YES = "#q5altiiiIsLicenseRequiredYes";
const QUESTION5_LICENSE_REQUIRED_NO = "#q5altiiiIsLicenseRequiredNo";
const QUESTION5_LICENSE_REQUIRED_DONOTKNOW = "#q5iiiIsLicenseRequiredDoNotKnow";
const QUESTION5_LICENSE_REQUIRED_ADDITIONAL_INFO = "#q5ivAdditionalInfo";
const QUESTION5_IS_DUALUSE_YES = "#q5altivIsDualUseYes";
const QUESTION5_IS_DUALUSE_NO = "#q5altivIsDualUseNo";
const QUESTION5_IS_DUALUSE_UNCERTAIN = "#q5altivIsDualUseUncertain";
const QUESTION5_IS_DUALUSE_ADDITIONAL_INFO = "#q5altivAdditionalInfo";
const QUESTION5_VIAITEM_NAME = "#q5altivaItemName";
const QUESTION5_VIAITEM_DESC = "#q5altivaDescription";
const QUESTION5_VI_ADDANOTHER_NO = "#q5altivbAddAnotherNo";
const QUESTION5_VI_ADDANOTHER_YES = "#q5altivbAddAnotherYes";
const QUESTION5_DATA_YES = "#q5altvDataYes";
const QUESTION5_DATA_DESC = "#q5altvDescription";
const QUESTION5_DATA_ADD_INFO = "#q5altvAdditionalInfo";
const QUESTION5_DATA_NO1 = "#q5altviDataNo";
const QUESTION5_DATA_YES1 = "#q5altviDataYes";
const QUESTION5_DATA_ADD_INFO1 = "#q5altviAdditionalInfo";

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

const QUESTION6_CONTRACTUAL_ARRANGEMENT_ASSET_YES =
  "#q6iiiContractualArrangementAssetYes";
const QUESTION6_ADDITIONAL_INFORMATION = "#q6vAdditionalInformation";

//Question 8
//const filePath = "Image/Testing.pdf"; //abc.JPG';
const QUESTION8_CONT_TEXT_VALIDATION = ".govuk-notification-banner__content";
const QUESTION8_CONTINUE = "#q8iSubmitButton";
const QUESTION8_BOARD_MEMBERS_YES = "#q8iiBoardMembersYes";
const QUESTION8_BOARD_MEMBERS_NO = "#q8iiBoardMembersNo";
const QUESTION8_BOARD_MEMBERS_NAME = "#q8iiNameOfBoardMember";
const QUESTION8_BOARD_MEMBERS_DOB_DAY = "#q8iiDateOfBirthDay"; //'#q4iiDateOfBirthDay';
const QUESTION8_BOARD_MEMBERS_DOB_MONTH = "#q8iiDateOfBirthMonth"; //'#q4iiDateOfBirthMonth';
const QUESTION8_BOARD_MEMBERS_DOB_YEAR = "#q8iiDateOfBirthYear"; //'#q4iiDateOfBirthYear';
const QUESTION8_BOARD_MEMBERS_POSITION_HELD = "#q8iiPositionHeld";
const QUESTION8_CLASSIFIED_POLITICALLY_YES = "#q8iiClassifiedPoliticallyYes";
const QUESTION8_CLASSIFIED_POLITICALLY_NO = "#q8iiClassifiedPoliticallyNo";
const QUESTION8_CLASSIFIED_POLITICALLY_NA = "#q8iiClassifiedPoliticallyNa";

//const SAVEBUTTON = "//button[contains(text(),'Save & Continue')]";
const QUESTION6_STATUS = "#question6b-status";

class VTaskListPage {
  VoluntaryTasklistURL() {
    cy.visit("https://nsinotification.azurewebsites.net/voluntary/task-list");
  }

  FormVoluntary() {
    cy.get(CREATE_NEW_NOTIFICATION).click();
    cy.WaitForBrowser();
    cy.get(FORM_TYPE_VOLUNTARY).click();
    cy.WaitForBrowser();
    cy.xpath(SAVEBUTTON).click();
    cy.get(NOTIFICATION_REFERENCE).type("REF13456");
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
    cy.get(QUESTION1_WHICH_TYPE_ACQUIRER).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION1_NOTIFYINGPARTY_OR_REPRESENTATIVE1).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION1_NOTIFYINGPARTY_NAME).type(testData.q1notifierName);
    cy.get(QUESTION1_NOTIFYINGPARTY_BUSINESS_ADDRESS).type(
      testData.q1notifierBusinessAddress
    );
    cy.get(QUESTION1_NOTIFYINGPARTY_INDIVIDUAL).type(
      testData.q1notifierIndividual
    );
    cy.get(QUESTION1_NOTIFYINGPARTY_PARTY_POSITION).type(
      testData.q1notifierPosition
    );
    cy.get(QUESTION1_NOTIFYINGPARTY_EMAIL).type(testData.q1notifierEmail);
    cy.get(QUESTION1_NOTIFYINGPARTY_TELEPHONE).type(
      testData.q1notifierTelephone
    );
    cy.get(QUESTION1_AUTHORISED_YES).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION1_ADDITIONAL_ACQUIRER_YES).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION1_MULTI_NOTIFIER_NAME).type(testData.q1MultinotiferName);
    cy.get(QUESTION1_MULTI_NOTIFIER_INDIVIDUAL_NAME).type(
      testData.q1MultinotifierIndividualName
    );
    cy.get(QUESTION1_MULTI_NOTIFIER_REPRESENTATIVE).type(
      testData.q1NotifierRepresentantive
    );
    cy.get(QUESTION1_MULTI_NOTIFIER_PERCENTAGE).type(
      testData.q1NotifierPercentage
    );
    cy.get(QUESTION1_MULTI_NOTIFIER_ADDRESS).type(testData.q1NotifierAddress);
    cy.get(QUESTION1_MULTI_NOTIFIER_PHONE).type(testData.q1rNotifierPhone);
    cy.get(QUESTION1_MULTI_NOTIFIER_EMAIL).type(testData.q1NotifierEmail);
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION1_ADD_ANOTHER_NO).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION1_PREVIOUS_NOTIFICATION_YES).click();
    cy.get(QUESTION1_PREVIOUS_NOTIFICATION_REF).type(
      testData.q1previousNotificationRef
    );
    cy.xpath(SAVEBUTTON).click();

    //common.statusCheck("About you and the");
  }

  Question2() {
    cy.WaitForBrowser();
  }

  Question3(testData) {
    cy.WaitForBrowser();
    common.navigateApplicationLink("Trigger events");
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
    cy.get(QUESTION3_ACQUISITION_INCONTEMPLATION).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION3_QUALIFYING_ASSET).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION3_QUALIFYING_ENTITY_YES).click();
    cy.get(QUESTION3_QUALIFYING_ENTITY_DETAILS).type(
      testData.q3qualifyingEntityDetails
    );
    cy.xpath(SAVEBUTTON).click();

    //common.statusCheck("Question 3");
  }

  Question4() {
    cy.WaitForBrowser();
  }
  Question5(testData) {
    cy.WaitForBrowser();
    common.navigateApplicationLink("About the qualifying asset");
    cy.get(QUESTION5_NAME_ASSET).type(testData.q5assetName);
    cy.get(QUESTION5_ASSET_TYPE_LAND).click();
    cy.get(QUESTION5_ADDRESS).type(testData.q5address);
    cy.get(QUESTION5_DESCRIPTION_1).type("QUESTION5_DESCRIPTION");
    cy.get(QUESTION5_ADDITIONAL_INFO_1).type("QUESTION5_ADDITIONAL_INFO");
    cy.xpath(SAVEBUTTON).click();

    //cy.get(QUESTION5_ADDITIONAL_INFO).type("QUESTION5 ADDITIONAL INFORMATION");
    cy.xpath(SAVEBUTTON).click();
    cy.WaitForBrowser();
    cy.get(QUESTION5_IS_AUTHORISED_YES).click();
    //cy.get(QUESTION5_IS_LISTED_ADDITIONAL_INFO).type(ADDINFO);
    cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION5_PROTECTED_LIST).type("Question 5 Protected LIST");
    // cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION5_ADDANOTHER_NO).click();
    // cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION5_AUTHORISED_YES).click();
    // cy.get(QUESTION5_AUTHORISED_ADDTIONAL_INFO).type("Question5 Addtional Information");
    // cy.xpath(SAVEBUTTON).click();
    cy.WaitForBrowser();
    common.selectDropdown(
      "//select[@id='q5altiiaHighestClassification']",
      "Official"
    );
    common.selectDropdown(
      "//select[@id='q5altiiaDepartment']",
      "Cabinet Office"
    );
    cy.get(QUESTION5_OTHERL_INFO).type(testData.q5Otherinfo);
    cy.get(QUESTION5_DESCRIPTION1).type("QUESTION5_DESCRIPTION1");
    cy.get(QUESTION5_AUTHORISED_ADDTIONAL_INFO).type(
      testData.q5authorisedAddtionalInfo
    );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_ADDANOTHER_NO3).click();
    cy.xpath(SAVEBUTTON).click();
    //cy.get(QUESTION5_APPROVAL_REQUIRED_NO).click();
    //cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_LICENSE_REQUIRED_NO).click();
    //cy.get(QUESTION5_LICENSE_REQUIRED_ADDITIONAL_INFO).type("ADDTIONAL INFO FOR LICENSE" );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_IS_DUALUSE_YES).click();
    cy.get(QUESTION5_IS_DUALUSE_ADDITIONAL_INFO).type(
      "QUESTION5 IS DUALUSE ADDITIONAL INFO"
    );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_VIAITEM_NAME).type(testData.q5viaitemName);
    cy.get(QUESTION5_VIAITEM_DESC).type("BEIS Q5 Addtional Information");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_VI_ADDANOTHER_NO).click();
    cy.xpath(SAVEBUTTON).click();

    cy.get(QUESTION5_DATA_YES).click();
    cy.get(QUESTION5_DATA_DESC).type(testData.q5dataDescription);
    cy.get(QUESTION5_DATA_ADD_INFO).type("QUESTION5_DATA_ADD_INFO ");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_DATA_NO1).click();
    cy.get(QUESTION5_DATA_ADD_INFO1).type("QUESTION5_DATA_ADD_INFO ");
    cy.xpath(SAVEBUTTON).click();

    /* cy.get(QUESTION5_IA_SUPPLY_RELATIONSHIP).type("Supply Relationship ");
    common.selectDropdown("//select[@id='q5vaArea']", "Defence");
    cy.get(QUESTION5_IA_DEPARMENT).type("Defence");
    cy.get(QUESTION5_IA_ENTI).type("ENTI");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_IB_ANOTHER_NO).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_IS_FUNDED_RESEARCH_YES).click();
    cy.get(QUESTION5_IS_FUNDED_RESEARCH_ADDI_INFO).type(
      "QUESTION5 IS FUNDED RESEARCH Additional Infor"
    );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_IA_NAME1).type("BEIS -ISU");
    common.selectDropdown("//select[@id='q5viaArea']", "Defence");
    cy.get(QUESTION5_IA_DESC1).type("BEIS -ISU Project");
    cy.get(QUESTION5_IA_DEPARTMENT1).type("BEIS -ISU");
    cy.get(QUESTION5_IS_FUNDED_RESEARCH_ADDI_INFO1).type(
      "BEIS -ISU  Additional Information"
    );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_IB_ANOTHER_NO1).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_NSVSC_YES).click();
    cy.get(QUESTION5_NSVSC_ADD_INFO).type("QUESTION5 NSVSC Add Infor");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_NSVSC_LEVEL).type("SC");
    cy.get(QUESTION5_NSVSC_HOWMANY).type(" 1");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_NSVSC_ADD_ANOTHER_NO).click();
    cy.xpath(SAVEBUTTON).click(); */
    //common.statusCheck("Question 5");
  }

  Question6(testData) {
    cy.WaitForBrowser();
    // common.navigateApplicationLink("Ownership and structure");
    cy.get(
      ":nth-child(3) > .app-task-list__items > :nth-child(2) > .app-task-list__task-name > a"
    ).click();
    cy.WaitForBrowser();
    common.Fileupload(filePath);
    cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION6_CONT_TEXT_VALIDATION).should("contain","You have successfully uploaded the pre-acquisition chart pdf document: abc.pdf" );
    // cy.get(QUESTION6_SUBMIT_BUTTON_PG1_SUCCESS).click();
    common.Fileupload(filePath);
    cy.xpath(SAVEBUTTON).click();
    //cy.get(QUESTION6_CONT_TEXT_VALIDATION).should("contain","You have successfully uploaded the post-acquisition chart pdf document: abc.pdf" );
    //cy.get(QUESTION6_SUBMIT_BUTTON_PG2_SUCCESS).click();
    // cy.get(QUESTION6_NON_Uk_GOVT_YES).click();
    // cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION6_ADD_NONUK_GOVERNMENT_YES).click();
    // cy.xpath(SAVEBUTTON).click();
    //cy.get(QUESTION6_NONUK_GOVERNMENT_NAME).type(    "QUESTION6 NONUK GOVERNMENT NAME"    );
    // cy.get(QUESTION6_GOVERNMENT_INTEREST).type(      "QUESTION6  GOVERNMENT INTEREST"    );
    //  cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION6_ADD_NONUK_GOVERNMENT_NO).click();
    //  cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION6_CONTRACTUAL_ARRANGEMENT_ASSET_YES).click();
    if (testData.q6AdditionalInfo == "") {
      cy.xpath(SAVEBUTTON).click();
      cy.get(ERROR_MESSAGE_TEXT).contains(
        "Enter a summary of the contractual arrangements"
      );
      cy.get(QUESTION6_ADDITIONAL_INFORMATION).type(
        "Acquisition Details_" + faker.datatype.number({ min: 1, max: 10 })
      );
    } else {
      cy.get(QUESTION6_ADDITIONAL_INFORMATION).type(testData.q6AdditionalInfo);
    }
    cy.xpath(SAVEBUTTON).click();
    //common.statusCheck("Question 6");
  }

  Question8(testData) {
    cy.WaitForBrowser();
    // common.navigateApplicationLink( "Ownership and structure of acquiring party"    );

    cy.get(
      ":nth-child(4) > .app-task-list__items > :nth-child(2) > .app-task-list__task-name > a"
    ).click();
    common.Fileupload(filePath);
    cy.xpath(SAVEBUTTON).click();
    //cy.get(QUESTION8_CONT_TEXT_VALIDATION).should("contain","You have successfully uploaded the chart pdf document: abc.pdf");
    //cy.get(QUESTION8_CONTINUE).click();
    //cy.get(QUESTION8_BOARD_MEMBERS_YES).click();
    //cy.xpath(SAVEBUTTON).click();
    if (testData.q8boardMembersName == "") {
      cy.xpath(SAVEBUTTON).click();
      cy.get(ERROR_MESSAGE_TEXT).contains(
        "Enter the name of the board member or equivalent"
      );
      cy.get(QUESTION8_BOARD_MEMBERS_NAME).type(
        "Board Memebers Name_" + faker.datatype.string(15)
      );
    } else {
      cy.get(QUESTION8_BOARD_MEMBERS_NAME).type(testData.q8boardMembersName);
    }
    cy.get(QUESTION8_BOARD_MEMBERS_DOB_DAY).type("26");
    cy.get(QUESTION8_BOARD_MEMBERS_DOB_MONTH).type("08");
    cy.get(QUESTION8_BOARD_MEMBERS_DOB_YEAR).type("2021");
    cy.get(QUESTION8_BOARD_MEMBERS_POSITION_HELD).type(
      "QUESTION8 BOARD MEMBERS POSITION HELD"
    );
    cy.get(QUESTION8_CLASSIFIED_POLITICALLY_YES).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION8_BOARD_MEMBERS_NO).click();
    cy.xpath(SAVEBUTTON).click();
    //common.statusCheck("Question 8");
  }
}
export default VTaskListPage;
