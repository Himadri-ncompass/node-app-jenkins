const cors=require("cors")

//add query.js
const {
  createUser,
  ReadId,
  ReadUser,
  DeleteId,
  UpdateId,
  login,
  getMe,

} = require("./controller/userController");
//added express
const express = require("express");
const app = express();
app.use(express.json());
const port = 3001;
//add joiValidation
const joi = require("./middleware/joiValidation");

const corsOptions = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  optionSuccessStatus: 200,
}


app.use(cors(corsOptions))
//Create User
app.post("/user/signUp",cors(), joi.validates, createUser);
//Read All
app.get("/user/readall",cors(), ReadUser);

//Read using ID
app.get("/user/read/:ID",cors(), ReadId);

//Update using Id
app.put("/user/update/:ID",cors(), UpdateId);

//Delete using Id
app.delete("/user/delete/:ID",cors(), DeleteId);

//Login
app.get("/user/login",cors(), login);

//Get ME
app.get("/user/getme",cors(),getMe)

//Port Listening
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
