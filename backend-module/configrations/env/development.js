console.log("Hello in Development environment file ");

var obj = {

       insertUserAPI : "http://localhost:8081/api/registerUser/",
       getUserAPI : "http://localhost:8081/api/Users", 
       updateUserAPI : "http://localhost:8081/api/updateUser/",
       deleteUserAPI : "http://localhost:8081/api/deleteUser",

}

module.exports = obj; 