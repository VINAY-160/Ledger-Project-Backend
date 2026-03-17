const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { use } = require('../app');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email required for creating User!"],
        trim: true,
        lowercase: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill a valid email address'
        ],
        unique: [true, "email already exists"]
    },

    name: {
        type: String,
        required: [true, "name is required!! "]
    },

    password: {
        type: String,
        required: [true, "password is required!!"],
        minlength: [6, "password should be greater than 6 character"],
        select: false
    }
},{
    timestamp:true
})

userSchema.pre("save", async function() {

    if (!this.isModified("password")) {
        return ;
    }

    this.password = await bcrypt.hash(this.password,10)

    
})

userSchema.methods.comparePassword=async function(password) {
    return await bcrypt.compare(password,this.password)
}

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;