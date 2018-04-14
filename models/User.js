const
	mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	userSchema = new mongoose.Schema({
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
		imageUrl: {type: String, required: true, default: 'https://media.giphy.com/media/G3lxvBMhGu53y/source.gif'}
	})

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password)
}

userSchema.pre('save', function(next) {
	if(this.isModified('password')) {
		this.password = this.generateHash(this.password)
	}
	next()
})

const User = mongoose.model('User', userSchema)
module.exports = User