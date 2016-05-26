function buildBadgeJson(badgeName) {
  var baseUrl = PropertiesService.getScriptProperties().getProperty('baseUrl');
  var badgeClass = {
    "@context": "https://w3id.org/openbadges/v1",
    "id": "",
    "type": "BadgeClass",
    "name": "",
    "description": "",
    "image": "",
    "criteria": "",
    "issuer": "http://www.ucslearningservices.co.uk/openbadges/issuerOrganisation.json"
  };
  
  var badgeSheet = SpreadsheetApp.openById(ScriptProperties.getProperty('test')).getSheetByName('BADGES');
  var numRows = badgeSheet.getLastRow() - 1; // first row is header
  var badgeDataRange = badgeSheet.getRange(2, 1, numRows, badgeSheet.getLastColumn());  

  /* Loop through the data range until we find a match, breaking out will leave i equal to the matching row */
  var i = numRows + 1;  // a little short cut to count down from numRows to 1 (not zero) using pre-decrement as test
  for ( i; --i; ) {
    if (badgeDataRange.getCell(i, 1).getValue() === badgeName) {
      break;
    }
  }
  if (i === 0) {
    return false;
  }
   
  badgeClass.id = baseUrl + "?badgeName=" + encodeURIComponent(badgeName);
  badgeClass.name = badgeName;
  badgeClass.description = badgeDataRange.getCell(i, 2).getValue();
  badgeClass.image = badgeDataRange.getCell(i, 3).getValue();
  badgeClass.criteria = badgeDataRange.getCell(i, 4).getValue();
  
  return badgeClass;
}
