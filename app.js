const express = require('express'),
    cluster = require('cluster'),
    bodyParser = require('body-parser'),
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

    serverUtils.router(app, __dirname + '/routes');


    app.listen(8080, () => {
        console.log('RONET_PORTFOLIO');
    })
}