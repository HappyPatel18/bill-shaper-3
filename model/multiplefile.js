const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mulitipleFileSchema = new Schema({
    userid:{
        type:String,
        required:true
    },
    ssn:{
        type:String,
        required:true
    },
    ccn:{
        type:String,
        required:true
    },
    serviceprovider:{
        type: String,
        required:true
      },
    note:{
        type:String,
    },
    useremail:{
        type:String,
        required:true
    },
    seq: { type: Number, default: 0 },
                filename:{
                    type:String,
                } ,
                filepath:{
                    type:String,
                } ,
                filestatus :{
                    type:String,
                },
               
                fileuseremail:{
                    type:String,
                },
                filesavedamount:{
                    type:String,
                },
                firstname:{
                    type:String,
                },
                lastname:{
                    type:String,
                },
    
    
}, {timestamps: true});

module.exports = mongoose.model('bills', mulitipleFileSchema);