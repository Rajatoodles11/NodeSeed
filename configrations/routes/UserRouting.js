
var UserController = require("../application/controllers/UserController").UserController;

console.log("userController is:",UserController);

module.exports.routePath = function () {
  router.post('/api/registerUser',UserController.registerAction)

}
