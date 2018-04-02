// console.log("-- crudOp.js begins! -- ");
const express = require("express"),
    usermongo = require("../models/user")

let CrudOp = {};

CrudOp.getUser = async (req, res) => {
    console.log("USER GET");
    try {
        var response = {};
        let value = await usermongo.find({ })
        if (value.length > 0) {
            res.status(200).json({
                value: value
            });
        }
        else {
            res.status(401).json({
                value: value
            });
        }
    }
    catch (err) {
        res.status(500).json({
            value: value
        });
    }


}

CrudOp.addUser = async (req, res) => {
    let temp = "Error in checkuserEmail Query";
    try {
        var user = new usermongo();
        var response = {};
        user.name = req.body.name;
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = require('crypto').createHash('sha1').update(req.body.password).digest('base64');
        user.mobile = req.body.mobile;
        user.pradd.addln1 = req.body.addln1;
        user.pradd.addln2 = req.body.addln2;
        user.pradd.lmrk = req.body.lmrk;
        user.pradd.city = req.body.city;
        user.pradd.state = req.body.state;
        user.pradd.pin = req.body.pin;
        user.scadd.scaddln1 = req.body.scaddln1;
        user.scadd.scaddln2 = req.body.scaddln2;
        user.scadd.sclmrk = req.body.sclmrk;
        user.scadd.sccity = req.body.sccity;
        user.scadd.scstate = req.body.scstate;
        user.scadd.scpin = req.body.scpin;
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
                let saveuser = await user.save()
                response = {
                    "error": false,
                    "message": "Registration successful!",
                    "data": saveuser
                };
                res.status(200).json(response);
            }
            else {
                response = {
                    "error": true,
                    "message": "Name has been taken"
                };
                res.status(401).json(response);
            }
        }
        else {
            response = {
                "error": true,
                "message": "Email has been taken"
            };
            res.status(401).json(response);
        }
    }
    catch (err) {
        response = {
            "error": true,
            "message": err
        };
        res.status(500).json({
            Message: "In catch part " + err,
            ErrorPart: temp
        })
    }
}

CrudOp.getUserbyId = async (req, res) => {
    console.log("FIND USER GET BY ID");
    try {
        let findUserById = await usermongo.findById(req.params.id)
        if (findUserById != null) {
            res.status(200).json({
                Message: "Fetching user data",
                userData: findUserById
            })
        }
        else {
            res.status(401).json({
                Message: "user not authorized",
                userData: findUserById
            })
        }
    }
    catch (err) {
        res.status(500).json({
            Message: "server Error " + err,
        })
    }

}

CrudOp.updateUserbyId = async (req, res) => {
    console.log("FIND USER PUT BY ID", req.body);
    try {
        let updateUserDatabyId = await usermongo.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {
                new: true
            })
        res.status(200).json({
            Message: "update user data",
            userData: updateUserDatabyId
        })
    }
    catch (err) {
        res.status(500).json({
            data: err,
            message: "Server Error " + err
        });
    }
}

CrudOp.deleteUserbyId = async (req, res) => {
    console.log("FIND USER DELETE BY ID");
    try {
        let removeUserById = await usermongo.remove({
            _id: req.params.id
        })
        res.status(200).json({
            Message: "Data associated with id " + req.params.id + " is deleted",
            result: removeUserById
        })
    }
    catch (err) {
        res.status(500).json({
            // Message: "Data associated with id " + req.params.id + " is deleted",
            Error: err
        })
    }
}


module.exports = CrudOp