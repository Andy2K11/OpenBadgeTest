function checkPassword(password) {
    var salt = "a salt";
    var key512Bits1000Iterations = CryptoJS.PBKDF2(password, salt, { keySize: 512/32, iterations: 1000 });
    var hash = "your hash";
    
    if (key512Bits1000Iterations.toString() === hash) {
        return true;
    } else {
        return false;
    }
}
