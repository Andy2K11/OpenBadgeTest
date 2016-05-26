function fillSelect() {
    var select = document.getElementById("badge-selector");
    var selectedBadge = select.value;
    console.log("selected badge: " + selectedBadge);
    
    /* First clear the options */
    while (select.hasChildNodes()) {
        select.removeChild(select.firstChild);
    }

    /* Add a prompt as the first option */
    var prompt = document.createElement("option");
    prompt.text = "Please choose";
    prompt.value = "Please choose";
    prompt.disabled = true;
    select.add(prompt, 0);
    select.selectedIndex = 0;    
    
    /* Now add badges from server */
    google.script.run.withSuccessHandler(function (res) {
        for (badge in res) {
            var option = document.createElement("option");
            option.text = res[badge];
            option.value = res[badge];
            select.add(option);
            if (option.text === selectedBadge) {
                select.selectedIndex = badge + 1;   // we add one for the "please choose" option
            }
        }    
    }).getListOfBadges();
}

function updateSelect() {
    var select = document.getElementById("badge-selector");
    var badgeName = document.getElementById("badge-name");
    var option = document.createElement("option");
    option.text = badgeName.value;
    select.add(option, 0);
    select.selectedIndex = 0;
}

function createBadge() {
    if (badgeData = validateBadge()) {
        google.script.run.withFailureHandler(function (err) {
           var errorMsg = document.getElementByClassName("form-error");
           errorMsg.innerHTML = "Server returned error when creating badge  " + err;
           errorMsg.style.display = "block"; 
        }).withSuccessHandler(function (res) {
            console.log("createBadge returned: " + res);
            showAddNew(false);
        }).createBadgeFromJson(badgeData);
        return true; 
    }    
}

function importRecipients() {
    var recipient = document.getElementById("recipient");
    var importfile = document.getElementById("import-recipients");
    showFieldset(recipient, !importfile.value);
}

/*
 * Show or hide the add new badges fieldset
 * If hiding reset the badge selector
 */
function showAddNew(doShow) {
    var addnew = document.getElementById("addnew");
    showFieldset(addnew, doShow);
    if (!doShow) {
        fillSelect();
    }
}

/*
 * Shows or hides a fieldset making the required attributes for each
 * input match it's visibility.
 */
function showFieldset(fieldset, doShow) {
    doShow ? fieldset.style.display = "block" : fieldset.style.display = "none";
    var inputs = fieldset.querySelectorAll("input, textarea");

    // This is an efficient method for iterating through a NodeList https://developer.mozilla.org/en-US/docs/Web/API/NodeList
    for (var i = inputs.length; i--; ) {
        inputs[i]["required"] = doShow;
        inputs[i].value = "";
    }
    
    document.getElementById("badge-issuer").value = "http://openbadges.corductive.uk/issuerOrganisation.json";
    
    /* Hide the error messages */
    var errors = fieldset.querySelectorAll(".error-msg");
    for (var i = errors.length; i--; ) {
        errors[i].style["display"] = "none";
    }  
}

window.addEventListener('load', fillSelect);