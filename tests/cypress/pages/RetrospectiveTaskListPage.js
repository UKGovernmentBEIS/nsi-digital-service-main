//import './Login';
import CommonFunctions from "./CommonFunctions";
let common = new CommonFunctions();

//Common ID
const SAVEBUTTON = "//button[contains(text(),'Save and continue')]";
const INPUT_VALUE = "ABC";
const EMAIL = "ABC@acubed.it";
const ADDINFO = "Question5 Addtional INFO";
const CREATE_NEW_NOTIFICATION = ":nth-child(1) > b > .task-link";
const FORM_TYPE_RETROSOECTIVE = "#formTypeRetrospective";
const NOTIFICATION_REFERENCE = "#userNotificationReference";

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
const QUESTION3_REASON = "#q30Reason";
const QUESTION3_PERCENT_25 = "#question3iiiPercent25";
const QUESTION3_PERCENT_50 = "#question3iiiPercent50";
const QUESTION3_PERCENT_75 = "#question3iiiPercent75";
const QUESTION3_PERCENT_25_DETAILS = "#question3iiiPercent25Details";
const QUESTION3_PERCENT_50_DETAILS = "#question3iiiPercent50Details";
const QUESTION3_PERCENT_75_DETAILS = "#question3iiiPercent75Details";
const QUESTION3_SECURE_OR_PREVENT = "#question3iiiSecureOrPrevent";

const QUESTION3_PERCENTAGE_SHARE = "#question3ivPercentageShare";
const QUESTION3_PERCENTAGE_VOTINGRIGHTS = "#question3ivPercentageVotingRights";
const QUESTION3_ACQUISITION_YES = "#question3vAcquisitionYes";
const QUESTION3_ACQUISITION_NO = "#question3vAcquisitionNo";
const QUESTION3_ACQUISITION_DETAILS = "#question3ivAcquisitionDetails";
const QUESTION3_ACQUISITION_DETAILS1 = "#question3vAcquisitionDetails";

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

class RTaskListPage {
  RetroTasklistURL() {
    cy.visit(
      "https://nsinotification.azurewebsites.net/retrospective/task-list"
    );
  }

  FormRetrospective() {
    cy.get(CREATE_NEW_NOTIFICATION).click();
    cy.WaitForBrowser();
    cy.get(FORM_TYPE_RETROSOECTIVE).click();
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
    //  cy.get(QUESTION1_PREVIOUS_NOTIFICATION_YES).click();
    //   cy.get(QUESTION1_PREVIOUS_NOTIFICATION_REF).type("REF987654567")
    //  cy.xpath(SAVEBUTTON).click();

    //common.statusCheck("About you and the");
  }

  Question2() {
    cy.WaitForBrowser();
  }

  Question3(testData) {
    cy.WaitForBrowser();
    common.navigateApplicationLink("Trigger events");
    cy.get(QUESTION3_REASON).type(testData.q3reason);
    cy.xpath(SAVEBUTTON).click();
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
    cy.get(QUESTION3_PERCENT_50).click();
    cy.get(QUESTION3_PERCENT_50_DETAILS).type(testData.q3percentgeDetails);
    cy.xpath(SAVEBUTTON).click();

    cy.get(QUESTION3_ACQUISITION_YES).click();
    cy.get(QUESTION3_ACQUISITION_DETAILS1).type(testData.q3acquisitionDetails);
    cy.xpath(SAVEBUTTON).click();

    /*
    cy.get(QUESTION3_ACQUISITION_INCONTEMPLATION).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION3_QUALIFYING_ASSET).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION3_QUALIFYING_ENTITY_YES).click();
    cy.get(QUESTION3_QUALIFYING_ENTITY_DETAILS).type("QUESTION3 QUALIFYING ENTITY DETAILS");
    cy.xpath(SAVEBUTTON).click(); */
    //common.statusCheck("Question 3");
  }

  Question4() {
    cy.WaitForBrowser();
  }
  Question5() {
    cy.WaitForBrowser();
    common.navigateApplicationLink("About the qualifying entity");
    cy.get(QUESTION5_QUALIFYING_ENTITY_NAME).type("QUALIFYING_ENTITY_NAME");
    cy.get(QUESTION5_INDIVIDUAL_QUALIFYING_ENTITY_NAME).type(
      "INDIVIDUAL_QUALIFYING_ENTITY_NAME"
    );
    cy.get(QUESTION5_EMAIL).type("question5@acubed.it");
    cy.get(QUESTION5_TELEPHONE).type("09999999999");
    cy.get(QUESTION5_COMPANIESHOUSE).type("COMPANIESHOUSE");
    cy.get(QUESTION5_SIC).type("SIC");
    cy.get(QUESTION5_COUNTRY).type("UK");
    cy.get(QUESTION5_REGISTRATION).type("UK ");
    cy.get(QUESTION5_BUSINESS_ADDRESS).type("Victory ,LONDON,UK");
    cy.get(QUESTION5_WEBSITE).type("www.acubed.it");
    cy.get(QUESTION5_DESCRIPTION).type("QUESTION5 DESCRIPTION");
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
      "//select[@id='q5iiaHighestClassification']",
      "Official"
    );
    common.selectDropdown("//select[@id='q5iiaDepartment']", "Cabinet Office");
    cy.get(QUESTION5_OTHERL_INFO).type("QUESTION5_OTHERL_INFO");
    cy.get(QUESTION5_DESCRIPTION1).type("QUESTION5_DESCRIPTION1");
    cy.get(QUESTION5_AUTHORISED_ADDTIONAL_INFO).type(
      "QUESTION5_AUTHORISED_ADDTIONAL_INFO"
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
    // cy.get(QUESTION5_IS_DUALUSE_ADDITIONAL_INFO).type( "QUESTION5 IS DUALUSE ADDITIONAL INFO"   );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_VIAITEM_NAME).type("BEIS");
    cy.get(QUESTION5_VIAITEM_DESC).type("BEIS Q5 Addtional Information");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_VI_ADDANOTHER_NO).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_IS_PARTY_TO_YES).click();
    cy.get(QUESTION5_IS_PARTY_TO_ADDI_INFO).type(
      "QUESTION5 IS PARTY TO Additional Information "
    );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION5_IA_SUPPLY_RELATIONSHIP).type("Supply Relationship ");
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
    cy.xpath(SAVEBUTTON).click();
    //common.statusCheck("Question 5");
  }

  Question6(testData) {
    cy.WaitForBrowser();
    //common.navigateApplicationLink("Ownership and structure");
    cy.get(
      ":nth-child(3) > .app-task-list__items > :nth-child(2) > .app-task-list__task-name > a"
    ).click();
    common.Fileupload(filePath);
    cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION6_CONT_TEXT_VALIDATION).should( "contain","You have successfully uploaded the pre-acquisition chart pdf document: abc.pdf"  );
    // cy.get(QUESTION6_SUBMIT_BUTTON_PG1_SUCCESS).click();
    common.Fileupload(filePath);
    cy.xpath(SAVEBUTTON).click();
    // cy.get(QUESTION6_CONT_TEXT_VALIDATION).should( "contain", "You have successfully uploaded the post-acquisition chart pdf document: abc.pdf"    );
    // cy.get(QUESTION6_SUBMIT_BUTTON_PG2_SUCCESS).click();
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
    //cy.get(QUESTION6_ADDITIONAL_INFORMATION).type( "QUESTION6 ADDITIONAL INFORMATION"    );
    // cy.xpath(SAVEBUTTON).click();
    //common.statusCheck("Question 6");
  }
}
export default RTaskListPage;
