//import './Login';
import CommonFunctions from "./CommonFunctions";
let common = new CommonFunctions();

//Common ID
const SAVEBUTTON = "//button[contains(text(),'Save and continue')]";
const INPUT_VALUE = "ABC";
const EMAIL = "ABC@acubed.it";
const ADDINFO = "Question5 Addtional INFO";

//Question 7
const QUESTION7_NAME_OF_AQUIRER = "#q7iNameOfAcquirer";
const QUESTION7_ENTITY = "#q7iEntityOrIndividual1";
const QUESTION7_INDIVIDUAL = "q7iEntityOrIndividual2";
const QUESTION7_COMPANY_HOUSE_REFERENCE = "#q7iCompaniesHouseReference";
const QUESTION7_SIC_REFERENCE = "#q7iSICReference";
const QUESTION7_INCORPORATED_OUTSIDE_YES = "#q7iIncorporatedOutsideUkYes";
const QUESTION7_INCORPORATED_OUTSIDE_NO = "#q7iIncorporatedOutsideUkNo";
const QUESTION7_REG_DETAILS_CTY_OF_CORP =
  "#q7iRegistrationDetailsCountryOfCorporation";
const QUESTION7_DESCRIPTION_PRODUCT_ACTIVATION =
  "#q7iDescriptionProductActivities";
const QUESTION7_AQUIRER_ADDITIONAL_INFORMATION =
  "#q7iAcquirerAdditionalInformation";
const QUESTION7_NON_UK_SHARE_VOTING_YES = "#q7iiNonUKGovtYes";
const QUESTION7_NON_UK_SHARE_VOTING_NO = "#q7iiNonUKShareVotingNo";
const QUESTION7_NON_UK_SHARE_VOTING_DONOTKNOW =
  "#q7iiNonUKShareVotingDoNotKnow";
const QUESTION7_NAME_OF_NON_UK_GOVERNMENT = "#q7iiNameOfNonUKGoverment";
const QUESTION7_NAME_OF_PERSON_ACTING_NON_UK_GEVERNMENT =
  "#q7iiNameOfPersonActingNonUKGoverment";
const QUESTION7_SHARE_OWNERSHIP_VOTING_RIGHTS =
  "#q7iiShareOwnershipVotingRights";
const QUESTION7_ANYTHING_TO_DECLARE = "#q7iiAnythingToDeclare";
const QUESTION7_NONUK_ROLE_IN_OPERATION_YES = "#q7iiiNonUKGovtYes"; //'#q7iiiNonUKRoleInOperationYes';
const QUESTION7_NONUK_ROLE_IN_OPERATION_NO = "#q7iiiNonUKRoleInOperationNo";
const QUESTION7_NONUK_ROLE_IN_OPERATION_DONOTKNOW =
  "#q7iiiNonUKRoleInOperationDoNotKnow";
const QUESTION7_NAME_OF_NONUK_GOVERNMENT = "#q7iiiNameOfNonUKGoverment";
const QUESTION7_BRIEF_INTEREST_DESCRIPTION = "#q7iiiBriefInterestDescription";
const QUESTION7_CONTRACTUAL_ARRANGEMENT_YES = "#q7ivContractualArrangementsYes";
const QUESTION7_CONTRACTUAL_ARRANGEMENTS_SUMMARY =
  "#q7ivContractualArrangementsSummary";
const QUESTION7_CONTRACTUAL_ARRANGEMENT_NO = "#q7ivContractualArrangementsNo";
const QUESTION7_CONTRACTUAL_ARRANGEMENT_DONOTKNOW =
  "#q7ivContractualArrangementsDoNotKnow";

//Question 8
const filePath = "Image/Testing.pdf"; //abc.JPG';
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

//Question 9
const QUESTION9_OTHER_COMMENT = "#q9iOtherComments";
const QUESTION9_STATEMENT_OF_TRUTH_SELECT = ".govuk-checkboxes__input"; //'#q9iiiStatementOfTruthSelect';
const QUESTION9_CONT_TEXT_VALIDATION = ".govuk-notification-banner__content";
const QUESTION9_CONTINUE = "#q9iSubmitButton";

class TaskListPage7to9 {
  //Question7 - Happy path test scenario
  Question7(testData) {
    cy.WaitForBrowser();
    common.navigateApplicationLink("About the acquiring party");
    cy.get(QUESTION7_NAME_OF_AQUIRER).type(testData.q7aquirer);
    common.selectDropdown(
      "//select[@id='q7iCountryOfOrigin']",
      "United Kingdom"
    );
    cy.get(QUESTION7_ENTITY).click();
    //cy.get(QUESTION7_NAME_OF_AQUIRER).type("Question 7 Aquuirer");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION7_COMPANY_HOUSE_REFERENCE).type(
      testData.q7companyHouseReference
    );
    cy.get(QUESTION7_SIC_REFERENCE).type(testData.a7sicReference);
    cy.get(QUESTION7_INCORPORATED_OUTSIDE_YES).click();
    cy.get(QUESTION7_REG_DETAILS_CTY_OF_CORP).type(
      testData.q7regdetailscontryofcorporation
    );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION7_DESCRIPTION_PRODUCT_ACTIVATION).type(
      "QUESTION7 DESCRIPTION PRODUCT ACTIVATION"
    );
    cy.get(QUESTION7_AQUIRER_ADDITIONAL_INFORMATION).type(
      "QUESTION7 AQUIRER ADDITIONAL INFORMATION"
    );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION7_NON_UK_SHARE_VOTING_YES).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION7_NAME_OF_NON_UK_GOVERNMENT).type(testData.q7nameofnonukgov);
    cy.get(QUESTION7_NAME_OF_PERSON_ACTING_NON_UK_GEVERNMENT).type(
      "QUESTION7 NAME OF PERSON ACTING NON UK GEVERNMENT"
    );
    cy.get(QUESTION7_SHARE_OWNERSHIP_VOTING_RIGHTS).type(
      "QUESTION7 SHARE OWNERSHIP VOTING RIGHTS"
    );
    cy.get(QUESTION7_ANYTHING_TO_DECLARE).type("QUESTION7_ANYTHING_TO_DECLARE");
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION7_NON_UK_SHARE_VOTING_NO).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION7_NONUK_ROLE_IN_OPERATION_YES).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION7_NAME_OF_NONUK_GOVERNMENT).type(testData.q7nameofnonukgov);
    cy.get(QUESTION7_BRIEF_INTEREST_DESCRIPTION).type(
      "QUESTION7 BRIEF INTEREST DESCRIPTION"
    );
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION7_NONUK_ROLE_IN_OPERATION_NO).click();
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION7_CONTRACTUAL_ARRANGEMENT_YES).click();
    cy.get(QUESTION7_CONTRACTUAL_ARRANGEMENTS_SUMMARY).type(
      testData.q7contractualarrangementssummary
    );
    cy.xpath(SAVEBUTTON).click();
    //common.statusCheck("Question 7");
  }

  Question8(testData) {
    cy.WaitForBrowser();
    common.navigateApplicationLink(
      "Ownership and structure of acquiring party"
    );
    //cy.get(":nth-child(6) > .app-task-list__items > :nth-child(2) > .app-task-list__task-name > a").click();
    common.Fileupload(filePath);
    cy.wait(2000);
    cy.xpath(SAVEBUTTON).click();
    //cy.get(QUESTION8_CONT_TEXT_VALIDATION).should("contain","You have successfully uploaded the chart pdf document: abc.pdf");
    //cy.get(QUESTION8_CONTINUE).click();
    //cy.get(QUESTION8_BOARD_MEMBERS_YES).click();
    //cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION8_BOARD_MEMBERS_NAME).type(testData.q8boardMembersName);
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

  Question9() {
    cy.WaitForBrowser();
    common.navigateApplicationLink(
      "Other relevant documentation and information"
    );
    common.Fileupload(filePath);
    //cy.wait(8000);
    cy.get(QUESTION9_OTHER_COMMENT).type("QUESTION9 OTHER COMMENT");
    // cy.get(QUESTION9_STATEMENT_OF_TRUTH_SELECT).click(44.44);
    // cy.get('input[type="checkbox" i]').click({ force: true });
    // cy.get(QUESTION9_STATEMENT_OF_TRUTH_SELECT).click();
    // cy.get(".govuk-button=before").click({ force: true });
    // cy.get('#submitButton9-1').click({ force: true });
    //cy.xpath(SAVEBUTTON).click();
    cy.WaitForBrowser();
    //cy.get(QUESTION9_CONT_TEXT_VALIDATION).should("contain","You have successfully uploaded the following document(s)");
    cy.get(QUESTION9_CONTINUE).click();
    //common.statusCheck("Question 9");
  }
}
export default TaskListPage7to9;
