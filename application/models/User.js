var mongoose     = require('mongoose');
require('mongoose-type-email');

var Schema = mongoose.Schema;

var UserSchema   = new Schema({
        
    name: String,
    email: { type: mongoose.SchemaTypes.Email, required: true },
    age: Number, 
    phone: Number,
    password: { type : String, required:true }, 
    isActive:{ type:Boolean, default:true },
    updated: { type: Date, default: Date.now },

});

module.exports = mongoose.model('User', UserSchema);
