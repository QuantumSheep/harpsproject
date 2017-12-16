'use strict';

import * as express from 'express';
import fs = require('fs');

const app = express();

app.get('/', (req, res, next) => {
    res.send('Welcome to Harps');
});

app.listen(4000);