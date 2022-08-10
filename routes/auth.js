const router = require("express").Router();
const User = require("./models/User");

//to prevent unotharized access
const CryptoJS = require("crypto-js");

//to use to do more secure in application
const jwt = require("jsonwebtoken");



//Register

router.post("/register", async (req, res) => {
    const newUser = new User({
        //id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        mobile: req.body.mobile,
        status: req.body.status,

        //to prevent unotharized access
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
            .toString(),
        accountType: req.body.accountType,
    });
    // using try catch block to catch problem in our server or db
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err);
    }
});

//Login

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        //if user is not in system
        !user && res.status(401).json("wrong credentials!");

        const hashedPassword = CryptoJS.AES.decrypt(user.password,
            process.env.PASS_SEC
        );
        // use jwt 
        const accessToken = jwt.sign({
            id:user._id,
            accountType: user.accountType,
        },
        process.env.JWT_SEC,
        {
            expiresIn: "10d"
        }
        );
        const pssword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (pssword !== req.body.password) {
            res.status(401).json("wrong credentials!");
        } else {
            const { password, ...others } = user._doc;
            res.status(200).json({...others, accessToken});

        }

       
    } catch (err) {
        res.status(500).json(err)
    }
});




module.exports = router;