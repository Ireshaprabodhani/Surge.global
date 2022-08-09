const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
    // create properties
    {
        id          : {type:Number,required:true, unique:true},
        firstName   : {type:String, required:true},
        lastName    : {type:String},
        email       : {type:String, required:true},
        dateOfBirth : {type:Date, required:true},
        mobile      : {type:Number, required:true},
        status      : {type:Boolean,  default: false,},
        password    : {type:String, required:true},
        accountType : {type:String, required:true},

    },
    {timestamps: true}
);

module.exports = mongoose.model("Admin",AdminSchema);
