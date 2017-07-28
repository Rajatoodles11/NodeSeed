
var UserService = require('../services/UserService');

// Iffy function is used i.e Immedate Invoked Function
module.exports.UserController = (function () {

var registerAction = function(req,res){
   
   console.log("In UserController");
//    var name = req.body.name;
//    var email = req.body.email;
//    var phone = req.body.phone;
//    var password = req.body.password;
//    var age = req.body.age;
//    var obj ={
//          name = req.body.name,
//          email = req.body.email,
//          phone = req.body.phone,
//          password = req.body.password,
//          age = req.body.age,
//    }      

//    console.log("Object is",obj);     
       
//    UserService.registerAction(obj);    
}



return {

registerAction : registerAction,
}

})();
