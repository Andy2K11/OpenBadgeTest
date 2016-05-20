/*
* For when new badge data has been included in the submitted form
* Alternatively, gets the name of the selected badge if a new badge is not being created
*
* Returns: badgeName (string) or False if no new badge or selected badge 
*/

function addPostedBadge(request) {
    
    var badgeSheet = SpreadsheetApp.openById(ScriptProperties.getProperty('test')).getSheetByName('BADGES');

    /*
     * If badge parameters exist then validate them, else see if an existing badge has been selected
     */
    if (request.parameter.badgename && request.parameter.badgedescription && request.parameter.badgeimage && request.parameter.badgecriteria) {
        Logger.log(request.parameter.badgename);
        if (validate(request.parameter.badgename, badgename) && validate(request.parameter.badgedescription, badgedesc)) {
            badgeSheet.appendRow([request.parameter.badgename, request.parameter.badgedescription, request.parameter.badgeimage, request.parameter.badgecriteria]);
            return request.parameter.badgename;
        }
    } else if (validate(request.parameter.selectedbadge, "selectedbadge")) {
        return request.parameter.selectedbadge;
    } else {
        Logger.log("Badge validation failed");
        return false;
    }
};