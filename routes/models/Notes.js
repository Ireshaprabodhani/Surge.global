const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
    // create properties
    {
        title         : {type:String,required:true,unique : true},
        description   : {type:String, required:true},
       

    },
    {timestamps: true}
);
//export module
module.exports = mongoose.model("Notes",NotesSchema);
