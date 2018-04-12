const
	mongoose = require('mongoose'),
	categorySchema = new mongoose.Schema({
		name: { type: String, required: true },
	})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category