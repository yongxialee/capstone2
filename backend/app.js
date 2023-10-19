const express = require('express');
const cors = require("cors");
const bouquetsRoutes = require("./routes/bouquets");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payments")
const { NotFoundError } = require("./expressError");

//create an instance of app object
//run the dependency 
const app =express();


//parse request body for json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/",function(req,res){
    res.send('Get request to homepage')
})

app.use('/users',userRoutes);
app.use("/auth",authRoutes);
app.use('/product',bouquetsRoutes);
app.use('/payments',paymentRoutes);

/** 404 handler */
app.use(function(req,res,next){
    const err = new NotFoundError("Not Found", 404);
    return next(err);
})

/**general error handler */
app.use(function(req,res,next){
    //the default status is 500 Internal server error
    let status = err.status || 500;

    //set the status and alert the user
    return res.status(status).json({
        err:{
            message:err.message,
            status:status
        }

    });
});




module.exports = app;