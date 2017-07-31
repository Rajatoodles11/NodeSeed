var mongoose     = require('mongoose');
require('mongoose-type-email');

var Schema = mongoose.Schema;

var UserSchema   = new Schema({
        
    name: String,
    email: { type: mongoose.SchemaTypes.Email, required: true ,trim :true, },
    age: Number, 
    phone: Number,
    password: { type : String, required:true }, 
    isActive:{ type:Boolean, default:true },
    updated: { type: Date, default: Date.now },

});

User = mongoose.model('User', UserSchema);

module.exports = User;