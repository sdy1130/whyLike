const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reason = mongoose.model('Reason', {
	_id: Schema.Types.ObjectId,
	comment: String,
	date: Date,
});


module.exports = { Reason };