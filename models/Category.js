const
	mongoose = require('mongoose'),
	categorySchema = new mongoose.Schema({
		name: { type: String, required: true },
		notes: [],
		links: [],
		toDoListItems: [],
		inNav: {type: Boolean, default: false },
		user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category