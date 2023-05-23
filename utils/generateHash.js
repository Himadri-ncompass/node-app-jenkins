//add bcrypt
const bcrypt = require("bcrypt");

async function genhash(data) {
  const saltRounds = 5;
  const salt = await bcrypt.genSalt(saltRounds);
  const pass = await bcrypt.hash(data, salt);

  return pass;
}
async function validateUser(hash, password) {
  let res = await bcrypt.compare(password, hash);
  return res;
}
module.exports = { genhash, validateUser };
