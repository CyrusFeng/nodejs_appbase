//const User = require('../models/in_memo/user')
const User = require('../models/mongoose/user')
//const Subscription = require('../models/in_memo/subscription')
const Subscription = require('../models/mongoose/subscription')

module.exports.getAllUsers = async function() {
  const users = await User.list();
  return users;
}

module.exports.addNewUser = async function(username,password) {
  const user = await User.insert(username,password);
  return user;
}

module.exports.getUserByID = async function(userID) {
  const user = await User.getOneByID(userID);
  return user;
}

module.exports.createSubscription = async function(userID,url) {
  const user = await User.getOneByID(userID);
  if (!user) {
    throw Error('No such user');
  }
  const sub = await Subscription.insert(userID,url);
  return sub;
}