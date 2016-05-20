function generateUid(testArray) {
  var uid = genRandomString(8,16);
    for (var i = testArray.length; i--; ) {
      if (uid === testArray[i]) {
        i = testArray.length;  // restart loop
        uid = genRandomString(8,16);
      }
    }
  return uid;
}