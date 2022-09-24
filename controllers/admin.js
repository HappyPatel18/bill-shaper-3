const Admin = require("../model/admin");
const Register = require("../model/register")
const MultipleFile = require('../model/multiplefile');
const Questions = require('../model/questions');

const asyncWrapper = require('../middleware/asyncWrapper');
const bcrypt = require('bcryptjs')

const addAdmin = asyncWrapper(async (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  const tasks = await Admin.findOne({email: email });

  if(!tasks){
    req.body.password = await bcrypt.hash(req.body.password,12);
    const registerAdmin = await Admin.create(req.body);
    session=req.session;
    session.userId = registerAdmin['_id'];
    res.send("Admin Created")
  }
  else{
    res.redirect('/admin/register');
  }

});

const getAdmin = asyncWrapper(async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    console.log(password)
    const tasks =await Admin.findOne({ email })
    .then(user => {
        if (!user) {
              req.flash('message','Admin does not Exist')
              res.redirect('/admin/login');
        }
  
        bcrypt.compare(password, user.password, async(err, data) => {
            //if error than throw error
            if (err){
              req.flash('message','Admin does not Exist')
              res.redirect('/admin/login');

            }
  
            //if both match than you can do anything
            if (data) {
              
              session=req.session;
              session.userId = user._id;
              const users =await Register.find({});
              const files = await MultipleFile.find()
              const savedAmount =  await MultipleFile.find().select('filesavedamount');
              const total_users = Object.keys(users).length;
              const total_files = Object.keys(files).length;
              console.log(savedAmount);
              let amount_saved = 0;
                for (let i = 0; i < savedAmount.length; i++) {

                  amount_saved += parseInt(savedAmount[i]['filesavedamount']);
                }
              // amountSaved:amount_saved
              res.render("admin/dashboard",{ records:files,totalUsers:total_users,totalFiles:total_files,amountSaved:amount_saved})
            } 
            else {
              req.flash('message','Invalid Credentials')
              res.redirect('/admin/login');
                // return res.status(401).json({ msg: "Invalid credencial" })
            }
  
        })
  
    })
  
});

const getAllUsers = asyncWrapper(async (req, res) => {
  const users =await Register.find({});
//const users_email = users.map(a => a.email);

const files = await MultipleFile.distinct('files')
const total_users = Object.keys(users).length;
const total_files = Object.keys(files).length;

const savedAmount =  await MultipleFile.distinct('filesavedamount');
     let amount_saved = 0;
    for (let i = 0; i < savedAmount.length; i++) {

      amount_saved += parseInt(savedAmount[i]);
    }
    res.render("admin/dashboard",{ records:files,totalUsers:total_users,totalFiles:total_files,amountSaved:amount_saved})

})

const getUserDetails = asyncWrapper(async (req, res) => {
  try{
    // const user = await Register.find({email:req.params.email})
    const files = await MultipleFile.distinct('files',{userid:req.params.id})
    
    res.render('admin/usersbill',{records:files})


}catch(error) {
    res.status(400).send(error.message);
}


})

const showUserDetails = asyncWrapper(async (req, res) => {
  var QUE1= "How to avoid an Early Termination Fee (ETF) while canceling a service with agreement?";
  var QUE2= "How can I get a discount or waiver on final bill while placing a cancellation request ?";
  var QUE3= "How to avoid charges for unreturned equipment/lost equipment/ damaged equipment ?";
  
      console.log(req.params.id);
      const user = await Register.find({_id:req.params.id})
      console.log(user);
        if(user){
          const que = await Questions.find({userid:req.params.id})
          console.log(que);
          if(que[0]['user_provider'] == 'Comcast Xfinity' ){

            if(que[0]['user_question'] == QUE1 || que[0]['user_question'] == QUE2 ){
              req.flash('Q1','Dummy Code')
            }
  
            if(que[0]['user_question'] == QUE3){
              req.flash('Q2','Dummy Code 2')
            }

          }
          

          const files = await MultipleFile.find({_id:req.params.file_id})
          res.render("admin/users",{questions:que,user:user,files:files,Message1:req.flash('Q1'),Message2:req.flash('Q2')})
        }
        else{
          res.send("No User Found")
        }
})


const goToDashboard = asyncWrapper(async (req, res) => {
  const users =await Register.find({});
  const files = await MultipleFile.find()
  const total_users = Object.keys(users).length;
  const total_files = Object.keys(files).length;
    // let amount_saved = 0;
    // for (let i = 0; i < savedAmount.length; i++) {

    //   amount_saved += parseInt(savedAmount[i]);
    // }

  const savedAmount =  await MultipleFile.find().select('filesavedamount');
  amount_saved = 0;
          for (let i = 0; i < savedAmount.length; i++) {
              amount_saved += parseInt(savedAmount[i]['filesavedamount']);
          }
          console.log(amount_saved);
    amount_send = await amount_saved;

  // amountSaved:amount_saved
  res.render("admin/dashboard",{ records:files,totalUsers:total_users,totalFiles:total_files,amountSaved:amount_send})
})


const getUserQuestions = asyncWrapper(async (req, res) => {

  

})





module.exports = {
    getAdmin,addAdmin,getAllUsers,getUserDetails,showUserDetails,goToDashboard,getUserQuestions
};
