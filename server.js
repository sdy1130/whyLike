//random change
'use strict';

const express = require('express');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

// Import mongoose connection
const { mongoose } = require('./db/mongoose');

const { Reason } = require('./model');

// load express
const app = express();
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/images'));

app.use(bodyParser.json());

// get Routes
app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/webApp.html');
});

// get all Reasons
app.get('/reasons', (req, res) => {
	Reason.find().then((reasons) => {
		res.send(reasons);
	}, (error) => {
		res.status(500).send(error);
	})
});

// delete a Reason
app.delete('/delete/:rid', (req, res) => {
	const rid = req.params.rid;
	Reason.findOneAndRemove({_id: rid}, function(error, data) {
		if(!error) {
			console.log("Deleted")
		}
	})
})

// add a Reason
app.post('/add', (req, res) => {
	const comment = req.body.comment;
	const date = req.body.date;

    console.log("b");

	const newReason = new Reason({
		_id: mongoose.Types.ObjectId(),
		comment: comment,
		date: date
    });

	newReason.save().then((result) => {
		// Save and send object that was saved
        res.send(result)
        console.log(result);
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
});

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});