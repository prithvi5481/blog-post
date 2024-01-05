import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/user.js'
import postRoutes from './routes/posts.js'

const app = express();

dotenv.config();
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));


app.get('/',(req,res)=>{
    res.send('This is a blog post web application');
})

app.use('/user',userRoutes);
app.use('/newpost',postRoutes);


const port = 5000;

const DATABASE_URL = "mongodb+srv://prithvisingh91827:prithvi91827@cluster0.vlwdrni.mongodb.net/"


mongoose.connect(DATABASE_URL)
.then((data) => {
    console.log('express is connected to database');
})
.catch((err) => {
    console.log('unable to connect to database');
})

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})