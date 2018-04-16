const
	express = require('express'),
	categoriesRouter = new express.Router(),
	categoriesCtrl = require('../controllers/categories.js'),
	verifyToken = require('../serverAuth.js').verifyToken

categoriesRouter.use(verifyToken)

categoriesRouter.route('/')
	.get(categoriesCtrl.index)
	.post(categoriesCtrl.create)


categoriesRouter.route('/:id')
	.get(categoriesCtrl.show)
	.patch(categoriesCtrl.update)
	.delete(categoriesCtrl.destroy)

categoriesRouter.post('/:id/todos', categoriesCtrl.addTodoToCategory)
categoriesRouter.post('/:id/notes', categoriesCtrl.addNoteToCategory)
categoriesRouter.post('/:id/links', categoriesCtrl.addLinkToCategory)

module.exports = categoriesRouter