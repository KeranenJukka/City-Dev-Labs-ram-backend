
var jwt = require('jsonwebtoken');




async function createToken (user) {

var token =

    jwt.sign({
        data: user
      }, 'secret', { expiresIn: '1h' });

return token;

}


module.exports = createToken;