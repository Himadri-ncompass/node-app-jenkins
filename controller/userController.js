//added express
const express = require("express");
const app = express();
app.use(express.json());



//add database
const db = require("../utils/dbConnections");

//added generateHash
const g = require("../utils/generateHash");

//added query emulator
const query = require("../databaseEmulator/queryEmulator");

//added jwtvalidation
const jwt = require("../middleware/jwtValidation");

//function to create user
async function createUser(req, res) {
  let data = await req.body;
  data.PASSWORD = await g.genhash(data.PASSWORD);
  const [compareEmail] = await db.promisePool.query(
    "SELECT EMAIL FROM USER WHERE EMAIL=?",
    data.EMAIL
  );
  if (compareEmail.length > 0) {
    res.send("Email already exists");
  } else {
    const [rows] = await db.promisePool.query(query.obj.insert, data);
    const [info] = await db.promisePool.query(query.obj.select, data.ID);
    res.send({
      message: "Successful Created",
      info,
    });
  }
}
//function to read all user
async function ReadUser(req, res) {
  let read = query.obj.select2;
  const [data] = await db.promisePool.query(read);
  res.send({
    message: "Successful",
    data,
  });
}
//function to read a specific id
async function ReadId(req, res) {
  let readId = req.params.ID;
  let info = req.body;
  const [data] = await db.promisePool.query(query.obj.select, readId);
  res.send({
    message: "Successful",
    data,
  });
}
//function to read a update id
async function UpdateId(req, res) {
  let info = req.body;
  let readId = req.params.ID;

  const [] = await db.promisePool.query(query.obj.update, [info, readId]);
  const [data] = await db.promisePool.query(query.obj.select, readId);
  
  res.send({
    message: "Successful Updated",
    data,
  });
}

//function to read a delete id

async function DeleteId(req, res) {
  let readId = req.params.ID;
  const [data] = await db.promisePool.query(query.obj.select, readId);
  const [] = await db.promisePool.query(query.obj.deleteData, readId);

  res.send({
    message: "Successfully Deleted",
    data,
  });
}
//function to validate login

async function login(req, res) {
  let data = req.body;
  
  const [compareEmail] = await db.promisePool.query(
    "SELECT EMAIL FROM USER WHERE EMAIL=?",
    data.EMAIL
  );

  if (compareEmail.length > 0) {
    const [pass] = await db.promisePool.query(
      "Select PASSWORD FROM USER WHERE EMAIL=?",
      data.EMAIL
    );
    if ((await g.validateUser(pass[0].PASSWORD, data.PASSWORD)) == true) {
      const tk = await jwt.tokenGenerator(data);
      const result={
        jwt: tk,
        message: "login successful",
        data: data,
      }
      res.send(result);
    } else {
      res.send({
        message: "login unsuccessful",
        data: data,
      });
    }
  } else {
    res.send("Wrong Credentials");
  }
}
//get me function
async function getMe(req, res) {
  
  let token = req.headers.token;
  
  
  let info = await jwt.check(token);

  res.send(info);
}

module.exports = {
  createUser,
  ReadUser,
  ReadId,
  UpdateId,
  DeleteId,
  login,
  getMe,
};
