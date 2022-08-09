const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute =require("./routes/user");


dotenv.config();

// connect database
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB connection successfull!"))
    .catch((err) => {
        console.log(err);
    });

    app.use(express.json());

    // use endpoint
    app.use("/api/users",userRoute);




app.listen(process.env.PORT || 5000, () => {
console.log("Backend server is running!");

});