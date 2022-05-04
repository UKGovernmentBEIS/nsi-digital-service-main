class CommonFunctions {
  navigateApplicationLink(linkName) {
    var linkXPath = linkName;
    cy.xpath("//*[contains(text(),'" + linkXPath + "')]").click();
  }

  selectDropdown(select, value) {
    var selectXPath = select;
    var valueXPath = value;
    cy.xpath(selectXPath).select(valueXPath);
  }

  Fileupload(filepath) {
    var filexpath = filepath;
    cy.xpath("//input[@class='govuk-file-upload']").attachFile(filexpath);
  }

  statusCheck(questionStatus) {
    var questionStatusXPath = questionStatus;
    cy.xpath(
      "//a[contains(text(),'" +
        questionStatusXPath +
        "')]//ancestor::li[1]//strong[@id='finalapp-status']"
    )
      .invoke("text")
      .should("eq", "Completed");
  }
}
export default CommonFunctions;
