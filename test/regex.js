var pattern = /\@ucs\.ac\.uk$/;
var res = pattern.test("andy@ucs.ac.uk");
console.log(res);

var pattern = /\.png$/;
var res = pattern.test("image.png");
console.log(res);

var pattern = /^http\:\/\//;
var res = pattern.test("http://www.example.com");
console.log(res);