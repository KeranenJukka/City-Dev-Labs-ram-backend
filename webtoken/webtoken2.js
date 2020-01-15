var jwt = require('jsonwebtoken');


async function verifyToken (token) {

    var tok = jwt.verify(token, 'secret');

    return tok;

}


module.exports = verifyToken;