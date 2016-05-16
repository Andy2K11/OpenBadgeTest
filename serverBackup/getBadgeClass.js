function buildBadgeJson(badgeName) {
  var badgeSheet = testSpreadsheet.getSheetByName('BADGES');
  var badgeNamesArray = badgeSheet.getRange(2, 1, badgeSheet.getLastRow(),badgeSheet.getLastColumn());
  Logger.log("badgeNamesArray: " + badgeNamesArray);
  var row = 0;
  for (var i = badgeNamesArray.getLastRow() - 1; i--; ) {
    Logger.log(badgeNamesArray.getCell(i, 1).getValue());
    if (badgeNamesArray.getCell(i, 1).getValue() === badgeName) {
      row = i;
      break;
    }
  }
  Logger.log("Badge found in row " + row);
  badgeClass.id = baseUrl + "?badgeName=" + encodeURIComponent(badgeName);
  badgeClass.name = badgeName;
  badgeClass.description = badgeNamesArray.getCell(i, 2).getValue();
  badgeClass.image = badgeNamesArray.getCell(i, 3).getValue();
  badgeClass.criteria = badgeNamesArray.getCell(i, 4).getValue();
  return badgeClass;
}
