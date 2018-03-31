// console.log("-- route.js begins! -- ");
var express = require("express");
var app = express();
var router = express.Router();
var crudop = require("../Controller/userController");

console.log("-- route.js code begins! -- ");

router.get('/user',crudop.getUser,function(req,res){
    console.log("Fetching users...");
});

router.post('/user',crudop.addUser,function(req,res){
    console.log("Adding user data...");
});

router.get('/user/:id',crudop.getUserbyId,function(req,res){
    console.log("Fetching user by id...");
});

router.put('/user/:id',crudop.updateUserbyId,function(req,res){
    console.log("Updating user by id...");
});

router.delete('/user/:id',crudop.deleteUserbyId,function(req,res){
    console.log("Deleting user by id");
});

// router.get('/email/:email',crudop.getUserbyEmail,function(req,res){
//     console.log("Fetching user by email...");    
// });

// router.get('/email/:email',crudop.updateUserbyEmail,function(req,res){
//     console.log("Updating user by email...");
// });

module.exports = router