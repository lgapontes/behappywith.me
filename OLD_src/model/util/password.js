var crypto = require('crypto');
const JsonBased = require("./json-based");
const Valid = require("./valid");

class Password extends JsonBased {
    /* Based on the work of Rahil Shaikh, published at ciphertrick.com */
    random(length) {
        return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex')    /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
    }
    sha512(password, salt) {
        let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);        
        return {
            hash: hash.digest('hex'),
            salt: salt            
        };
    }
    isValid(clearPassword) {
        let valid = new Valid(true);
        if ( (typeof this.name !== 'string') || (this.name.length < 5) ) {
            valid.addError({ property: 'password', error: 'Invalid password!'});
        }
        return valid;
    }
    encrypt(clearPassword) {
        let valid = isValid(clearPassword);
        if (valid.yes()) {
            var salt = random(16); /** Gives us salt of length 16 */
            var data = sha512(clearPassword, salt);
            this.hash = data.hash;
            this.salt = data.salt;
        }
        return valid;
    }
    checkPassword(clearPassword) {
        var hashPassword = sha512(clearPassword, this.salt).hash;
        if (hashPassword === this.hash) {

        }
    }
}