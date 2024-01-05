import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    joinedOn:{type:Date,default: Date.now}
})

const User = mongoose.model('User',authSchema)

export default User;