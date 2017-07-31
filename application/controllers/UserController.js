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

        var loginDetails = {
                 username : req.body.username,
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

    return {

        registerAction: registerAction,
        loginAction : loginAction,
        getAllUsers : getAllUsers,
        updateUser : updateUser,
    }

})();
