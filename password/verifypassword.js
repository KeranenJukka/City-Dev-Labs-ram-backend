var bcrypt = require('bcryptjs');


async function comparePassword (password, hash) {

    

 var pass =  bcrypt.compare(password, hash);

 return pass;

}


module.exports = comparePassword;