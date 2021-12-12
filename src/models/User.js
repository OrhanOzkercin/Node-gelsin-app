const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    addresses: [
      {
        title: String,
        address1: String,
        address2: String,
        country: String,
        province: String,
        code: String,
      },
    ],
    phones: [
      {
        number: String,
        type: String,
      },
    ],
    favorites: [], //! Products Ref..
    isAdmin: Boolean,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("user", UserSchema);
