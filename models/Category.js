const
	mongoose = require('mongoose'),
	categorySchema = new mongoose.Schema({
		name: { type: String, required: true },
		notes: [],
		links: [],
		toDoListItems: []
	})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category