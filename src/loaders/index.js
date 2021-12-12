const { connectDB } = require("./mongodb");
const { runApp } = require("./ozgeacik");

module.exports = () => {
  connectDB();
  runApp();
};
