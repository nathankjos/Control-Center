const Category = require('../models/Category.js')

module.exports = {
	index: (req, res) => {
		Category.find({user: req.user}).exec((err, categories) => {
			res.json(categories)
		})
	},
	
	show: (req, res) => {
		Category.findById(req.params.id, (err, category) => {
			res.json(category)
		})
	},

	create: (req, res) => {
		Category.create({...req.body, user: req.user}, (err, category) => {
			if(err) return res.json({success: false, code: err.code})
			res.json({success: true, message: "Category created.", category})
		})
	},
	
	update: (req,res) => {
		Category.findById(req.params.id, (err, category) => {
			category.inNav = !category.inNav
			category.save((err) => {
				if(err) return err
				res.json({ success: true, message: "Category updated.", category})
			})
		})
	},
    
	destroy: (req, res) => {
		Category.findByIdAndRemove(req.params.id, (err, category) => {
			res.json({success: true, message: "Category deleted.", category})
		})
	},

	addTodoToCategory: (req, res) => {
		Category.findById(req.params.id, (err, category) => {
			category.toDoListItems.push(req.body)
			category.save((err, updatedCategory) => {
				res.json({ success: true, message: "ToDo added.", category: updatedCategory})
			})
		})
	},

	addNoteToCategory: (req, res) => {
		Category.findById(req.params.id, (err, category) => {
			category.notes.push(req.body)
			category.save((err, updatedCategory) => {
				res.json({ success: true, message: "Note added.", category: updatedCategory})
			})
		})
	},
	addLinkToCategory: (req, res) => {
		Category.findById(req.params.id, (err, category) => {
			category.links.push(req.body)
			category.save((err, updatedCategory) => {
				res.json({ success: true, message: "Link added.", category: updatedCategory})
			})
		})
	}
}