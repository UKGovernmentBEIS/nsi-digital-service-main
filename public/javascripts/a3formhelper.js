function populateDateFields(dayField, monthField, yearField, setDate) {
    if (setDate == null || setDate == "") {
        return;
    }

    var res = setDate.split('/');

    dayField.value = res[0];
    monthField.value = res[1];
    yearField.value = res[2];

    return;
}

function getDateFromDateFields(dayField, monthField, yearField) {
    if (yearField != "" && monthField != "" && dayField != "") {
        var newDate = dayField + '/' + monthField + '/' + yearField;

        return newDate;
    } else {
        return "";
    }
}

/**
 * setCheckedValueOfRadioButtonGroup
 * @param {html input type=radio} vRadioObj 
 * @param {the radiobutton with this value will be checked} vValue 
 */
function setCheckedValueOfRadioButtonGroup(vRadioObj, vValue) {
    var radios = document.getElementsByName(vRadioObj.name);
    for (var j = 0; j < radios.length; j++) {
        if (radios[j].value == vValue) {
            radios[j].checked = true;
            break;
        }
    }
}

function setCheckedValueOfCheckboxGroup(vRadioObj, vValue) {
    var checkBoxes = document.getElementsByName(vRadioObj.name);
    var splitVal = vValue.split(",");

    for (var j = 0; j < checkBoxes.length; j++) {
        for (var k = 0; k < splitVal.length; k++) {
            if (checkBoxes[j].value == splitVal[k]) {
                checkBoxes[j].checked = true;
                break;
            }
        }
    }
}

function getCheckedValueofRadioGroup(vRadioObj) {
    var radios = document.getElementsByName(vRadioObj.name);
    for (var j = 0; j < radios.length; j++) {
        if (radios[j].checked == true) {
            return radios[j].value;
        }
    }
}

function setDropDownBox(vDropdown, vValue) {
    var iOptions = vDropdown.options;
    for (i=0; i < iOptions.length; i++) {
        if (iOptions[i].value == vValue) iOptions[i].selected = true;
    }
}