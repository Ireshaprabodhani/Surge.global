const router = require("express").Router();
const User = require("./models/User");
const CryptoJS = require("crypto-js");


//Register

router.post("/register" , async (req,res) =>{
    const newUser = new User({
        //id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        mobile: req.body.mobile,
        status: req.body.status,

        //to prevent unotharized access
        password : CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
        .toString(),
        accountType : req.body.accountType,
    });
     // using try catch block to catch problem in our server or db
    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    }catch(err){
       res.status(500).json(err);
    }
});

//Login


module.exports = router;