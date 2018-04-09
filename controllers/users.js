const User = require('../models/User.js')

module.exports = {
	index: (req, res) => {
		User.find({}, (err, users) => {
			res.json(users)
		})
	}
}