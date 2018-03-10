const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: 1
  },
  password: {
    type: String,
    required: true
  }
})

const UserModel = mongoose.model('user', UserSchema);

async function insert(username,password) {
  const created = await UserModel.create({username:username,password:password});
  return created;
}

async function getOneByName(username){
  const user = await UserModel.findOne({username:username});
  return user
}
async function getOneByID(id){
  const user = await UserModel.findOne({_id:id});
  return user;
}
async function list(id){   
  const match = {};
  const flow = UserModel.find(match)
  const users = await flow.exec();
  return users;
}

module.exports = {
  insert,
  getOneByName,
  getOneByID,
  list
}