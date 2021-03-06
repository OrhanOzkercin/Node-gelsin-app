const User = require("../models/User");

const list = () => {
  return User.find({});
};

const insert = (data) => {
  return new User(data).save();
};

const findOne = (where) => {
  return User.findOne(where);
};

const modify = (where, data) => {
  return User.findOneAndUpdate(where, data, { new: true });
};
// const updateDoc = () => {};
// const deleteDoc = () => {};

module.exports = {
  list,
  insert,
  findOne,
  modify
};
