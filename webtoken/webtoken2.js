var jwt = require('jsonwebtoken');

require('dotenv').config();


async function verifyToken (token) {

    var tok = jwt.verify(token, process.env.SECRET);

    return tok;

}


module.exports = verifyToken;