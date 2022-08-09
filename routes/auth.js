const router = require("express").Router();
const User = require("./models/User");
const CryptoJS = require("crypto-js");


//Register

router.post("/register" , async (req,res) =>{
    const newUser = new User({
        id: req.body.id,
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

router.post("/login", async(req,res) =>{
    try{
       const user = await User.findOne({email: req.body.email});
       !user && res.status(401).json("wrong credentials!")


       const hashedPassword = CryptoJS.AES.decrypt(

        user.password,
        process.env.PASS_SEC
       );
       const pword = hashedPassword.toString(CryptoJS.enc.Utf8);

       password !== req.body.password &&
          res.status(401).json("wrong credentials!");

          res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }

});

module.exports = router;