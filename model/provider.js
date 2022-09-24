const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    unique:true,
  },
  
});

module.exports = mongoose.model("provider", TaskSchema); //This name is used with adding 's' behind the name for naming the collection
