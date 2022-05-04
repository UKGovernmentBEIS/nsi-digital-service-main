//import './Login';
import CommonFunctions from "./CommonFunctions";
let common = new CommonFunctions();

const LINK_MANADATORY_NOTIFICATION = ".govuk-list > :nth-child(1) > a";
const READ_AND_ACCEPT_GUIDELINES = "Read and accept guidelines";
const ACCORDION_DEFAULT_HEADING = "#accordion-default-heading-1";
const VOTING_AND_SHAREHOLDING_CRITERIA = "#accordion-default-heading-2";
const SECTOR_FOR_WHICH_THE_NOTIFICATION_APPLIES =
  "#accordion-default-heading-3";
const BEFORE_YOU_SUBMIT = "#accordion-default-heading-4";
const GUIDELINES_CHECK_BOX = "#acceptguidelines";
//const GUIDELINES_CONTINUE_BUTTON = '#submitButton';
const STEP1_STATUS = "#preapp-status";
const ACQUIRER_FULLNAME = "#acquirer-fullname";
const INPUT_VALUE = "ABC";
const EMAIL = "ABC@acubed.it";
const ACQUIRER_ORG = "#acquirer-organisation";
const ACQUIRER_ROLE = "#acquirer-role";
const ACQUIRER_ADD = "#acquirer-businessaddress";
const ACQUIRER_EMAIL = "#acquirer-email";
const ACQUIRER_AGREE = "#acquirer-consent-agree";
const ACQUIRER_YES = "#q1-multinotifier-yes";
const ACQUIRER_NOTI_NAME = "#q1-multinotifiername";
const ACQUIRER_NOTI_INDI_NAME = "#q1-multinotifierindividualname";
const ACQUIRER_NOTI_EMAIL = "#q1-multinotifieremail";
const ACQUIRER_NOTI_ADDITIONALINFO = "#multinotifier-additionalinfo";
const ACQUIRER_NOTI_ADDDETAILS =
  "#conditional-q1-multinotifier-yes > .govuk-button";
const ACQUIRER_NOTI_LINK_YES = "#q1v-notificationlink-yes";
const ACQUIRER_NOTI_CASE_REF = "#q1v-casereferencenumber";
const ACQUIRER_NOTI_CASE_ADDDETAILS =
  "#conditional-q1v-notificationlink-yes > .govuk-button";
const SUBMITBUTTON = "#submitButton";
const ACQUIRER_STATUS = "#question1-status";

//Question 6
const FULLNAMEOFPROPERT = "#q6ii-fullname";
const SHAREOWNERSHIPPERCENTIAGE = "#q6ii-sharepercentage";
const VOTINGPERCENTAGE = "#q6ii-votingpercentage";
const ADDDETAILS = "#q6ii-subsectioni > .govuk-button";
const filePath = "Image/NEW-BEIS-PASS-APPLICATION-FORM-V1.1.docx"; //abc.JPG';
const SAVEBUTTON = "//button[contains(text(),'Save & Continue')]";
const QUESTION6_STATUS = "#question6b-status";

class AllFormFunctions {
  Readandaccept() {
    cy.get(LINK_MANADATORY_NOTIFICATION).click();
    cy.WaitForBrowser();
    common.navigateApplicationLink(READ_AND_ACCEPT_GUIDELINES);
    //cy.get(READ_AND_ACCEPT_GUIDELINES).click();
    cy.WaitForBrowser();
    common.navigateApplicationLink("Filling in your mandatory notification");
    //cy.get(ACCORDION_DEFAULT_HEADING).click();
    cy.WaitForBrowser();
    cy.get(VOTING_AND_SHAREHOLDING_CRITERIA).click();
    cy.get(SECTOR_FOR_WHICH_THE_NOTIFICATION_APPLIES).click();
    cy.get(BEFORE_YOU_SUBMIT).click();
    cy.WaitForBrowser();
    cy.get(GUIDELINES_CHECK_BOX).click();
    cy.WaitForBrowser();
    cy.get(SUBMITBUTTON).click();
    cy.WaitForBrowser();
    cy.get(STEP1_STATUS).invoke("text").should("eq", "Completed");
  }

  AcquirerorRepresentativecontactdetails() {
    common.navigateApplicationLink("Acquire");
    common.selectDropdown("//select[@id='question1-i']", "Acquirer");
    cy.get(ACQUIRER_FULLNAME).type(INPUT_VALUE);
    cy.get(ACQUIRER_ORG).type(INPUT_VALUE);
    cy.get(ACQUIRER_ROLE).type(INPUT_VALUE);
    cy.get(ACQUIRER_ADD).type(INPUT_VALUE);
    cy.get(ACQUIRER_EMAIL).type(EMAIL);
    cy.get(ACQUIRER_AGREE).click();
    cy.get(ACQUIRER_YES).click();
    cy.get(ACQUIRER_NOTI_NAME).type(INPUT_VALUE);
    cy.get(ACQUIRER_NOTI_INDI_NAME).type(INPUT_VALUE);
    cy.get(ACQUIRER_NOTI_EMAIL).type(EMAIL);
    cy.get(ACQUIRER_NOTI_ADDITIONALINFO).type(INPUT_VALUE);
    cy.get(ACQUIRER_NOTI_ADDDETAILS).click();
    cy.get(ACQUIRER_NOTI_LINK_YES).click();
    cy.get(ACQUIRER_NOTI_CASE_REF).type(INPUT_VALUE);
    cy.get(ACQUIRER_NOTI_CASE_ADDDETAILS).click();
    cy.get(SUBMITBUTTON).click();
    cy.get(ACQUIRER_STATUS).invoke("text").should("eq", "Completed");
  }
  Postacquisitionshareownershipandvotingrightsdetails() {
    cy.WaitForBrowser();
    common.navigateApplicationLink("Post-acquisition share ownership");
    cy.get(FULLNAMEOFPROPERT).type(INPUT_VALUE);
    cy.get(SHAREOWNERSHIPPERCENTIAGE).type("50");
    cy.get(VOTINGPERCENTAGE).type("50");
    cy.get(ADDDETAILS).click();
    //const filePath = 'Image/abc.JPG';
    common.Fileupload(filePath);
    cy.wait(4000);
    cy.xpath(SAVEBUTTON).click();
    cy.get(QUESTION6_STATUS).invoke("text").should("eq", "Completed");
  }
}
export default AllFormFunctions;
