var jwt = require("jsonwebtoken");
require("dotenv");
async function tokenGenerator(data) {
  var token = jwt.sign(
    {
      ID: data.ID,
      iat: Math.floor(Date.now() / 1000) - 30,
      EMAIL: data.EMAIL,
      PHONE:data.PHONE
    },
    process.env.secretKey
  );
 
  return token;
}
async function check(tokenData) {
  let decoded = jwt.verify(tokenData, process.env.secretKey);
  
  return decoded;
}
module.exports = { check, tokenGenerator };
