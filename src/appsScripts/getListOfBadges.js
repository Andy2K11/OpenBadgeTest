/*
* Returns the badges currently in the spreadsheet
* Commonly used to fill out, or refresh, the options of a select element
*/
function getListOfBadges() {
  var badgeSheet = SpreadsheetApp.openById(ScriptProperties.getProperty('test')).getSheetByName('BADGES');
  var badgesAoAs = badgeSheet.getRange(2, 1, badgeSheet.getLastRow() - 1, 1).getValues();
  var badges = [];
  for (i in badgesAoAs) {
    badges.push(badgesAoAs[i][0]);
  }
  return badges;
};