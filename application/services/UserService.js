
// var UserController = require('../controllers/UserController').UserController;
// console.log("In service UserController is:",UserController);
var bcrypt = require('bcrypt');
var passwordHash = require('password-hash'); 
module.exports.UserService = (function () {

    var registerAction = function (userobject,res) {

        console.log("In service register action");
        var newUserDetails = new User(userobject);
        User.find({email : userobject.email},function(err,user){

                if(user.length >0){
                    console.log("In user exist and user is :-",user);
                    response = {
                          userexist : true,
                          newUserCreated : false,
                          user : user,
                        }
                    res.send(response);
                }
                else{
                    console.log("Creating a new User");
                    
                    var hashedPassword = passwordHash.generate(newUserDetails.password);
                    // var saltRounds = 5; 
                    // var salt = bcrypt.genSaltSync(saltRounds);
                    // var hashedPassword = bcrypt.hashSync(newUserDetails.password, salt);  
                     newUserDetails.password = hashedPassword;
                     newUserDetails.save(function (err) {
                        if (err) {
                            console.error('ERROR!');
                            throw err;
                        }
                    });
                    response = {
                          userexist : false,
                          newUserCreated : true,
                          user : newUserDetails,
                        }
                   res.send(response); 
                }
       }); 
    }

    var loginAction = function(loginDetails,res){

         console.log("In service loginAction");
         User.find({ email : loginDetails.email },function(err, user){

                    if(err) throw err;
                    
                    if(user.length > 0){

                        res.send("Login Successful")
                    }
                    else{

                      res.send("Login Failed");  
                    }

            //   UserAuthentication.save()          

         });

    }

    var getAllUsers = function(res){

        User.find( { },function(err,users){

               response = {
                    users : users,
               } 
               res.send(response);    
        });

    }

    var updateUser = function(userUpdateObject,res){
           console.log("In UserService update user function");        

           User.findOneAndUpdate( { email : userUpdateObject.email },userUpdateObject, function(err,user){

                    if(err) throw err; 
                    if(user){
                         response = {
                              message : "user Updated Sucessfully",
                              user : user,
                         }
                          res.send(response);
                    }
                    else{
                         response = {
                              message : "Error Occur in Updating User",
                              user : "",
                         }
                        res.send(response); 
                    } 
           });
    }

    return {
        registerAction: registerAction,
        loginAction : loginAction,   
        getAllUsers : getAllUsers,    
        updateUser : updateUser,
 }

})();
