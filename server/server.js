const path = require('path');

const publicPath = path.join(__dirname, '../public');

const express = require('express');
const app = express();

app.use(express.static(publicPath));  //for the app to access static assets in the public folder

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`starting on port ${port}`);
});