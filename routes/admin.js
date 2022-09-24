const express = require("express");
const router = express.Router();

const { getAdmin,addAdmin,getAllUsers,getUserDetails,showUserDetails,goToDashboard,getUserQuestions
    } = require("../controllers/admin");

router.route("/login").post(getAdmin);

router.route("/register").post(addAdmin);

router.route("/getUsers").get(getAllUsers);

router.route("/getUserDetails/:id").get(getUserDetails)

router.route("/getUserQuestions/:id/:file_id").get(getUserQuestions)


router.route("/showUserDetails/:id/:file_id").get(showUserDetails)

router.route("/goToDashboard").get(goToDashboard)


module.exports = router;
