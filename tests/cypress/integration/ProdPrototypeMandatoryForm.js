import "../pages/Login";
import CommonFunctions from "../pages/CommonFunctions";
import "../pages/TaskListPage";
import TaskListPage from "../pages/TaskListPage";
import TaskListPage7to9 from "../pages/TaskListPage7to9";
import testData from "../fixtures/MandatoryData.json";
let common = new CommonFunctions();
let tasklist = new TaskListPage();
let tasklist1 = new TaskListPage7to9();
//let question1_testData = testData.question1;
let questions_testData = testData.question;

questions_testData.forEach((element) => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce("connect.sid");
  });

  it("Can User ACCESS MANDATORY FORM", function () {
    // cy.loginWithUser();
    cy.loginWithDefaultUser();
    tasklist.FormMandatory();
  });
  /*
 it("Can User Read and Accept", function () {
    cy.loginWithUser(); 
    cy.loginWithDefaultUser();  
    tasklist.Readandaccept();
    
  });
   */

  it("Can User Access Mandatory Question 1", function () {
    tasklist.Question1(element);
  });

  it("Can User Access Mandatory Question 2", function () {
    tasklist.MandatoryTasklistURL();
    tasklist.Question2(element);
  });

  //for (let index = 0; index < 2; index++) {
  // it(`Can User Access Mandatory Question 3:iteration-${index}`, function () {
  it("Can User Access Mandatory Question 3", function () {
    tasklist.MandatoryTasklistURL();
    tasklist.Question3(element);
  });

  it("Can User Access Mandatory Question 4", function () {
    tasklist.MandatoryTasklistURL();
    tasklist.Question4(element);
  });

  it("Can User Access Mandatory Question 5", function () {
    tasklist.MandatoryTasklistURL();
    tasklist.Question5(element);
  });

  it("Can User Access Mandatory Question 6", function () {
    tasklist.MandatoryTasklistURL();
    tasklist.Question6(element);
  });

  it("Can User Access Mandatory Question 7", function () {
    tasklist.MandatoryTasklistURL();
    tasklist1.Question7(element);
  });

  it("Can User Access Mandatory Question 8", function () {
    tasklist.MandatoryTasklistURL();
    tasklist1.Question8(element);
  });

  it("Can User Access Mandatory Question 9", function () {
    tasklist.MandatoryTasklistURL();
    tasklist1.Question9();
  });
});
