const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    service_address: {
    type: String,
    required: [true, "Service Address must be provide name"],
    trim: true,
  },

  account_number: {
    type: String,
    required: [true, "Account Number must be provide name"],
    trim: true,
  },

  accountholder_name: {
    type: String,
    required: [true, " Account Holder Name must provide name"],
    trim: true,
  },
  pin_code: {
    type: String,
    trim: true,
  },
  userid:{
    type: String,
    required: [true, " User Id must provide name"],
    trim: true,
  }
});

module.exports = mongoose.model("BillForm", TaskSchema); //This name is used with adding 's' behind the name for naming the collection
