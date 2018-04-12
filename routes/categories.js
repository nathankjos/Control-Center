const
	express = require('express'),
	categoriesRouter = new express.Router(),
	categoriesCtrl = require('../controllers/categories.js'),
	verifyToken = require('../serverAuth.js').verifyToken

categoriesRouter.route('/')
	.get(categoriesCtrl.index)
	.post(categoriesCtrl.create)

categoriesRouter.use(verifyToken)

categoriesRouter.route('/:id')
	.get(categoriesCtrl.show)
	// .patch(categoriesCtrl.update)
	.delete(categoriesCtrl.destroy)

module.exports = categoriesRouter