
var jwt = require('jsonwebtoken');

require('dotenv').config();


async function createToken (user) {

var token =

    jwt.sign({
        data: user
      }, process.env.SECRET, { expiresIn: '1h' });

return token;

}


module.exports = createToken;