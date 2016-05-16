/*
 * A small test script to import badge data from another google spreadsheet
 */
function doImport() {
  var export = SpreadsheetApp.openById(ScriptProperties.getProperty('test'));
  var import = SpreadsheetApp.openById(ScriptProperties.getProperty('import'));
  var data = import.getDataRange().getValues();
  Logger.log("Import data");
  for (i in data) {
    var row = data[i];
    export.appendRow(['timestamp', 'badge', row[0], row[1], 'expires', 'imported', genRandomString(8, 16)]);
  }
}