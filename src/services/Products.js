const Product = require("../models/Product");

const list = () => {
  return Product.find({})
    .populate({
      path: "user_id",
      select: "first_name email",
    })
    .populate({
      path: "comments",
      populate: {
        path: "user_id",
        select: "first_name",
      },
    });
};

const insert = (data) => {
  return new Product(data).save();
};

const findOne = (where) => {
  return Product.findOne(where);
};

const updateDoc = (docID, updateData) => {
  return Product.findByIdAndUpdate(docID, updateData, { new: true });
};
// const updateDoc = () => {};
// const deleteDoc = () => {};

module.exports = {
  list,
  insert,
  findOne,
  updateDoc,
};
