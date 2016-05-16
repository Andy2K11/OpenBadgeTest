var badgeHelper = {
    badgeClass: {
        "@context": "https://w3id.org/openbadges/v1",
        "id": "",
        "type": "BadgeClass",
        "name": "",
        "description": "",
        "image": "",
        "criteria": "",
        "issuer": "http://openbadges.corductive.uk/issuerOrganisation.json"
    },
    testSpreadsheet: SpreadsheetApp.openById(ScriptProperties.getProperty('test')),
    /*
    * For when new badge data has been included in the submitted form
    * Alternatively, gets the name of the selected badge if a new badge is not being created
    *
    * Returns: badgeName (string) or False if no new badge or selected badge 
    */
    addNewBadge: function (e) {
        var badgeSheet = testSpreadsheet.getSheetByName('BADGES');

        /*
         * If badge parameters exist then validate them, else see if an existing badge has been selected
         */
        if (e.parameter.badgename && e.parameter.badgedescription && e.parameter.badgeimage && e.parameter.badgecriteria) {
            Logger.log(e.parameter.badgename);
            if (validate(e.parameter.badgename, badgename) && validate(e.parameter.badgedescription, badgedesc)) {
                badgeSheet.appendRow([e.parameter.badgename, e.parameter.badgedescription, e.parameter.badgeimage, e.parameter.badgecriteria]);
                return e.parameter.badgename;
            }
        } else if (validate(e.parameter.selectedbadge, "selectedbadge")) {
            return e.parameter.selectedbadge;
        } else {
            Logger.log("Badge validation failed");
            return false;
        }
    },
    /*
    * Returns the badges currently in the spreadsheet
    * Commonly used to fill out, or refresh, the options of a select element
    */
    getBadges: function () {
        Logger.log("Getting badges");
        var badgeSheet = testSpreadsheet.getSheetByName('BADGES');
        var badgesAoAs = badgeSheet.getRange(2, 1, badgeSheet.getLastRow(), 1).getValues();
        var badges = [];
        for (i in badgesAoAs) {
            badges.push(badgesAoAs[i][0]);
        }
        return badges;
    },
    /*
    * Used when the user requests to create a badge without submitting the form
    * This is useful if no badges are to be issued but a new badge is to be created
    *
    * args BadgeData in JSON format
    *
    * return String with success or failure message
    */
    createBadge: function (badgeData) {
        Logger.log(JSON.stringify(badgeData));
        var badgeSheet = testSpreadsheet.getSheetByName('BADGES');
        if (validate(badgeData.name, "badgename") && validate(badgeData.description, "badgedesc")) {
            badgeSheet.appendRow([badgeData.name, badgeData.description, badgeData.image, badgeData.criteria]);
            return "badge added";
        } else {
            return "validation failure";
        }
    }
}