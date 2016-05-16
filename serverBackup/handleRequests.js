var baseUrl = "https://script.google.com/macros/s/AKfycbwhWomQjaALphGQ1JeSQhfO0VsaZxYBRl-xnEWp328wB4wFlg_T/exec";

/*
****************Needs some error handling ****************
* args request
*
* return ContentService
*/
function doPost(request) {
    
    var badgeName = addPostedBadge(request);
  
    if (request.parameter.import) {
      var import = request.parameter.import;
      return ContentService.createTextOutput('Processing file upload request');
    } else if (badgeName) {
        /* addPostedAssertion */
        var uid = addAssertion(badgeName, request.parameter.name, request.parameter.email, request.parameter.expiration, request.parameter.evidence);
        /*
        * Now we're using our own HTML form we need to explicitly call emailRecipient to send out the email instead of using form triggers
        */
        emailRecipient(uid);
        return HtmlService.createHtmlOutputFromFile('success.html')
            .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    } else {
        Logger.log("No badge data posted");
        return ContentService.createTextOutput('Invalid POST request: contact administrator');
    }
}

/* 
* If the parameters don't inlcude a claim code then send back the form to create a badge or assertion
* 
* args request
*
* return Html Service - badge issuer form
* return ContentServcie - If there is a claim code then issue the badge assertion data
*/
function doGet(request) {
    var contentService;
    // start with check if any data first otherwise error thrown when trying to access parameters of undefined
    if (!request) {
        return ContentService.createTextOutput('Internal error,  no request sent with GET');
    } else if (request.parameter.badgeName || request.parameter.badgename) {  // rubbish!! make all url queries lowercase then do test
      var badgeClass = buildBadgeJson(request.parameter.badgeName);
      if (badgeClass) {
        contentService = createContentService(badgeClass);
        return contentService;
      } else {
        return ContentService.createTextOutput("Badge not found");
      }
    } else if (request.parameter.claim_code) {
        var badgeAssertion = buildAssertionJson(request.parameter.claim_code);
        contentService = createContentService(badgeAssertion);
        return contentService;
    } else {
        return HtmlService.createHtmlOutputFromFile('ui.html')
            .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    }
}