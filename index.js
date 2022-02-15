const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const cookieParser = require('cookie-parser');
const cors = require("cors");


dotenv.config();

//setup server
const app = express();

const PORT = process.env.PORT || 5000; 
app.listen(PORT, ()=>{console.log(`server started on port ${PORT}`)});

app.use(express.json());
// app.use(cookieParser());
// app.use(cors({origin : ["http://localhost:3000"], credentials : true}));


//connect to mongoDB
mongoose.connect(process.env.MDB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
} , (err)=>{
    if(err) return console.error(err);
});

app.get("/test", (req, res)=>{
    res.send("it is working wo wohooooo!");
}) 

// setup routes
app.use("/user", require("./api/routers/userRouter"));
app.use("/blog", require("./api/routers/blogRouter"));
app.use("/admin", require("./api/routers/adminRouter"));
app.use("/newsletter",require("./api/routers/subscribeRouter"));
