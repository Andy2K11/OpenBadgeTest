function uploadFile(form) {
  var badgeName;
  form.badgename ? badgeName = form.badgename : badgeName = form.selectedbadge;
  var successCount = 0;
  var failCount = 0;
  var expires = form.expiration;
  var evidence = form.evidence;
  var blob = form.import;
  var password = form.password;
  if (password === "secret" && blob) {
    var fileString = blob.getDataAsString();
    var fileArray = fileString.split("\n");
    var uids = [];
    // last element is length property? first is header.
    for (line = fileArray.length - 1; --line; ) {
      var lineArray = fileArray[line].split(",");
      var uid = addAssertion(badgeName, lineArray[0], lineArray[1], expires, evidence);
      uids.push(uid);
    }
    Logger.log("UIDs " + uids);
    // this one is simple array
    for (uid = uids.length; uid--; ) {
      emailRecipient(uids[uid]) ? successCount++ : failCount++;
    }
    return successCount + " emails successfully sent\n" + failCount + " emailsFailed";
  } else {
    return "file not found";
  }
}