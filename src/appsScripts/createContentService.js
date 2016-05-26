/*
 * args Data in JSON format 
 *
 * returns ContentService with badge data as content
 */
function createContentService(data) {
  // Now that Assertion is complete next lines publish it to the web ready to send back to the issuer gadget on Google Sites
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  var content = JSON.stringify(data);
  Logger.log(content);
  output.setContent(content);
  return output;  
}