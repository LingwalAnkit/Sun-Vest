const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://ankitlingwal9:L6pPo0P0Ugrf3IGE@cluster0.819jo.mongodb.net/SunVest?retryWrites=true&w=majority&appName=Cluster0')
.then (()=>{
    console.log("Database connected")
})
.catch((err)=>{
    console.log("Failed to connect to Database:" , err);
})

module.exports = mongoose.connection