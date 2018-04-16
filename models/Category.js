const
	mongoose = require('mongoose'),
	ToDoListSchema = new mongoose.Schema({
        item: String
	}),
	NotesSchema = new mongoose.Schema({
        item: String
	}),
	LinksSchema = new mongoose.Schema({
        item: String
    }),
	categorySchema = new mongoose.Schema({
		name: { type: String, required: true, default: 'category' },
		notes: [NotesSchema],
		links: [LinksSchema],
		toDoListItems: [ToDoListSchema],
		inNav: {type: Boolean, default: false },
		user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category