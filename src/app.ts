"use strict";

import * as express from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';

import * as helmet from 'helmet';

import * as cookieParser from 'cookie-parser';
import * as expressLayouts from 'express-ejs-layouts';
import * as bodyParser from 'body-parser';
import * as csrf from 'csurf';

import * as session from './middlewares/session';
import * as httpRequest from './middlewares/http-request';

import config from './config';

import router from './routes/router';

const app = express();
const server = new http.Server(app);
const io = socketio(server);

// Defining EJS as the view engine
app.set('view engine', 'ejs');

// Autorize proxy connections
app.set('trust proxy', 1);

// Get some directories to static (like in the root directoy)
app.use(express.static(`${config.env == "dev" ? "src" : "dist"}/public`));

// Defining the views directory
app.set('views', 'src/views');

// Resolve some HTTP issues
app.use(helmet());

// Use the cookie parser middleware
app.use(cookieParser());

// Use the express layouts middleware
app.use(expressLayouts);

// Add the capacity to receive HTTP Request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Enable CSRF protection
app.use(csrf({
    cookie: true
}));

// Defining the socket.io middleware
io.use((socket, next) => {
    session.sess(socket.request, socket.request.res, next);
});

// Configuring the sessions
app.use(session.sess);

// Routing middleware (Pre-Actions while sending an HTTP Request)
app.use(httpRequest.load);

// Route error handler middleware
app.use(httpRequest.error);

// Defining and calling routes files
app.use('/', router.index);
app.use('/account', router.account);
app.use('/group', router.group);

// Route not found
app.get('*', function (req, res) {
    res.status(404);
    res.render('errors/404');
});

// Trying to the server, if impossible, log an error message
try {
    // Listen to a specific port
    server.listen(config.server.port, () => {
        console.log(`Harps Compagny Manager now launched on port ${config.server.port} !`);
    });
} catch (e) {
    console.log(`\x1b[31m/!\\ WARNING /!\\: \x1b[0mError on port : ${e}`);
}