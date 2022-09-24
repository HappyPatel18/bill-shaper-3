const express = require("express");
const upload = require('../middleware/upload')
const router = express.Router();
const {singleFileUpload } = require('../controllers/fileuploaderController')
const {multipleFileUpload} = require('../controllers/fileuploaderController')
const {getallMultipleFiles} = require('../controllers/fileuploaderController')

const passport = require('passport');
const {

  createUser,
  getUser,
  emailSend,
  changePassword,
  addProvider,getProviders,updateFileStatus,showIndex,updateSavedAmount,showDashboard,
  updatePassword,getMyFiles,Show_Uploaded_Bill,uploadQuestion,addFormDetails
  
} = require("../controllers/register");

router.route("/showIndex").get(showIndex);

router.route("/register").post(createUser);

router.route("/login").post(getUser);

router.post("/fileUpload",upload.single('file'),singleFileUpload);

router.post('/multipleFileUpload', upload.array('files'), multipleFileUpload);

router.get("/getMultipleFiles", getallMultipleFiles);

router.post("/addFormDetails", addFormDetails);

router.get("/uploadQuestion").post(uploadQuestion);

router.route("/email-send").post(emailSend);

router.route("/change-password").post(changePassword);

router.route("/update-password").post(updatePassword);

router.route("/Show-Uploaded-Bill").get(Show_Uploaded_Bill);


router.route("/add-provider").post(addProvider)

router.route("/upload").get(getProviders)

router.route("/updateFileStatus").post(updateFileStatus)

router.route("/showDashboard").get(showDashboard)

router.route("/getUserDetails/:id").get(getMyFiles)

router.route("/updateSavedAmount").post(updateSavedAmount)

module.exports = router;
