const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 80;

const buildMessage = () => {
	return `Hello there from the greeting service`;
};

app.get('/', (req, res) => res.json({ message: `${buildMessage()}!` }));

app.get('/with-number', async (req, res) => {
	try {
		const response = await fetch('http://number-service/');
		const result = await response.json();

		res.json({
			message: `${buildMessage()}, along with a message from number service: ${
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
