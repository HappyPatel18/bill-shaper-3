require('dotenv').config();
require('express-async-errors');
require('./controllers/auth');
const Register = require("./model/register")
const MultipleFile = require('./model/multiplefile');
const passport = require('passport');
const port = process.env.PORT || 8080;
const Provider = require("./model/provider");

const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('./db/connect')
const tasks =require('./routes/tasks');
const admin =require('./routes/admin');
const hbs= require('hbs');
const cors = require('cors');
const oneDay = 1000 * 60 * 60 *24;
const session = require('express-session');
const cookieParser = require("cookie-parser");


const flash = require('connect-flash');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const upload  =  require('./middleware/upload');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/file-upload-routes')

const publicDirectoryPath = path.join(__dirname, "./public/");

const viewPath = path.join(__dirname, "./templates/views")  //To customize path of view in hbs
const partialsPath=path.join(__dirname, "./templates/partials")

function isLoggedIn(req,res,next){
  req.user ? next():res.render("login");
}

app.use(cors())
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', fileRoutes.routes);


app.set("view engine", "hbs"); // This is only needed to setup handlebars
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(session({
  secret:'keythatwillsignedthecookie',
  saveUninitialized: true,
  resave: false,  // RESAVE Means for every request to the server we need new cookie
  cookie: { maxAge: oneDay },
}));
app.use(passport.initialize());
app.use(passport.authenticate('session'));

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/users',tasks);
app.use('/admin',admin);

app.post("/uploadQuestion",async(req, res) => {

    var data = req.body;
    // res.json(data);
    req.session.Question_Data = data;
    res.redirect('/register');
})


app.get("/",async(req, res) => {
  const provider = await Provider.find({});
  res.render("index",{records:provider});
});

app.get("/getFAQ",async(req, res) => {
  const provider = await Provider.find({});
  res.render("faq",{records:provider});
});

app.get("/show-change-password",async(req, res) => {
  res.render("updatepassword");
});

app.get("/register", (req, res) => {
  res.render("register",{message:req.flash('message'),data:req.flash('DATA')});
  
});

app.get("/admin/dashboard",(req,res)=>{
  res.render("admin/dashboard")
})
app.get('/progress_bar',(req,res)=>{
  res.render("progress_bar")

})

app.post('/submitFAQ',(req,res)=>{

  // res.send(req.body);

  var QUE1 = "How can I get discount or a waiver on my current monthly bill ?";
  var QUE2= "How to avoid an Early Termination Fee (ETF) while canceling a service with agreement?";
  var QUE3= "How can I get a discount or waiver on final bill while placing a cancellation request ?";
  var QUE4= "How to avoid charges for unreturned equipment/lost equipment/damaged equipment ?";
  var QUE5= "I am struggling to pay my current monthly bill, how can i get discount to reduce it?";
  var QUE6= "How can I get a new customer promotion with my existing services ?";
  var QUE7= "I will write my question";

  var PRO = "Comcast Xfinity"
  var others= "Others"
  var que = req.body.question;
  var provider = req.body.serviceProvider;

  if(provider == others){
    
    req.flash('message_alert','"Unfortunately, free assistance service is available only for companies who are listed in dropdown. Please select any other service provider or try again later, as we are trying to get assistance service for more companies".')
    res.render("faqresponse",{message_alert:req.flash('message_alert'),question:que});
  }
  else{

    if(provider != PRO){
      if(que == QUE1){
     
        req.flash('message','Congratulations!! We can battle your service provider and get you savings upto 100% on your current monthl bill.Guaranteed savings else, our service is free(we charge only 30% of total saving which we get for you).')
        res.render("faqresponse",{message:req.flash('message'),question:que,provider:provider});
    
      }
      if(que == QUE2){
        req.flash('message1','hii')
        res.render("faqresponse",{message1:req.flash('message1'),question:que,provider:provider});
      }
      if(que == QUE3){
        req.flash('message1','hii')
        res.render("faqresponse",{message1:req.flash('message1'),question:que,provider:provider});
      }
      if(que == QUE4){
        req.flash('message1','hii')
        res.render("faqresponse",{message1:req.flash('message1'),question:que,provider:provider});
      }
      if(que == QUE5){
        req.flash('message','Congratulations!! We can battle your service provider and get you savings upto 100% on your current monthl bill.Guaranteed savings else, our service is free(we charge only 30% of total saving which we get for you).')
        res.render("faqresponse",{message:req.flash('message'),question:que,provider:provider});
      }
      if(que == QUE6){
        req.flash('message1','hii')
        res.render("faqresponse",{message1:req.flash('message1'),question:que,provider:provider});
      }
      if(que == QUE7){
        req.flash('message2','hii')
        res.render("faqresponse",{message2:req.flash('message2'),question:que,provider:provider});
      }
    }
  
    if(provider == PRO){

      if(que == QUE1){
     
        req.flash('message','Congratulations!! We can battle your service provider and get you savings upto 100% on your current monthl bill.Guaranteed savings else, our service is free(we charge only 30% of total saving which we get for you).')
        res.render("faqresponse",{message:req.flash('message'),question:que,provider:provider});
    
      }
      if(que == QUE2){
        req.flash('message3','Congratulations!! We can get your service cancellation done with no ETF(early termination fee) charges. We charge only 30% of your total savings. Please fill the form to proceed or click here to know more.')
        res.render("faqresponse",{message3:req.flash('message3'),question:que,provider:provider});
      }
      if(que == QUE3){
        req.flash('message4','Congratulations!! We can get you discount or waiver on your final bill, as well as place a cancellation request at no extra fee.We charge only 30% of your total savings. Please fill the form to proceed or click here to know more.')
        res.render("faqresponse",{message4:req.flash('message4'),question:que,provider:provider});
      }
      if(que == QUE4){
        req.flash('message5',"Congratulations!! We can help you to waive off 'Unreturned/ Inactive Equipment charges. We charge only 30% of your total savings. Please fill the form to proceed or click here to know more.")
        res.render("faqresponse",{message5:req.flash('message5'),question:que,provider:provider});
      }
      if(que == QUE5){
        req.flash('message','Congratulations!! We can battle your service provider and get you savings upto 100% on your current monthl bill.Guaranteed savings else, our service is free(we charge only 30% of total saving which we get for you).')
        res.render("faqresponse",{message:req.flash('message'),question:que,provider:provider});
      }
      if(que == QUE6){
        req.flash('message1','hii')
        res.render("faqresponse",{message1:req.flash('message1'),question:que,provider:provider});
      }
      if(que == QUE7){
        req.flash('message2','hii')
        res.render("faqresponse",{message2:req.flash('message2'),question:que,provider:provider});
      }
  
    }

  }



  

})


app.get("/admin/users",(req,res)=>{
  res.render("admin/users")
})

app.get("/admin/login", (req, res) => {
  res.render("admin/login",{message:req.flash('message')});
});

app.get("/admin/logout",(req, res) => {
  req.session.destroy((err) => {
    res.redirect('/admin/login') // will always fire after session is destroyed
  })
});

app.get("/login", (req, res) => {
  res.render("login",{message:req.flash('message')});
});

app.get("/reset-password", (req, res) => {
  res.render("reset-password",{message:req.flash('message')});
});



app.get("/home", async(req, res) => {
  const provider = await Provider.find({});
  res.render("home",{message:req.flash('message'),records:provider});
});

app.get("/upload", (req, res) => {
  res.render("upload");
});

app.get("/uploadedBills", (req, res) => {
  res.render("upload");
});

app.get("/otp", (req, res) => {
  res.render("otp",{email: req.query.email});
  
});

app.get("/logout",(req, res) => {
  req.session.destroy((err) => {
    res.redirect('/') // will always fire after session is destroyed
  })
});

app.get("/google",(req,res)=>{
  res.send('<a href="/auth/google">Authenticate with Google</a>')
})

app.get("/auth/google",passport.authenticate('google',{scope:['email','profile']}));


app.get("/protected",(req,res)=>{
  res.send("Hello")
})


app.get('/google/callback', function(req, res, next) {
  passport.authenticate('google', async function(err, user, info) {
    if (err) { 
      return next(err) 
    }else{
      console.log(info);
      req.session.userId = info.userid;
      req.session.email = info.email;
      req.session.firstname = info.firstname;
      req.session.lastname = info.lastname;
      const provider = await Provider.find({});
      res.render("home",{records:provider});
    }
   
    

    
  })(req, res, next);
});


app.get("/auth/failure",(req,res)=>{
  res.send("FAILED")
  // res.redirect("/login")
})



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async () => {
  try {
    await connectDB("mongodb+srv://happy:root123@nodeexpressprojects.mnvt8.mongodb.net/Bill-Management?retryWrites=true&w=majority")
    app.listen(port, function(){
      console.log(`Express server listening on port ${port} `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
