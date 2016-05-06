// !! JSON templates filled in with test data, replace with live values as dev progresses !!

// dev url for testing (doesn't work, fix Google) "https://script.google.com/macros/s/AKfycbxPui2tcqSmWh_OwVz8VlmxsXJHXENjoRVe-W3NsTu7/dev"

/* Initialising some of these as blank to to keep human readable structure
 * Updated to v1.1
 * Of the three JSON files required, this is the Assertion, the other two need 
 * to be available on a public url
 */
var salt = "pegasus";
var baseUrl = "https://script.google.com/macros/s/AKfycbyzCKQzMrluXPts1NaYE2KHUzK9t7ov4FZWrPbBUzyVgWLe8K2P/exec";

var badgeAssertion = {
  "@context": "https://w3id.org/openbadges/v1",
  "type": "Assertion",
  "id": "https://script.google.com/macros/s/AKfycbyzCKQzMrluXPts1NaYE2KHUzK9t7ov4FZWrPbBUzyVgWLe8K2P/exec",
  "uid": "testID",
  "recipient": {
    "identity": "",
    "type": "email",
    "hashed": true,
    "salt": salt
  },
  //"image": "http://openbadges.corductive.uk/testBadge.png",  // needs to be baked?
  "evidence": "http://openbadges.corductive.uk/index.html",
  "badge": "https://script.google.com/macros/s/AKfycbyzCKQzMrluXPts1NaYE2KHUzK9t7ov4FZWrPbBUzyVgWLe8K2P/exec?badgeName=Shiny",
  "verify": {
    "type": "hosted",
    //"url": "http://openbadges.corductive.uk/doNotUse_rsa.pub"
    "url": "https://script.google.com/macros/s/AKfycbyzCKQzMrluXPts1NaYE2KHUzK9t7ov4FZWrPbBUzyVgWLe8K2P/exec"
  },
  "issuedOn": "1979-01-01"
};

var badgeClass = {
    "@context": "https://w3id.org/openbadges/v1",
    "id": "https://script.google.com/macros/s/AKfycbyzCKQzMrluXPts1NaYE2KHUzK9t7ov4FZWrPbBUzyVgWLe8K2P/exec?badgeName=Shiny",
    "type": "BadgeClass",
    "name": "",
    "description": "",
    "image": "",
    "criteria": "",
    "issuer": "http://openbadges.corductive.uk/issuerOrganisation.json"
}

var testSpreadsheet = SpreadsheetApp.openById(ScriptProperties.getProperty('test'));

/*
 * For when new badge data has been included in the submitted form
 * Alternatively, gets the name of the selected badge if a new badge is not being created
 *
 * Returns: badgeName (string) or False if no new badge or selected badge 
 */
function addNewBadge(e) {
  var badgeSheet = testSpreadsheet.getSheetByName('BADGES');
  
  /*
   * If badge parameters exist then validate them, else see if an existing badge has been selected
   */
  if (e.parameter.badgename && e.parameter.badgedescription && e.parameter.badgeimage && e.parameter.badgecriteria) {
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
}

/*
 * Returns the badges currently in the spreadsheet
 * Commonly used to fill out, or refresh, the options of a select element
 */
function getBadges() {
  Logger.log("Getting badges");
  var badgeSheet = testSpreadsheet.getSheetByName('BADGES');
  var badgesAoAs = badgeSheet.getRange(2, 1, badgeSheet.getLastRow(), 1).getValues();
  var badges = [];
  for (i in badgesAoAs) {
    badges.push(badgesAoAs[i][0]);
  }
  return badges;
}

/*
 * Used when the user requests to create a badge without submitting the form
 * This is useful if no badges are to be issued but a new badge is to be created
 */
function createBadge(badgeData) {
  Logger.log(JSON.stringify(badgeData));
  var badgeSheet = testSpreadsheet.getSheetByName('BADGES');
  if (validate(badgeData.name, "badgename") && validate(badgeData.description, "badgedesc")) {
    badgeSheet.appendRow([badgeData.name, badgeData.description, badgeData.image, badgeData.criteria]);
    return "badge added";
  } else {
    return "validation failure";
  }
}

function doPost(e) {
  Logger.log("Post Message Recieved");
  var dataSheet = testSpreadsheet.getSheetByName('DATA');
  var badgeName = addNewBadge(e);
  if (badgeName) {
    dataSheet.appendRow([new Date(), badgeName, e.parameter.name, e.parameter.email, '', 'imported', genRandomString(8, 16)]);
    /*
     * Now we're using our own HTML form we need to explicitly call onFormSubmit to send out the email instead of using form triggers
     */
    onFormSubmit(e);
    return HtmlService.createHtmlOutputFromFile('success.html')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  } else {
    Logger.log("No badge data posted");
    return "<h1>FAIL</h1>";
  } 
}

function getBadgeClass(badgeName) {
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
  badgeClass.name = badgeName;
  badgeClass.description = badgeNamesArray.getCell(i, 2).getValue();
  badgeClass.image = badgeNamesArray.getCell(i, 3).getValue();
  badgeClass.criteria = badgeNamesArray.getCell(i, 4).getValue();
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  var content = JSON.stringify(badgeClass);
  Logger.log(content);
  output.setContent(content);
  return output;
}

function doGet(e){  
 /* If there are no parameters, or the parameters don't inlcude a claim code then
  * return the badge issuer form.
  * If there is a claim code then issue the badge assertion data
  */
  Logger.log("First line of doGet");
  if (!e) {
    Logger.log("No object passed - using test parameter");
    return HtmlService.createHtmlOutputFromFile('ui.html')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  } else if (!e.parameter.claim_code) {
    if (e.parameter.badgeName || e.parameter.badgename) {
      return getBadgeClass(e.parameter.badgeName);
    } else {
      Logger.log("No claim code");
      return HtmlService.createHtmlOutputFromFile('ui.html')
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    }
  } else {
    Logger.log("Claim code is: " + e.parameter.claim_code);
  }
  
  // To access spreadsheet data we need to get by id (stored by running setup function)
  var doc = SpreadsheetApp.openById(ScriptProperties.getProperty('test'));
  var response = doc.getSheetByName("DATA");
  var badgeinfo = doc.getSheetByName("BADGES");
  
  // Decode claim_code
  var claim_encode = Utilities.base64Decode(e.parameter.claim_code);
  
  // Need to convert byte array to string
  var claim_code = bin2String(claim_encode);
  
  // Extract uniqueid and type passed in claim_code
  var data = getQueryString("?"+claim_code);
  var UID = data.uniqueid;
  Logger.log(UID);
  

  // Find out the row from the UID
  var column = response.getRange('G:G');
  var values = column.getValues();
  var row = 1;
  while (values[row-1] != UID) {
    row++;
  }
  
  var name = response.getRange(row, 2).getValue();
  
  // Based on code from community member Serge Insas
  // http://stackoverflow.com/questions/13327069/search-spreadsheet-column-for-text-in-a-string-and-return-a-result-in-another-co
 
  // Read all data in the sheet
  var badgedata = badgeinfo.getDataRange().getValues();
  
  // Iterate row by row and examine data in columns based on the name string
  for(n=0;n<badgedata.length;++n){
  
    if(badgedata[n][0] == name){
      var description = badgedata[n][1];
      var image = badgedata[n][2];
      var criteria = badgedata[n][3];
   };
  }
  
  var timestamp = response.getRange(row, 1).getValue();
  var email = response.getRange(row, 4).getValue();
  var expires = response.getRange(row, 5).getValue();

 
  /*
   * Hosted assertion must match assertion passed here (same file so it should) but google urls must be 
   * the correct ones that will return a valid JSON file, in other words they must have both the base
   * url and the correct claim code query appended
   */
  badgeAssertion.id = badgeAssertion.id + "?claim_code=" + e.parameter.claim_code;
  badgeAssertion.verify.url = badgeAssertion.id;    // presume there is a reason the open badges spec allows these to be different, but for the moment they are the same
  badgeAssertion.uid = UID;
  badgeAssertion.recipient.identity = hashEmailAddress(email, salt);
  badgeAssertion.issuedOn = Utilities.formatDate(timestamp, "GMT", "yyyy-MM-dd");
  badgeAssertion.badge = baseUrl + "?badgeName=" + name; //hashEmailAddress(name, salt);
  // badgeAssertion.image = image;
  if (expires.length) {
    badgeAssertion.expires = Utilities.formatDate(expires, "GMT", "yyyy-MM-dd");
  }
  
  var header = {
    "alg": "HS256"
  }
  
  var header64 = Utilities.base64Encode(JSON.stringify(header));
  var payload64 = Utilities.base64Encode(JSON.stringify(badgeAssertion));
  var token = header64 + "." + payload64;
  var key = "secret";
  
  var files = DriveApp.getFilesByName("doNotUse_rsa");
  var file = files.next();
  var privateKey = file.getBlob().getDataAsString();
  
  
  var signature = Utilities.computeHmacSha256Signature(token, privateKey);
  //var content = header64 + "." + payload64 + "." + signature;
  
  // Now that Assertion is complete next lines publish it to the web ready to send back to the issuer gadget on Google Sites
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  var content = JSON.stringify(badgeAssertion);
  Logger.log(content);
  output.setContent(content);
  return output;
}