const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 80;

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

const buildMessage = () => {
	return `Hello there from the number service, your random number is: ${getRandomArbitrary(
		1,
		100
	)}`;
};

app.get('/', (req, res) =>
	res.json({
		message: buildMessage()
	})
);

app.get('/with-greeting', async (req, res) => {
	try {
		const response = await fetch('http://greeting-service/');
		const result = await response.json();

		res.json({
			message: `${buildMessage()}, along with a message from greeting service: ${
				result.message
			}`
		});
	} catch (ex) {
		res.json({ error: ex });
	}
});

app.get('/with-time', async (req, res) => {
	try {
		const response = await fetch('http://time-service/');
		const result = await response.json();

		res.json({
			message: `${buildMessage()}, along with a message from time service: ${
				result.message
			}`
		});
	} catch (ex) {
		res.json({ error: ex });
	}
});

app.listen(port, () =>
	console.log(`greeting-service listening on port ${port}!`)
);
