const User = require('../models/in_memo/user')

module.exports.getAllUsers = function() {
  return User.list();
}

module.exports.addNewUser = function(username,password) {
  return User.insert(username,password)
}