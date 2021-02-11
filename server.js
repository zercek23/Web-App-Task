const express = require('express');
const InitiateMongoServer = require("./config/db");
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const projects = require('./routes/api/projects');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Connect
InitiateMongoServer();

// Use Routes
app.use('/api/users', users);
app.use('/api/projects', projects);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));