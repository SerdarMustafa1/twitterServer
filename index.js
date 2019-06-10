const express = require('express');
const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.get('/', (request, response) => {
	response.json({
		info: 'Node.js, Express'
	});
});

const params1 = {
	id: '23424829'
}; //DE
const params2 = {
	id: '23424975'
}; //UK
const params3 = {
	id: '23424977'
}; //US

let DEtrendsResults = app.get('/trendsDE', function(req, response) {
	T.get('trends/place', params1, function(err, data, res) {
		if (!err) {
			const DEtweets = data;
			//setInterval(function() {
			let obj = JSON.stringify(DEtweets, undefined, 2);
			console.log(obj);
			response.json(DEtweets);
			// }, 3000);
		} else {
			console.log('Something went wrong');
		}
	});
});

let UKtrendsResults = app.get('/trendsUK', function(req, response) {
	T.get('trends/place', params2, function(err, data, res) {
		if (!err) {
			const UKtweets = data;
			// setInterval(function() {
			let obj = JSON.stringify(UKtweets, undefined, 2);
			console.log(obj);
			response.json(UKtweets);
			// }, 3000);
		} else {
			console.log('Something went wrong');
		}
	});
});

let UStrendsResults = app.get('/trendsUS', function(req, response) {
	T.get('trends/place', params3, function(err, data, res) {
		if (!err) {
			const UStweets = data;
			// setInterval(function() {
			let obj = JSON.stringify(UStweets, undefined, 2);
			console.log(obj);
			response.json(UStweets);
			// }, 3000);
		} else {
			console.log('Something went wrong');
		}
	});
});

https.createServer(app);
app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
