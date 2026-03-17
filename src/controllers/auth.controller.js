const userModel = require('../models/user.model');
const JWT = require("jsonwebtoken")
const emailService =require("../services/email.service")
async function userRegisterController(req, res) {

    const { email, password, name } = req.body

    const isExists = await userModel.findOne({ email })

    if (isExists) {
        return res.status(422).json({
            message: "User Already Exists with Email.",
            status: "Failed"
        })
    }

    const user = await userModel.create({ email, password, name })

    const token = JWT.sign(
        { userID: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

    await sendRegistrationEmail(user.email, user.name);
}

async function userLoginController(req, res) {

    const { email, password } = req.body

    const user = await userModel
        .findOne({ email })
        .select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Email or Password INVALID!"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or Password INVALID!"
        })
    }

    const token = JWT.sign(
        { userID: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )

    res.cookie("token", token)

    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

    console.log(user)
    console.log(password)
}

module.exports = {
    userRegisterController,
    userLoginController
}