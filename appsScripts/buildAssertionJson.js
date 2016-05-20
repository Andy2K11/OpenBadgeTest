/*
 * args claim code as Byte array
 *
 * returns ContentService
 */
function buildAssertionJson(claimCodeEncoded) {
  /* Initialising some of these as blank to to keep human readable structure
   * Updated to v1.1
   * Of the three JSON files required, this is the Assertion, the other two need 
   * to be available on a public url
   */
  var salt = "pegasus";
  var baseUrl = PropertiesService.getScriptProperties().getProperty('baseUrl');
  var badgeAssertion = {
    "@context": "https://w3id.org/openbadges/v1",
    "type": "Assertion",
    "id": "",
    "uid": "testID",
    "recipient": {
      "identity": "",
      "type": "email",
      "hashed": true,
      "salt": salt
    },
    //"image": "",  // needs to be baked?
    "evidence": "",
    "badge": "",
    "verify": {
      "type": "hosted",
      "url": ""
    },
    "issuedOn": "1979-01-01"
  };
  
  
  // To access spreadsheet data we need to get by id (stored by running setup function)
  var response = SpreadsheetApp.openById(ScriptProperties.getProperty('test')).getSheetByName("DATA");
  
  // Decode claim_code
  var claimDecoded = Utilities.base64Decode(claimCodeEncoded);
  
  // Need to convert byte array to string
  var claimCode = bin2String(claimDecoded);
  
  // Extract uniqueid and type passed in claim_code
  var data = getQueryString("?"+claimCode);
  var UID = data.uniqueid;
 

  // Find out the row from the UID
  var column = response.getRange('G:G');
  var values = column.getValues();
  var row = 1;
  while (values[row-1] != UID) {
    row++;
  }
   
  var timestamp = response.getRange(row, 1).getValue();
  var badgeName = response.getRange(row, 2).getValue();
  var email = response.getRange(row, 4).getValue();
  var expires = response.getRange(row, 5).getValue();
 
  /*
   * Hosted assertion must match assertion passed here (same file so it should) but google urls must be 
   * the correct ones that will return a valid JSON file, in other words they must have both the base
   * url and the correct claim code query appended
   */
  badgeAssertion.id = baseUrl + "?claim_code=" + claimCodeEncoded;
  badgeAssertion.verify.url = badgeAssertion.id;    // presume there is a reason the open badges spec allows these to be different, but for the moment they are the same
  badgeAssertion.uid = UID;
  badgeAssertion.recipient.identity = hashEmailAddress(email, salt);
  badgeAssertion.issuedOn = Utilities.formatDate(timestamp, "GMT", "yyyy-MM-dd");
  badgeAssertion.badge = baseUrl + "?badgeName=" + encodeURIComponent(badgeName); // encode the name to make if safe (e.g. spaces)
  // badgeAssertion.image = image;
  if (expires.length) {
    badgeAssertion.expires = Utilities.formatDate(expires, "GMT", "yyyy-MM-dd");
  }
  
  return badgeAssertion;
}