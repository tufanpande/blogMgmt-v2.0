require("dotenv").config();
const express = require("express");
const mongoose= require("mongoose");
const morgan= require("morgan");

const indexRouter = require("./routes");

const PORT= Number(process.env.PORT);

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));



mongoose.connect(process.env.DB).then(()=>{
    console.log("Database is connected");
});

app.use("/", indexRouter);







app.use((err,req, res,next)=>{
    err= err ? err.toString() :"something went wrong...";
    res.status(500).json({msg: err});
});
app.listen(PORT,()=>{
    console.log(`Application is running  on ${PORT}`);
});


// 55:35