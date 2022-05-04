const validationHelpers = require("../../localmodules/validationHelpers");

describe("validationHelpers", () => {
  describe("isBlankCheck()", () => {
    test("Should be falsy", () => {
      expect(validationHelpers.isBlankCheck("abc")).toBeFalsy();
      expect(validationHelpers.isBlankCheck(1)).toBeFalsy();
    });

    test("Should be truthy", () => {
      expect(validationHelpers.isBlankCheck()).toBeTruthy();
      expect(validationHelpers.isBlankCheck(" ")).toBeTruthy();
      expect(validationHelpers.isBlankCheck(null)).toBeTruthy();
      expect(validationHelpers.isBlankCheck(undefined)).toBeTruthy();
    });
  });

  describe("isDateValid", () => {
    it("Should be valid", () => {
      expect(validationHelpers.isDateValid(10, 10, 1981)).toBeTruthy();
    });
    it("Should be invalid", () => {
      expect(validationHelpers.isDateValid()).toBeFalsy();
      expect(validationHelpers.isDateValid("", 10, 1981)).toBeFalsy();
      expect(validationHelpers.isDateValid(1, "", 1981)).toBeFalsy();
      expect(validationHelpers.isDateValid(1, 2, "")).toBeFalsy();
      expect(validationHelpers.isDateValid(31, 2, 1981)).toBeFalsy();
      expect(validationHelpers.isDateValid(44, 66, 1981)).toBeFalsy();
    });
  });

  describe("isRadioValueYes", () => {
    test("Should be falsy", () => {
      expect(validationHelpers.isRadioValueYes("")).toBeFalsy();
      expect(validationHelpers.isRadioValueYes()).toBeFalsy();
      expect(validationHelpers.isRadioValueYes("NO")).toBeFalsy();
      expect(validationHelpers.isRadioValueYes("no")).toBeFalsy();
    });

    test("Should be truthy", () => {
      expect(validationHelpers.isRadioValueYes("YES")).toBeTruthy();
      expect(validationHelpers.isRadioValueYes("yes")).toBeTruthy();
    });
  });

  describe("isRadioValueNo", () => {
    test("Should be falsy", () => {
      expect(validationHelpers.isRadioValueNo("")).toBeFalsy();
      expect(validationHelpers.isRadioValueNo()).toBeFalsy();
      expect(validationHelpers.isRadioValueNo("YES")).toBeFalsy();
      expect(validationHelpers.isRadioValueNo("yes")).toBeFalsy();
    });

    test("Should be truthy", () => {
      expect(validationHelpers.isRadioValueNo("NO")).toBeTruthy();
      expect(validationHelpers.isRadioValueNo("no")).toBeTruthy();
    });
  });

  describe("isRadioValueSpecific", () => {
    test("Should be truthy", () => {
      expect(
        validationHelpers.isRadioValueSpecific("hello", "hello")
      ).toBeTruthy();
      expect(validationHelpers.isRadioValueSpecific("yes", "YES")).toBeTruthy();
    });

    test("Should be falsy", () => {
      expect(validationHelpers.isRadioValueSpecific()).toBeFalsy();
      expect(validationHelpers.isRadioValueSpecific("yes", "no")).toBeFalsy();
    });
  });

  describe("isWebsite", () => {
    test("Should be truthy", () => {
      expect(validationHelpers.isWebsite("www.example.com")).toBeTruthy();
      expect(validationHelpers.isWebsite("www.example.com")).toBeTruthy();
      expect(
        validationHelpers.isWebsite("http://www.example.com")
      ).toBeTruthy();
      expect(
        validationHelpers.isWebsite("https://www.example.com")
      ).toBeTruthy();
    });

    test("Should be falsy", () => {
      expect(validationHelpers.isWebsite("")).toBeFalsy();
      expect(validationHelpers.isWebsite("example.com")).toBeFalsy();
      expect(validationHelpers.isWebsite("example")).toBeFalsy();
    });
  });
});
