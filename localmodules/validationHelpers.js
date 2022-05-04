/* Checks whether the passed value is blank */
exports.isBlankCheck = function (valToCheck) {
  if (
    valToCheck == null ||
    valToCheck == undefined ||
    (valToCheck.trim && valToCheck.trim() == "")
  ) {
    return true;
  } else {
    return false;
  }
};

/* checks whether a ratio button has a yes value */
exports.isRadioValueYes = function (valToCheck) {
  // check if blank
  if (this.isBlankCheck(valToCheck)) {
    return false;
  }

  if (
    valToCheck &&
    valToCheck.toUpperCase &&
    valToCheck.toUpperCase() === "YES"
  ) {
    return true;
  }

  return false;
};

/* checks whether a ratio button has a no value */
exports.isRadioValueNo = function (valToCheck) {
  // check if blank
  if (this.isBlankCheck(valToCheck)) {
    return false;
  }

  if (valToCheck.toUpperCase && valToCheck.toUpperCase() === "NO") {
    return true;
  }

  return false;
};

/* checks whether a ratio button has a specific named value */
exports.isRadioValueSpecific = function (radioValue, valToCheck) {
  // check if blank
  if (this.isBlankCheck(radioValue) || this.isBlankCheck(valToCheck)) {
    return false;
  }

  if (
    valToCheck.toUpperCase &&
    valToCheck.toUpperCase() === radioValue.toUpperCase()
  ) {
    return true;
  }

  return false;
};

/* checks wether a date is valid */
exports.isDateValid = function (
  valToCheckDay,
  valToCheckMonth,
  valToCheckYear,
  isMandatory = true
) {
  // are they blank?
  if (
    valToCheckDay == null ||
    valToCheckDay.length == 0 ||
    valToCheckDay == undefined ||
    valToCheckMonth == null ||
    valToCheckMonth.length == 0 ||
    valToCheckMonth == undefined ||
    valToCheckYear == null ||
    valToCheckYear.length == 0 ||
    valToCheckYear == undefined
  ) {
    // is this a madatory date?
    if (isMandatory) {
      return false;
    } else {
      return true;
    }
  }

  // is the day part valid?
  if (isNaN(valToCheckDay)) {
    return false;
  }

  // is the month part valid?
  if (isNaN(valToCheckMonth)) {
    return false;
  }

  // is the day part valid?
  if (isNaN(valToCheckYear)) {
    return false;
  }

  var valToCheckDayInt = parseInt(valToCheckDay, 10);
  var valToCheckMonthInt = parseInt(valToCheckMonth, 10);
  var valToCheckYearInt = parseInt(valToCheckYear, 10);

  // day value check
  if (valToCheckDayInt < 1 || valToCheckDayInt > 31) {
    return false;
  }

  // month value check
  if (valToCheckMonthInt < 1 || valToCheckMonthInt > 12) {
    return false;
  }

  // year val check
  if (valToCheckYearInt < 1900 || valToCheckYearInt > 2090) {
    return false;
  }

  // perform leap year checks
  var monLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // check leap year
  if (
    valToCheckYearInt % 400 == 0 ||
    (valToCheckYearInt % 100 != 0 && valToCheckYearInt % 4 == 0)
  ) {
    monLength[1] = 29;
  }

  if (valToCheckDayInt > monLength[valToCheckMonthInt - 1]) {
    return false;
  }

  return true;
};

/* checks wether a date is valid */
exports.isDateOfBirthValid = function (
  valToCheckDay,
  valToCheckMonth,
  valToCheckYear,
  isMandatory = true
) {
  // are they blank?
  if (
    valToCheckDay == null ||
    valToCheckDay.length == 0 ||
    valToCheckDay == undefined ||
    valToCheckMonth == null ||
    valToCheckMonth.length == 0 ||
    valToCheckMonth == undefined ||
    valToCheckYear == null ||
    valToCheckYear.length == 0 ||
    valToCheckYear == undefined
  ) {
    // is this a madatory date?
    if (isMandatory) {
      return false;
    } else {
      return true;
    }
  }

  // is the day part valid?
  if (isNaN(valToCheckDay)) {
    return false;
  }

  // is the month part valid?
  if (isNaN(valToCheckMonth)) {
    return false;
  }

  // is the day part valid?
  if (isNaN(valToCheckYear)) {
    return false;
  }

  var valToCheckDayInt = parseInt(valToCheckDay, 10);
  var valToCheckMonthInt = parseInt(valToCheckMonth, 10);
  var valToCheckYearInt = parseInt(valToCheckYear, 10);

  // day value check
  if (valToCheckDayInt < 1 || valToCheckDayInt > 31) {
    return false;
  }

  // month value check
  if (valToCheckMonthInt < 1 || valToCheckMonthInt > 12) {
    return false;
  }

  // year val check
  if (valToCheckYearInt < 1900 || valToCheckYearInt > 2090) {
    return false;
  }

  // perform leap year checks
  var monLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // check leap year
  if (
    valToCheckYearInt % 400 == 0 ||
    (valToCheckYearInt % 100 != 0 && valToCheckYearInt % 4 == 0)
  ) {
    monLength[1] = 29;
  }

  if (valToCheckDayInt > monLength[valToCheckMonthInt - 1]) {
    return false;
  }

  // perform a check to make sure the date is not in the future
  var fullDate = new Date(
    valToCheckYear + "-" + valToCheckMonth + "-" + valToCheckDay
  );
  var nowDate = new Date();
  var todayDate = new Date(
    nowDate.getFullYear() +
      "/" +
      (nowDate.getMonth() + 1) +
      "-" +
      nowDate.getDate()
  );

  if (fullDate.getTime() > todayDate.getTime()) {
    // this is a problem, the date of birth cannot be in the future
    return false;
  }

  return true;
};

exports.specificComparrison = function (valToCheck, specificValue) {
  // check if blank
  if (this.isBlankCheck(valToCheck) || this.isBlankCheck(specificValue)) {
    return false;
  }

  if (
    valToCheck.toUpperCase &&
    valToCheck.toUpperCase() === specificValue.toUpperCase()
  ) {
    return true;
  }

  return false;
};

exports.isWebsite = function (valToCheck) {
  const val = valToCheck.toLowerCase();

  return (
    val.includes("http://") || val.includes("https://") || val.includes("www.")
  );
};
