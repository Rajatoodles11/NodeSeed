var UserService = require('../services/UserService').UserService;

console.log("in UserController UserServices is:", UserService);
// Iffy function is used i.e Immedate Invoked Function
module.exports.UserController = (function () {

    var registerAction = function (req, res) {

        console.log("In UserController Register Action");
        var name = req.body.name;
        var email = req.body.email;
        var phone = req.body.phone;
        var password = req.body.password;
        var age = req.body.age;
        console.log("Name is:-", name);
        console.log("Email is:-", email);
        console.log("Phone is:-", phone);
        console.log("Password is:-", password);
        console.log("Age  is:-", age);
        var obj = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            age: age,
        }

        console.log("Object is", obj);
        UserService.registerAction(obj, res);
    }


    var loginAction = function(req,res){

        console.log("In loginAction UserController");
        console.log("Request body is:-",req.body);
        // var email = req.body.username;
        // console.log("Email is:",email);
        // var pass =  req.body.password; 
        // console.log("Password is:",pass); 
        var loginDetails = {
                 email : req.body.username,
                 password : req.body.password,
            }
        console.log("Logindetails in controller is:",loginDetails)
       UserService.loginAction(loginDetails,res);

    }


    var getAllUsers = function(req,res){

         console.log("In Controller getAllUsers function");
         UserService.getAllUsers(res);
    }

    var updateUser = function(req,res){

         console.log("in updateUser func in UserController"); 
         var userUpdateObject = req.body;
         UserService.updateUser(userUpdateObject, res); 
    }

    var checkUserIsActive = function(req,res){

        console.log("In UserController Check User Is Active");
        var userObj = {
            email : req.body.email,
            _id : req.body._id,
        }
        console.log("UserObj is:",userObj);
        UserService.checkUserIsActive(userObj,res); 
    }

    var disableUserActive = function(req,res){
         
        console.log("In UserController disableUserActive function");
        userobj = {
             email : req.body.email, 
        }
        UserService.disableUserActive(userobj,res);
    }

    var deleteUser = function(req,res){
        
        console.log("In UserController Delete User Function");
        var userid = req.body.userid;
        UserService.deleteUser(userid,res);
    }

    var logoutAction = function(req,res){

        console.log("In UserController Logout Action",req.body);
        loginUserData = {
                userid : req.body.userId,              
                email :req.body.email,
                authId : req.body.authId,
        }
        console.log("loginUserData is:-",loginUserData);
        UserService.logoutAction(loginUserData,res);
    }

    return {

        registerAction: registerAction,
        loginAction : loginAction,
        logoutAction : logoutAction,
        getAllUsers : getAllUsers,
        updateUser : updateUser,
        checkUserIsActive : checkUserIsActive,
        disableUserActive : disableUserActive,
        deleteUser : deleteUser,
 }

})();
