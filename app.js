const express = require('express'),
    cluster = require('cluster'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    serverUtils = require('./server-utils'),
    numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    let i = 0;
    for (i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    const app = express();

    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: 'R!ON#%OYR#%0F2H5%#CVBNA2RTIA^R^&9O',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 2 //2일
        }
    }));

    serverUtils.mongoose(app);
    serverUtils.router(app, __dirname + '/routes');


    app.listen(80, () => {
        console.log('RONET_PORTFOLIO');
    })
}