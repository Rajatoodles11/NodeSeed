var mongoose     = require('mongoose');
require('mongoose-type-email');

var Schema = mongoose.Schema;

var UserAuthenticationSchema = new Schema({

	authToken: {
		type: String,
		default: '',
		required: true,
		trim: true,
	},
    email: {
		type: String,
		default: '',
		required: true,
		trim: true,
	},
    user: {
		type: Schema.ObjectId,
        ref:'user'
    },
    created: {
		type: Date,
		default: Date.now
	}

});


UserAuthentication = mongoose.model('UserAuthentication', UserAuthenticationSchema);

module.exports = UserAuthentication;