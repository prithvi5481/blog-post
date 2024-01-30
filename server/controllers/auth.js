import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import User from '../model/auth.js';

export const signup = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(404).json({message:"user already exists"});
        }

        const hashPassword = await bcrypt.hash(password,12);
        const newUser = await User.create({name,email,password:hashPassword});
        //console.log(newUser);
        const token = jwt.sign({email:newUser.email,id:newUser._id},'test',{expiresIn:'24hr'});
        res.status(200).json({result: newUser,token})
    } catch (error) {
        //console.log(error);
        res.status(500).json('something went wrong with signup api');
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({message:'user does not exist'});
        }
        const isPassword = await bcrypt.compare(password,existingUser.password);
        if(!isPassword){
            return res.status(400).json({message:'invalid credentials'});
        }
        const token = jwt.sign({email:existingUser.email, id:existingUser._id},'test',{expiresIn:'24hr'});
        res.status(200).json({result:existingUser,token});
    } catch (error) {
        res.status(500).json('something went wrong...');
    }
}

export const getUserId = async (req,res) => {
    try {
        const userId = req.userId;
        return res.status(200).json({userId});
    } catch (error) {
        console.log('error while fetching userId on client side');
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const userInfo = async (req,res) => {
    try {
        const userId = req.params.id;
        //console.log('mein hu userId',userId);
        const user = await User.findById({_id:userId});
        if(!user){
            res.status(400).json({message:"User doesn't exist"});
        }
        return res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
}