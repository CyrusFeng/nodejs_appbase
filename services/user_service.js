const User = require('../models/in_memo/user')
const Subscription = require('../models/in_memo/subscription')

module.exports.getAllUsers = function() {
  return User.list();
}

module.exports.addNewUser = function(username,password) {
  return User.insert(username,password);
}

module.exports.getUserByID = function(userID) {
  return User.getOneByID(userID);
}

module.exports.createSubscription = function(userID,url) {
  const user =  User.getOneByID(userID);
  if (!user) {
    throw Error('No such user');
  }
  const sub = Subscription.insert(userID,url);
  return sub;
}