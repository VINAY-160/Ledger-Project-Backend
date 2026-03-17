const accountModel=require('../models/account.model')


async function createAccountController(req,res){
    const user=req.user;
    const {currency}=req.body;

    if(!currency){
        return res.status(422).json({
            message:"Currency is required for creating an account"
        })
    }

    const account=await accountModel.create({
        user:user._id,
        currency
    })

    res.status(201).json({
        message:"Account Created Successfully",
        account
    })
}

module.exports={createAccountController}; 