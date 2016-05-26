/*
 * If the string is matched in the range provided, returns the row number
 *
 * isMatchInColumn(the range to search through: Range, the string to be matched: String, the col to search: Number)
 * return row match found: Number
 */
function isMatchInColumn(range, match, col) {
  for (var i = range.getLastRow() + 1; --i; ) {
    Logger.log(range.getCell(i, col).getValue());
    if (range.getCell(i, col).getValue() === match) {
      return i;
    }
  }
  return false;
}
