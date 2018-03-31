var mongoose = require('mongoose');

var mongoSchema = mongoose.Schema;
var userSchema= {
    name: {
        type: String,
        required: true,
        unique:true
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      username : {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      mobile: {
        type: Number,
        required: true,
      },
      pradd : {
        addln1 : String,
        addln2: String,
        lmrk : String,
        city : String,
        state : String,
        pin : Number,
    },
    scadd : {
        scaddln1 : String,
        scaddln2: String,
        sclmrk : String,
        sccity : String,
        scstate : String,
        scpin : Number,
    }
};
module.exports =  mongoose.model('userRg', userSchema);