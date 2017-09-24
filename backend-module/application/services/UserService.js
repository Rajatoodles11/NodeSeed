
// var UserController = require('../controllers/UserController').UserController;
// console.log("In service UserController is:",UserController);

var bcrypt = require('bcrypt');
var passwordHash = require('password-hash');
var uuid = require('node-uuid');

module.exports.UserService = (function () {

    var registerAction = function (userobject, res) {
        console.log("In service register action");
        User.find({ email: userobject.email }, function (err, user) {

            if (user.length > 0) {
                console.log("In user exist and user is :-", user);
                response = {
                    userexist: true,
                    newUserCreated: false,
                    message: "User Already Exist",
                    user: user,
                }
                res.status(400).send(response);
            }
            else {
                console.log("Creating a new User");
                var hashedPassword = passwordHash.generate(userobject.password);
                // var saltRounds = 5; 
                // var salt = bcrypt.genSaltSync(saltRounds);
                // var hashedPassword = bcrypt.hashSync(newUserDetails.password, salt);  
                userobject.encryptpassword = hashedPassword;
                var newUserDetails = new User(userobject);
                newUserDetails.save(function (err) {
                    if (err) {
                        console.error('ERROR!');
                        throw err;
                    }
                });
                response = {
                    userexist: false,
                    newUserCreated: true,
                    user: newUserDetails,
                }
                res.status(200).send(response);
            }
        });
    }

    var loginAction = function (loginDetails, res) {

        User.find({ email: loginDetails.email, password: loginDetails.password }, function (err, user) {

            if (err) throw err;
            console.log("user is:", user);
            if (user.length > 0) {

                var uuid1 = uuid.v4();
                console.log("\n\nAuth token is:-", uuid1);
                authObj = {
                    authToken: uuid1,
                    email: user[0].email,
                    userId: user[0]._id,
                    message: "Login Sucessful",
                }

                var authTokenCreatedForLoginUser = new UserAuthentication(authObj);
                console.log("AuthTokenCreated for lOgin User",authTokenCreatedForLoginUser);
                authTokenCreatedForLoginUser.save(function (err) {
                    if (err) {
                        console.error('ERROR! in token save');
                        throw err;
                    }
                });
                authObj.authId = authTokenCreatedForLoginUser._id;
                console.log("User Id is:", user[0]._id);
                res.status(200).send(authObj);
            }
            else {
                authObj = {
                    authToken: "",
                    email: "",
                    user: "",
                    message: "Login Failed",
                }
                res.status(400).send(authObj);
            }

        });

    }

    var getAllUsers = function (res) {

        User.find({}, function (err, users) {
            response = {
                users: users,
                message: "Getting All Users",
            }
            res.status(200).send(response);
        });

    }

    var updateUser = function (userUpdateObject, res) {
        console.log("In UserService update user function");

        User.findOneAndUpdate({ email: userUpdateObject.email }, userUpdateObject, function (err, user) {

            if (err) throw err;
            if (user) {
                userUpdateObject._id = user._id;
                userUpdateObject.updated = user.updated;
                userUpdateObject.isActive = user.isActive;
                userUpdateObject._v = user._v;

                response = {
                    message: "user Updated Sucessfully",
                    user: userUpdateObject,
                }
                res.status(200).send(response);
            }
            else {
                response = {
                    message: "Error Occur in Updating User",
                    user: "",
                }
                res.status(400).send(response);
            }
        });
    }


    var checkUserIsActive = function (userObj, res) {

        console.log("In Userservice Check User Active");
        if (userObj.email || userObj._id) {

            User.find({ email: userObj.email }, function (err, user) {

                if (err) throw error;
                if (user) {
                    console.log("User is Present");
                    response = {
                        message: " Check User Active or Not",
                        userisActive: user[0].isActive,
                    }
                    res.status(200).send(response);

                } else {
                    console.log("User is Not Present");
                    response = {
                        message: "User is not Present with this Mail Id",
                        userisActive: "",
                    }
                    res.status(400).send(response);

                }

            });
        }

    }

    var disableUserActive = function (userObj, res) {

        console.log("In UserService disableUserActive function");
        User.update({ email: userObj.email }, { $set: { isActive: false } }, function (err, user) {

            if (err) throw err;
            if (user) {
                console.log("inif", user);
                response = {
                    message: "User",
                    user: user,
                }
                res.send(response);
            }
            else {
                console.log("Inelse");
                response = {
                    message: "Error Occured in it",
                    user: user,
                }
                res.status(400).send(response);

            }

        });
    }

    var deleteUser = function (userid, res) {
        console.log("In UserService Delete User function userid is:-",userid);
        User.findByIdAndRemove({ _id: userid }, function (err, docs) {

            if (err)  throw err;
            
            if(docs) {
                console.log("Docs is:-",docs);
                deletedUser = {
                    userDeleted : true,
                    docs : docs,  
                    message : "This User is deleted from database",
                 }
                res.status(200).send(deletedUser);
            }
            else{

               deletedUser = {
                    userDeleted : false,
                    docs : docs,  
                    message : "No User Present",
                 }
               res.status(400).send(deletedUser);   
            }

        });
 
    }


    var logoutAction = function(loginUser,res){

        console.log("In LogoutAction in UserService");
        UserAuthentication.findByIdAndRemove({ _id : loginUser.authId },function(err,auth){

               if(err) throw err;
               if(auth){
                   console.log("Auth is:-",auth);
                   res.status(200).send("Sucessfully Deleted Auth Token For Login User");
               } 
              else{
                  console.log("Didn't find Any Auth");
                  res.send(400).send("Error in Deleting Auth Token");
              } 

        });    
    }

    return {
        registerAction: registerAction,
        loginAction: loginAction,
        logoutAction : logoutAction,
        getAllUsers: getAllUsers,
        updateUser: updateUser,
        checkUserIsActive: checkUserIsActive,
        disableUserActive: disableUserActive,
        deleteUser: deleteUser,
    }

})();
