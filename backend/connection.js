const mongoose = require('mongoose');
const connection = mongoose.connect("mongodb://localhost/patient").then(()=>console.log("database connected."));
module.exports =connection;