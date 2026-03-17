const express=require("express")
const accountController=require("../controllers/account.controller")
const authmiddleware=require("../middleware/auth.middleware")





const router=express.Router();

/**
 * - POST /api/accounts/
 * -create a new account
 * -protected route
 */

router.post("/",authmiddleware.authMiddleware,accountController.createAccountController)



module.exports=router; 