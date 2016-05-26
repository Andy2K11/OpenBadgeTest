/*
 * Validate badge and recipient inputs from form
 */
var errorString = "";

function validate(value, field) {
  var isValid = false;
  switch(field) {
    case "badgename": 
      if (!value) {
        errorString += "\nBadge name is missing";
        Logger.log("Badge name missing");
      } else {
        isValid = true;
      }
      break;
    case "badgedesc":
      if (!value) {
        errorString += "\nBadge description is missing";
        Logger.log("Badge description missing");
      } else {
        isValid = true;
      }
      break;
    case "badgeimage": // put something useful in here
    case "badgecriteria":
    case "selectedbadge":
      isValid = true;
      break;
    default: 
        errorString += "\nInternal error: Field not recognised";
        Logger.log("Internal error: Field not recognised");
      break;
  }
  return isValid;
}