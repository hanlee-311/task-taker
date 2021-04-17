const express = require('express');
const path = require('path');
const viewRoutes = require('./routes/view');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 4600;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use('/', viewRoutes);

app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));