const User = require("./models/User");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAnAdmin} = require("./verifyToken");

const router = require("express").Router();


//get user input and after response it.(req,res)
/*router.get("/usertest", (req,res) => {

    res.send("user test is successfull");
});



router.post("/userposttest", (req,res) => {
    const username = req.body.username;
    //console.log(username);
    res.send("your username is:" + username);
})*/

//UPDATE
/*router.put("/:id" , verifyTokenAndAuthorization , async (req,res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
           req.body.password,
           process.env.PASS_SEC

        ).toString();
    }
    try
   { 
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body

    },
     {new:true}

     );
     res.status(200).json(updatedUser);
}catch(err){
   res.status(500).json(err);
}
}); */

// Get user
router.get("/find/:id", verifyTokenAnAdmin, async (req,res) =>{
    try{
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc;
        res.status(200).json(others);

    }catch(err){
        res.status(500).json(err)
    }
});

//Get All users

router.get("/", verifyTokenAnAdmin, async (req,res) =>{
    //get latest five users details
    const query = req.query.new
    try{
        const users = query ? await User.find().limit(5) : await User.find();
    //  const {password, ...others} = user._doc;
        res.status(200).json(users);

    }catch(err){
        res.status(500).json(err)
    }
});





module.exports = router;