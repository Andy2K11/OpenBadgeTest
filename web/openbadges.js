var baseUrl = "https://script.google.com/macros/s/AKfycbwhWomQjaALphGQ1JeSQhfO0VsaZxYBRl-xnEWp328wB4wFlg_T/exec?claim_code=";
var bakerBaseUrl = "http://backpack.openbadges.org/baker?assertion=";

function getQueryString() {
    var urlSearchString = window.location.search;
    var startIndex = urlSearchString.search("claim_code=") + 11;
    var separatorIndex = urlSearchString.indexOf("&", startIndex);
    var endIndex = separatorIndex + 1 ? separatorIndex - startIndex : urlSearchString.length;
    var result =  urlSearchString.substr(startIndex, endIndex);
    return result; 
}
        
function callback(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
}

function doIssue() {
    var link = baseUrl + getQueryString();
    OpenBadges.issue_no_modal([link], callback);
}

function doBake() {
    var link = bakerBaseUrl + baseUrl + getQueryString();
    return link;
}
