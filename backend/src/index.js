const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://omnistack:mYYDA3gMfgbGnW6H@omnistack10-ncznr.mongodb.net/test?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
    
app.use(cors());
app.use(express.json());
app.use(routes);
    
app.listen(3333);