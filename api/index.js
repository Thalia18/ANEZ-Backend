const express = require('express');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();

// const PORT = process.env.PORT || 3300;

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api', routes);

// server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
module.exports = server;
