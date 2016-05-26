// With thanks to 'thoughtcrime' on StackOverFlow - http://stackoverflow.com/questions/22079353/write-a-unique-code-when-submit-google-form-script
// Function for generating a random 8 character string to use as a unique ID.
// No Edits Necessary

function genRandomString(len, bits){
  bits = bits || 36;
  var outStr = "", newStr;
  while (outStr.length < len)
  {
    newStr = Math.random().toString(bits).slice(2);
    outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
  }
  return outStr.toUpperCase();
}