const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth_middle");
const {registerUser,LoginUser,LogoutUser,getMeController}=require("../controllers/auth_controller")

router.post("/register",registerUser);
router.post("/login",LoginUser);
router.post("/logout",LogoutUser);
router.get("/me",authMiddleware,getMeController);

module.exports=router;