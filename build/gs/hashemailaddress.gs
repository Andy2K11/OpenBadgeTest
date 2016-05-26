// Based on https://github.com/mozilla/openbadges/wiki/How-to-hash-&-salt-in-various-languages.
// No Edits Necessary

function hashEmailAddress(email, salt) {
  var hash = CryptoJS.SHA256(email+salt);
  return 'sha256$'+ hash;
}