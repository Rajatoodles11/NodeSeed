
var UserController = require("../../application/controllers/UserController").UserController;

console.log("In routing  userController is:",UserController);

// Creating a Router for routing 

module.exports.routePath = (function () {

  router.post('/api/registerUser',UserController.registerAction); // Register User API 
  router.post('/api/login',UserController.loginAction);  // Login API
  router.get('/api/Users',UserController.getAllUsers);  // Get All Users Details
  
})();
