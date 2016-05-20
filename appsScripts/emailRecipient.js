// This function must be setup as a trigger --> emailRecipient --> Spreadsheet --> On form submit
// Function pulls information out of the submitted form and emails the recipient a URL to claim their badge.

function emailRecipient(uid) {
  // Next two lines used to get last row number (might fail on simultanious form submits)
  var sheet = SpreadsheetApp.openById(ScriptProperties.getProperty('test')).getSheetByName("DATA");
  var range = sheet.getDataRange();
  
  var row = isMatchInColumn(range, uid, 7);
  if (!row) {
    Logger.log("No match found");
    return false;
  }
    
  // Next 4 lines read the form values submitted
  var rowData = sheet.getRange(row, 1, row, 7);
  // var timestamp = rowData.getCell(1, 1).getValue();
  var badgename = rowData.getCell(1, 2).getValue();
  var name = rowData.getCell(1, 3).getValue();
  var email = rowData.getCell(1, 4).getValue();
 
  var claim_code = [];
  
  // This is where the Issuer Gadget is hosted
  // var baseUrl = "https://sites.google.com/site/badgetest1234/";
  var baseUrl = "http://www.ucslearningservices.co.uk/openbadges";
  
  // The claim code holds the row number and the type pf badge, which for now is a static &type=openbadge as the 2nd variable isn't used
  var claim_code_base = "uniqueid=" + uid;
  claim_code.push(Utilities.base64Encode(claim_code_base + "&type=openbadge"));
  
  // Build the URL to send
  var url = baseUrl + "?claim_code=" + claim_code;
  
  // Compose text for the email
  var emailText = "Hi "+name+",\n\nCongratulations on obtaining the '" + badgename + 
    "' Badge. To claim your badge visit \n\n" + url + 
      "\n\nThis open badge is essentially a visual recognition of your learning journey which you can store and display online for others to view." +  
        "The badge is stored inside a Mozilla Backpack. To find out how to set up your Mozilla Backpack, please visit http://www.openbadges.org" + 
          "\n\nMany Thanks\n\nThe Digital Learning Team (Learning Services)" + 
            "\n\nPlease visit our blog for more information on how we are using Open Badges at UCS - http://ucselevate.blogspot.co.uk.";
  
  // Using the MailApp function of Apps Script to send the email to the person
  MailApp.sendEmail(email, "Claim your Badge - " + badgename + "!", emailText);
  return true;
}