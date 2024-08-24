require("dotenv").config()
const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const { connectToDB } = require("./database/db")

const server=express()

server.use(express.json())
server.use(cookieParser())

connectToDB()


const authRoutes = require('./routes/authRoutes')

server.use('/auth',authRoutes)

server.get("/",(req,res)=>{
    res.status(200).json({message:'running'})
})


const PORT = process.env.PORT || 8000 
server.listen(PORT,()=>{
    console.log(`server [STARTED] ~ http://localhost:${PORT}`);
})