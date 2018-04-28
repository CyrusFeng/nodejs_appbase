//const User = require('../models/in_memo/user')
const User = require('../models/mongoose/user')
//const Subscription = require('../models/in_memo/subscription')
const Subscription = require('../models/mongoose/subscription')
const HttpRequestParamError = require('../errors/http_request_param_error')
const NoSuchUserError = require('../errors/no_such_user_error')
const JWT = require('jsonwebtoken')
const JWTConfig = require('../cipher/jwt_config')

module.exports.getAllUsers = async function () {
  const users = await User.list();
  return users;
}

module.exports.addNewUser = async function (userObj) {
  if (!userObj || !userObj.username || !userObj.password) {
    throw new HttpRequestParamError('user', '用户名或密码不能为空', 'empty username or password');
  }
  const user = await User.addUserByUsernameAndPassword(userObj);
  const token = JWT.sign({
    _id: user._id.toString(),
    expireAt: Date.now().valueOf() + JWTConfig.EXPIREIN
  }, JWTConfig.SELECT)
  return {
    user,
    token
  };
}

module.exports.loginwithNamePass = async function (userObj) {
  if (!userObj.username || !userObj.password) {
    throw new HttpRequestParamError('user', '用户名或密码不能为空', 'empty username or password');
  }
  const found = await User.getUserByUsernameAndPassword(userObj);
  if (!found) {
    throw new NoSuchUserError(userObj.username)
  }

  const token = JWT.sign({
    _id: found._id.toString(),
    expireAt: Date.now().valueOf() + JWTConfig.EXPIREIN
  }, JWTConfig.SELECT)

  return {
    token,
    user: found
  };
}

module.exports.getUserByID = async function (userID) {
  const user = await User.getOneByID(userID);
  return user;
}

module.exports.createSubscription = async function (userID, url) {
  const user = await User.getOneByID(userID);
  if (!user) {
    throw Error('No such user');
  }

  const sub = await Subscription.insert(userID, url);
  return sub;
}