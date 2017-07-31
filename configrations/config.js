
// load the config file for the current environment
global.config = require('./env/' + process.env.NODE_ENV);

// console.log("config object is:",config);
// export config
module.exports = config;