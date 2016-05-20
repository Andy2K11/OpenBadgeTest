/*
* Used when the user requests to create a badge without submitting the form
* This is useful if no badges are to be issued but a new badge is to be created
*
* args BadgeData in JSON format
*
* return String with success or failure message
*/
function createBadgeFromJson(badgeData) {
  
  var badgeSheet = SpreadsheetApp.openById(ScriptProperties.getProperty('test')).getSheetByName('BADGES');
  
  if (validate(badgeData.name, "badgename") && validate(badgeData.description, "badgedesc")) {
    badgeSheet.appendRow([badgeData.name, badgeData.description, badgeData.image, badgeData.criteria]);
    return "badge added";
  } else {
    return "validation failure";
  }
}