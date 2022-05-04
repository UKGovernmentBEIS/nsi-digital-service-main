import "../pages/Login";
import CommonFunctions from "../pages/CommonFunctions";
import "../pages/TaskListPage";
import TaskListPage from "../pages/TaskListPage";
import TaskListPage7to9 from "../pages/TaskListPage7to9";
import VTaskListPage from "../pages/VoluntaryTaskListPage";
import testData from "../fixtures/VoluntaryData.json";

let common = new CommonFunctions();
let tasklist = new TaskListPage();
let tasklist1 = new TaskListPage7to9();
let vtasklist = new VTaskListPage();
let questions_testData = testData.question;

questions_testData.forEach((element) => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce("connect.sid");
  });

  it("Can User ACCESS VOLUNTARY FORM", function () {
    // cy.loginWithUser();
    cy.loginWithDefaultUser();
    vtasklist.FormVoluntary();
  });

  /* it("Can User Read and Accept", function () {
    cy.loginWithUser(); 
    cy.loginWithDefaultUser();  
    tasklist.Readandaccept();
    
  });
*/

  it("Can User Access Voluntary Question 1", function () {
    vtasklist.Question1(element);
  });

  it("Can User Access Voluntary Question 2", function () {
    vtasklist.VoluntaryTasklistURL();
    tasklist.Question2(element);
  });

  it("Can User Access Voluntary Question 3", function () {
    vtasklist.VoluntaryTasklistURL();
    vtasklist.Question3(element);
  });

  it("Can User Access Voluntary Question 4", function () {
    vtasklist.VoluntaryTasklistURL();
    tasklist.Question4(element);
  });

  it("Can User Access Voluntary Question 5", function () {
    vtasklist.VoluntaryTasklistURL();
    vtasklist.Question5(element);
  });

  it("Can User Access Voluntary Question 6", function () {
    vtasklist.VoluntaryTasklistURL();
    vtasklist.Question6(element);
  });

  it("Can User Access Voluntary Question 7", function () {
    vtasklist.VoluntaryTasklistURL();
    tasklist1.Question7(element);
  });

  it("Can User Access Voluntary Question 8", function () {
    vtasklist.VoluntaryTasklistURL();
    vtasklist.Question8(element);
  });

  it("Can User Access Voluntary Question 9", function () {
    vtasklist.VoluntaryTasklistURL();
    tasklist1.Question9();
  });
});
