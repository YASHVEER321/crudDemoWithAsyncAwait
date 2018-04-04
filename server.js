//console.log("-- server.js begins! -- ");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
//--------Mongo connections estabilished--------
// console.log("-- mongo.js begins! -- ");
// console.log("WELCOME TO DATABASE!");
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/user", (err) => {
    if (err) {
        console.log("Error connect to mongoose ", err)
    } else {
        console.log("mongoose connected to 27017 ")
    }
});

var router = require("./RouteFile/route");

// console.log("-- server.js code begins! -- ");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    "extended": false
}));

router.get("/", function (req, res) {
    console.log("WELCOME!");
    res.json({
        "error": false,
        "message": "Welcome!"
    });
});

app.use('/api', router);

// console.log("-- server.js ends! -- ");
const cluster = require('cluster')
cpu = 4
if (cluster.isMaster) {
    for (let i = 1; i <= cpu; i++) {
        cluster.fork()
    }
} else {
    app.listen(3000);
    // console.log("Listening to PORT 3000");
}

let usermongo = require("./models/user")

// for (let i = 0; i <= 100000; i++) {
//     console.log("check ",i)
//     savedata(i)
// }
let arr=[]
if(arr.length){
    console.log("check len",arr)
}
else{
    console.log("check ",arr)

}


async function savedata(i) {
    console.log("savedata ",i)
    let doc = {
        "name": "yash" + i,
        "email": "dfi@gmail.com" + i,
        "username": "aaddu2" + i,
        "mobile": "956665021",
        "password": "111111",
        "sclmrk": "dehli",
        "sccity": "dehli",
        "scstate": "sdfsd",
        "scadd": "lskjj"
    }
    let checkuserEmail = await usermongo.findOne({
        email: req.body.email
    })
    console.log("check user value ", checkuserEmail != null);
    if (checkuserEmail == null) {
        temp = "Error in checkUserName Query";
        let checkUserName = await usermongo.findOne({
            username: req.body.username
        })
        if (checkUserName == null) {
            temp = "Error in saveuser Query";
            let saveuser = await user.create(doc)
            console.log("save data ")
            // response = {
            //     "error": false,
            //     "message": "Registration successful!",
            //     "data": saveuser
            // };
            // res.status(200).json(response);
        }
        else {
            // response = {
            //     "error": true,
            //     "message": "Name has been taken"
            // };
            // res.status(401).json(response);
        }
    }
    else {
        // response = {
        //     "error": true,
        //     "message": "Email has been taken"
        // };
        // res.status(401).json(response);
    }
}