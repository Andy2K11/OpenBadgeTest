// Simply run this to set the active spreedsheets ID. If you change this, remember to also change the doc variable in the doGet function to match.
// No Edits Necessary

function setup(){
  ScriptProperties.setProperty('test', SpreadsheetApp.getActiveSpreadsheet().getId());
}