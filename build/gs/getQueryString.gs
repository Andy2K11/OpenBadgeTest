// Function to normalise Query String
// No Edits Necessary

function getQueryString(ref) {
  var qs= ref.split('?');
  var result = {}, queryString = qs[1],
      re = /([^&=]+)=([^&]*)/g, m;
  while (m = re.exec(queryString)) {
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  return result;
}