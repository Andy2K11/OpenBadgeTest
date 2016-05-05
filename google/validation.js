/*
 * Validates any input with given id
 * 
 * Each switch statement contains the validation criteria for that element
 * The if statements take the form:
 * 
 * If (Failed for reason A) {
 *  show error message A
 * } else if (failed for reason B) {
 *  show error message B
 * } else {
 *  passed all tests
 * }
 */
function validateInput(id) {
    var inputField = document.getElementById(id);
    var inputFieldError = document.getElementById(id+"-error");
    var isValid = false;
    switch (id) {
        case "badge-name":
            if (!inputField.value.length) {
                inputFieldError.innerHTML = "Badge name required";    
            } else {
                updateSelect();
                isValid = true;
            }
            break;
        case "badge-desc":
            if (inputField.value.length < 10) {
                inputFieldError.innerHTML = "Description must be at least 10 characters";
            } else {
                isValid = true;
            }
            break;
        case "badge-image":
            if (!inputField.value.length) {
                inputFieldError.innerHTML = "Please enter location of badge image";
            } else {
                isValid = true;
            }
            break;
        case "badge-criteria":
            if (!inputField.value.length) {
                inputFieldError.innerHTML = "Please enter location of badge criteria";
            } else {
                isValid = true;
            }
            break;
        default:
            console.log("Could not validate input with id " + id);
            break;
    }
    
    if (isValid) {
        inputFieldError.style.display = "none";
        return inputField.value;
    } else {
        inputFieldError.style.display = "block";
        return false;
    }
}

/*
 * Checks each memeber of the badges fieldset displaying all error messages before
 * returning
 */
function validateBadge() {
    var badgeData = {};
    var isValid = true;
    if (!(badgeData.name = validateInput("badge-name"))) { isValid = false; }
    if (!(badgeData.description = validateInput("badge-desc"))) { isValid = false; }
    if (!(badgeData.image = validateInput("badge-image"))) { isValid = false; }
    if (!(badgeData.criteria = validateInput("badge-criteria"))) { isValid = false; }
    
    if (isValid) {
        return badgeData;    
    } else {
        return false;
    }
    
}

function validateRecipient() {
    /* If not valid import, validate recipient details */
    if (!validageInput("import-recipients")) {
        if (!validateInput("recipient-name")) { return false; }
        if (!validateInput("recipient-email")) { return false; }
    }
    
    return true;
}

/*
 * When user submits form, checks if it's valid before posting data
 */
function validateForm() {
    /*
     * Is user creating a new badge or have they selected an existing one
     * NB: If they've already explicitly create a new one then the fieldset
     * will be hidden and the new badge selected.
     */
    if (document.getElementById("addnew").style.display === "block") {
        if (!createBadge()) {
            return false;
        }
    }
    
    var password = "secret";
    
    if (!validateRecipient() || password !== "secret") {
        console.log("Validation failed");
        var formError = document.getElementById("form-error");
        formError.style.display = "block";
        return false;
    }
    console.log("Form submitted");
}

