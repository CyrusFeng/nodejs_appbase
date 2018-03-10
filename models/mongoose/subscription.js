const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SubSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
    index: 1
  },
  url: {
    type: String,
    required: true
  }
})

const SubModel = mongoose.model('sub', SubSchema);

async function list(){   
  const match = {};
  const flow = UserModel.find(match)
  const subs = await flow.exec();
  return subs;
}
async function insert(userId,url) {
  const created = await SubModel.create({userId,url});
  return created;
}

async function findByUserId(userId){
  const sub = await SubModel.find({userId});
  return sub;
}

module.exports = {
  insert,
  findByUserId,
  list
}