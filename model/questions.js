const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  user_question: {
    type: String,
    trim: true,
  },
  user_provider :{
    type: String,
    trim: true,
  },
  cancellation_date: {
    type: String,
    trim: true,
  },
  billing_address: {
    type: String,
    trim: true,
  },
  cancellation_reason: {
    type: String,
    trim: true,
  },
  email_address:{
    type: String,
    trim: true,
  },
  type_equipment:{
    type: String,
    trim: true,
    
  },
  monthly_payment:{
    type: String,
    trim: true,

},
unreturned_reason:{
    type: String,
    trim: true,
},
userid:{
    type:String,
    required:true
},

 
});

module.exports = mongoose.model("Question", TaskSchema); //This name is used with adding 's' behind the name for naming the collection
