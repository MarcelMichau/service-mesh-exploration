const express = require('express');
const app = express();
const port = 80;

const buildMessage = () => {
	return `Hello there from the secret service, which can't be reached from outside the cluster.`;
};

app.get('/', (req, res) =>
	res.json({
		message: buildMessage()
	})
);

app.listen(port, () =>
	console.log(`secret-service listening on port ${port}!`)
);
