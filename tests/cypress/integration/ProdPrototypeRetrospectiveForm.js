import "../pages/Login";
import CommonFunctions from "../pages/CommonFunctions";
import "../pages/TaskListPage";
import TaskListPage from "../pages/TaskListPage";
import TaskListPage7to9 from "../pages/TaskListPage7to9";
import VTaskListPage from "../pages/VoluntaryTaskListPage";
import RTaskListPage from "../pages/RetrospectiveTaskListPage";
import testData from "../fixtures/RetrospectiveData.json";

let common = new CommonFunctions();
let tasklist = new TaskListPage();
let tasklist1 = new TaskListPage7to9();
let vtasklist = new VTaskListPage();
let rtasklist = new RTaskListPage();
let questions_testData = testData.question;

questions_testData.forEach((element) => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce("connect.sid");
  });

  it("Can User ACCESS RETROSPECTIVE FORM", function () {
    // cy.loginWithUser();
    cy.loginWithDefaultUser();
    rtasklist.FormRetrospective();
  });

  /* it("Can User Read and Accept", function () {
    cy.loginWithUser(); 
    cy.loginWithDefaultUser();  
    tasklist.Readandaccept();
    
  });
     */

  it("Can User Access Retrospective Question 1", function () {
    rtasklist.Question1(element);
  });

  it("Can User Access Retrospective Question 2", function () {
    rtasklist.RetroTasklistURL();
    tasklist.Question2(element);
  });

  it("Can User Access Retrospective Question 3", function () {
    rtasklist.RetroTasklistURL();
    rtasklist.Question3(element);
  });

  it("Can User Access Retrospective Question 4", function () {
    rtasklist.RetroTasklistURL();
    tasklist.Question4(element);
  });

  it("Can User Access Retrospective Question 5", function () {
    rtasklist.RetroTasklistURL();
    tasklist.Question5(element);
  });

  it("Can User Access Retrospective Question 6", function () {
    rtasklist.RetroTasklistURL();
    rtasklist.Question6(element);
  });

  it("Can User Access Retrospective Question 7", function () {
    rtasklist.RetroTasklistURL();
    tasklist1.Question7(element);
  });

  it("Can User Access Retrospective Question 8", function () {
    rtasklist.RetroTasklistURL();
    vtasklist.Question8(element);
  });

  it("Can User Access Retrospective Question 9", function () {
    rtasklist.RetroTasklistURL();
    tasklist1.Question9();
  });
});
