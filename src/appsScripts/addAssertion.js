function addAssertion(badgeName, recipientName, recipientEmail, expirationDate, evidence) {
  var dataSheet = SpreadsheetApp.openById(ScriptProperties.getProperty('test')).getSheetByName('DATA');
  var UIDArray = [dataSheet.getRange(2, 7,dataSheet.getLastRow(), 7)];
  var uid = generateUid(UIDArray);
  dataSheet.appendRow([new Date(), badgeName, recipientName, recipientEmail.trim(), expirationDate, evidence, uid]);
  return uid;
}