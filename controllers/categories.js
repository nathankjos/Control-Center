const Category = require('../models/Category.js')

module.exports = {
	index: (req, res) => {
		Category.find({}, (err, categories) => {
			res.json(categories)
		})
	},

	show: (req, res) => {
		console.log("Current Category:")
		console.log(req.Category)
		Category.findById(req.params.id, (err, category) => {
			res.json(category)
		})
	},

	create: (req, res) => {
		Category.create(req.body, (err, category) => {
			if(err) return res.json({success: false, code: err.code})
			res.json({success: true, message: "Category created."})
		})
    },
    
	destroy: (req, res) => {
		Category.findByIdAndRemove(req.params.id, (err, category) => {
			res.json({success: true, message: "Category deleted.", category})
		})
	},
}