
var getDbConnection = function () {
    switch (process.env.NODE_ENV) {
    case 'development':
    //  mongoose.Promise = require('bluebird');
      var db = mongoose.connect('mongodb://localhost/nodeseed',{
            useMongoClient: true,     
        });
        
      return checkMongooseConnection(db)
     case 'staging':
       var db = mongoose.connect('mongodb://localhost:3331/Users');
        return checkMongooseConnection(db)
    case 'production':
      var db = mongoose.connect('mongodb://admin:oodles@localhost:3331/Users');
       return checkMongooseConnection(db)

    case 'test':
        var db = mongoose.connect('mongodb://root:root@localhost:3331/Users');
        return checkMongooseConnection(db)
    }
}


 //function to check connection to database server
 function checkMongooseConnection(db){
    //    mongoose.connection.on('open', function (ref) {
    //         console.log("Connected to Mongo db");
    //         return db
    //    });
       mongoose.connection.on('error', function (err) {
            console.log("Error occur in connection to Mongo db");
            if(err) throw err;
      });
    mongoose.createConnection('mongodb://localhost/nodeseed', {
        useMongoClient: true,
      /* other options */
    }
    ); 
    return db;   
}



module.exports.getDbConnection = getDbConnection;
