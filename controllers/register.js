const Register = require("../model/register");
const Provider = require("../model/provider");
const Otp = require("../model/otp");
const { google } = require('googleapis');
const asyncWrapper = require('../middleware/asyncWrapper');
const {createCustomError}  = require('../errors/custom-error');
const bcrypt = require('bcryptjs')
var nodemailer = require('nodemailer');
const { session } = require("passport");
const MultipleFile = require('../model/multiplefile');
const Questions = require('../model/questions');
const BillForm = require('../model/billform');


const CLIENT_ID = '887669515146-u6mt5h72e840qvchgininn372v2aspdo.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04VYyCFFVsykdCgYIARAAGAQSNwF-L9IrYEc0mDDjc9y5pESaOdQdSDWQjIWdZl3U5nvqQHvVOrslCIXzWzAPRNpvhVkukDRMrAA';


const createUser = asyncWrapper(async (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
    const tasks = await Register.findOne({email: email });


    if(!tasks){
      req.body.password = await bcrypt.hash(req.body.password,12);
      const registerUser = await Register.create(req.body);

      if(req.session.Question_Data){
        req.session.Question_Data.userid = registerUser['_id'];
        console.log(req.session.Question_Data);

        const registerquestion = await Questions.create(req.session.Question_Data);
      }
      // session=req.session;
      req.session.userId = registerUser['_id'];
      req.session.email = req.body.email;
      req.session.firstname = req.body.firstname;
      req.session.lastname = req.body.lastname;

      const provider = await Provider.find({});
      res.render("home",{records:provider});

    }
    else{
      req.flash('message','This email address is already registered with us')
      res.redirect('/register');
    }
  
});

const addProvider = asyncWrapper(async (req, res) => {

  const provider = await Provider.create(req.body);
  if(provider){
      res.send("Success");
  }else{
      res.send("Fail")
  }

})

const getProviders = asyncWrapper(async (req, res) => {

  const provider = await Provider.find({});
  if(provider){
      res.render("home",{records:provider});
  }else{
      res.send("Fail")
  }

})

const getUser = asyncWrapper(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(req.body)

  // const tasks = await Register.findOne({email: email , password : password });

  const tasks =await Register.findOne({ email })
  .then(user => {
      if (!user){
            req.flash('message','User not exist')
            res.redirect('/login');
      }
      bcrypt.compare(password, user.password, async(err, data) => {
          //if error than throw error
          if (err) throw err

          //if both match than you can do anything
          if (data) {
            // console.log();
            req.session.userId = user._id;
            req.session.email = user.email;
            req.session.firstname = user.firstname;
            req.session.lastname = user.lastname;

            const provider = await Provider.find({});
            res.render("home",{records:provider});
              // return res.status(200).json({ msg: "Login success" })
          } 
          else {
            req.flash('message','Incorrect Password')
            res.redirect('/login');
              // return res.status(401).json({ msg: "Invalid credencial" })
          }

      })

  })
  
});

const fetchBills = asyncWrapper(async (req, res) => {

})

const showIndex = asyncWrapper(async (req, res) => {
  const provider = await Provider.find({});
  res.render("index",{records:provider});

})

const updateFileStatus = asyncWrapper(async (req, res) => {
  const filestatus = req.body.fileStatus;
  const id= req.body.id;

  const data = await MultipleFile.updateOne({_id:id},{
    $set:{
      filestatus:filestatus
    }
  });
    if(data){
      res.send("Success");
    }else{
      res.send("Fail");
    }
    
  
})

const updateSavedAmount = asyncWrapper(async (req, res) => {
  const filesavedamount = req.body.savedamount;
  const id= req.body.id;
  const data = await MultipleFile.updateOne({_id:id},{
    $set:{
      filesavedamount:filesavedamount
    }
  });
  const savedAmount =  await MultipleFile.find().select('filesavedamount');
  amount_saved = 0;
          for (let i = 0; i < savedAmount.length; i++) {
              amount_saved += parseInt(savedAmount[i]['filesavedamount']);
          }
          console.log(amount_saved);
    amount_send = await amount_saved;      

  if(amount_send){
    res.send(true);
    }
    else{
      res.send(false);
  }
})

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

async function sendMail(email,Otp){
  try{
    const accessToken = await oAuth2Client.getAccessToken();
    let transport = nodemailer.createTransport({
      service: 'gmail',
      port:465,
      secure: true, // true for 465, false for other ports
      logger: true,
      debug: true,
      secureConnection: true,
      ignoreTLS: true, // add this 
      auth: {
        type: 'OAuth2',
        user: "testinghappy.18@gmail.com",
        clientId:CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        refreshToken:REFRESH_TOKEN,
        accessToken:accessToken
      }
   });

   const mailOptions = {
    from: 'Bill Fixers <testinghappy.18@gmail.com>', // Sender address
    to: email, // List of recipients
    subject: 'OTP to reset Password', // Subject line
    text: 'Hello from Bill Fixers!', // Plain text body
    html:'<h1>Hey !! </h1>'+ Otp + '<h1>  is  the otp to reset your password</h1>'
  };

 const result = await transport.sendMail(mailOptions);
 return result;
    
  }catch(err){
    console.log('ERROR ....'+err)
    return err;
  }
}




const emailSend = asyncWrapper(async (req, res) => {
  const data = await Register.findOne({email: req.body.email });
  const response = {};

  if(data){
    let otpCode = Math.floor(100000 + Math.random() * 900000);
    let otpData = new Otp({
        email : req.body.email,
        code : otpCode,
        expireIn : new Date().getTime()+300*1000
    });

    let otpResponse = await otpData.save();
    console.log(otpCode);
   const data = sendMail(req.body.email,otpCode);
   if(data){
    res.redirect("/otp/?email="+req.body.email)
    }else{
        res.send('Email Not Send Error');
    }

    
  }else{
    res.json({status:fail})
    res.status(401).json('Email not sent');

  }

})
const updatePassword = asyncWrapper(async (req, res) => {
        let user = await Register.findOne({email:req.body.email})
        user.password = await bcrypt.hash(req.body.password,12);
        user.save();
        req.flash('message','Password Updated successfully');
        res.redirect('/reset-password');
})

const changePassword = asyncWrapper(async (req, res) => {
  
  let data = await Otp.findOne({email:req.body.email,code:req.body.otpCode})
  let response = {};
  if(data){
      let currentTime = new Date().getTime();
      let diffTime = data.expireIn - currentTime;
      if(diffTime<0){
        res.send("Token Expired");
      }else{
        res.render("updatepassword",{email:req.body.email});
      }
  }
  else{
        res.send("Invalid Otp")
  }

})

const showDashboard = asyncWrapper(async (req, res) => {
      const provider = await Provider.find({});
      res.render("home",{records:provider});

})

const getMyFiles = asyncWrapper(async (req, res) => {

  const files = await MultipleFile.find({userid:req.param.id})
  console.log(files);
});

const Show_Uploaded_Bill = asyncWrapper(async (req, res) => {
  
  const files = await MultipleFile.find({userid:req.param.id})
  res.send(files);


})

const uploadQuestion = asyncWrapper(async (req, res) => {
  
  res.send(req.body);

})

const addFormDetails = asyncWrapper(async (req, res) => {
    req.body.userid=req.session.userId;
    const billFormData = await BillForm.create(req.body);
    console.log("Hello");
    if(billFormData){
      const files = await MultipleFile.find({userid:req.session.userId})
      req.flash('message','Bill Statement Uploaded Successfully');
      res.render('progress_bar',{records:files,message:req.flash('message')});
    }else{
      res.status(400).send(error.message);

    }
})




module.exports = {
  uploadQuestion,Show_Uploaded_Bill,getMyFiles,updatePassword,showDashboard,showIndex,createUser,getUser,fetchBills,emailSend,changePassword,addProvider,getProviders,updateFileStatus,updateSavedAmount,addFormDetails
  };
