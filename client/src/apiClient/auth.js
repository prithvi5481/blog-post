import axios from 'axios'
import * as CONSTANT from './api.constant.js';

const profile = JSON.parse(localStorage.getItem("Profile"));

let config;

if(profile !== null){
    config = {
        headers: {
            Authorization: `Bearer ${profile.token}`,
        }
    }
}
  


export const signup = async (payload) => {
    try {
        const url = `${CONSTANT.API_URL}/user/signup`;
        //console.log(url);
        const response = await axios.post(url,payload,config);
        //console.log('api response',response);
        return response;
    } catch (error) {
        console.log('error in signUp api',error);
        throw error;
    }     
}

export const logIn = async (payload) => {
    try {
        const url = `${CONSTANT.API_URL}/user/login`;
        const response = await axios.post(url,payload,config);
        return response;
    } catch (error) {
        throw error;
    }   
}

export const userInfo = async (payload) => {
    try {
        const userId = payload;
        const url = `${CONSTANT.API_URL}/user/userInfo/${userId}`;
        const res = await axios.get(url,config);
        console.log('user Info api response',res);
        return res;
    } catch (error) {
        console.log('error while fetching user info');
        throw error;
    }
}



