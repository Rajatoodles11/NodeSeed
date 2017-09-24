
var UserController = require("../../application/controllers/UserController").UserController;

console.log("In routing  userController is:",UserController);

// Creating a Router for routing 

module.exports.routePath = (function () {

  router.post('/api/registerUser',UserController.registerAction); // Register User API 
  router.post('/api/login',UserController.loginAction);  // Login API
  router.post('/api/updateUser',UserController.updateUser);  // Update User API 
  router.get('/api/Users',UserController.getAllUsers);  // Get All Users Details
  router.post('/api/checkUserIsActive',UserController.checkUserIsActive);  // Check User Active  
  router.post('/api/disableUserActive',UserController.disableUserActive);  // Disable User Active 
  router.post('/api/deleteUser',UserController.deleteUser);  // Disable User Active 
  router.post('/api/logout',UserController.logoutAction);  // Logout API
 
})();
