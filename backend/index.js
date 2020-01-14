const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://omnistack:mYYDA3gMfgbGnW6H@omnistack10-ncznr.mongodb.net/test?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true});
    
    app.use(express.json());
    
    app.get('/', (resq, resp) => {
        return resp.json({message:'Hello OmniStack'});
    });
    
    app.listen(3333);