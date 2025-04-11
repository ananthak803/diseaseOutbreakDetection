const express = require('express');
const app =express();
const port=5000;

//connect database
const connectDB = require('./connection');
const patient = require('./patientModel');

//set ejs for ssr
const path = require('path');
app.set('views', path.join(__dirname, 'views')); 
app.set("view engine",'ejs');

//to parse form data
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//render form page 
app.get("/form",(req,res)=>{
    res.render('form');
})

//on form submit create new entry in database
app.post("/",async(req,res)=>{
    const {name,phone,age,gender,date,location,symptoms,diagnosis}=req.body;

    await patient.create({
        name,
        phone,
        age,
        gender,
        date,
        location,
        symptoms,
        diagnosis,
    });
    res.send("done");
    
})

//start server
app.listen(port,()=>console.log(`server running at port : ${port}`));
