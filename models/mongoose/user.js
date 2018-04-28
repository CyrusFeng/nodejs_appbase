const mongoose = require('mongoose');

const pbkdf2Async = require('util').promisify(require('crypto').pbkdf2);

const PasswordConfig = require('../../cipher/password_config');

const HttpRequestParamError = require('../../errors/http_request_param_error')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: 1,
    // unique: true
  },
  password: {
    type: String,
    required: true
  }
})

const UserModel = mongoose.model('user', UserSchema);

async function insert(userObj) {
  //const created = await UserModel.create({username:username,password:password});
  const created = await UserModel.create(userObj);
  return created;
}

async function getOneByName(username) {
  const user = await UserModel.findOne({
    username: username
  });
  return user
}
async function getOneByID(id) {
  const user = await UserModel.findOne({
    _id: id
  });
  return user;
}
async function list(id) {
  const match = {};
  const flow = UserModel.find(match)
  const users = await flow.exec();
  return users;
}

async function addUserByUsernameAndPassword(userObj) {

  const usernameDupUser = await UserModel.findOne({
    username: userObj.username
  });

  // const usernameDupUser = await UserModel.findOne({
  //   $or:[
  //     {
  //       username: userObj.username
  //     },{
  //       name: userObj.name
  //     }
  //   ]},{_id:1});

  if (usernameDupUser) {
    throw new HttpRequestParamError('username', '此用户名已被占用', `duplicate username:${userObj.username}`)
  }

  //const created = await UserModel.create({username:username,password:password});
  const passToSave = await pbkdf2Async(userObj.password, PasswordConfig.SALT, PasswordConfig.ITERATIONS, PasswordConfig.KEYLEN, PasswordConfig.DIGEST);
  //const created = await UserModel.create(userObj);
  const created = await insert({
    username: userObj.username,
    password: passToSave
  });
  return {
    _id: created._id,
    username: created.username
  };
}

async function getUserByUsernameAndPassword(userObj) {
  //const created = await UserModel.create({username:username,password:password});
  const passToFind = await pbkdf2Async(userObj.password, PasswordConfig.SALT, PasswordConfig.ITERATIONS, PasswordConfig.KEYLEN, PasswordConfig.DIGEST);

  const found = await UserModel.findOne({
    username: userObj.username,
    password: passToFind
  }, {
    //不返回密码
    password: 0
  });
  return found;
}

module.exports = {
  insert,
  getOneByName,
  getOneByID,
  list,
  addUserByUsernameAndPassword,
  getUserByUsernameAndPassword
}