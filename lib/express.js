const express = require("express");
const consign = require("consign");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const logger = require("./logger")();
const mongoose = require("./mongoose")();
const utils = require("./utils");
const expressValidator = require('express-validator');
module.exports = function() {
    const app = express();
    app.logger = logger.getLogger();
    app.debugging = logger.getDebug();
    app.utils = utils(app);
    app.utils.checkBasicFolders();
    app.set('port', process.env.NODE_PORT || 7000);
    app.env = process.env.NODE_ENV || 'development';
    app.debug = process.env.NODE_DEBUG || false;
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({limit: '100mb',extended: true}));
    app.use(bodyParser.json({limit: '100mb'}));
    app.use(require('method-override')());
    app.use(cors());
    app.use(expressValidator());
    app.use(helmet());
    mongoose.getConnection((conn) => {
        if (conn) {
            app.mongodb = conn;
            consign({cwd: 'app', verbose: false})
                .include("models")
                .then("controllers")
                .then("routes")
                .into(app);
        } else {
            app.logger.log("error", "falha ao connectar o servidor mongodb!");
            process.exit(0);
        }
    });
    app.get('*', function(req, res) {
        res.status(200).json({
            message: "I m working hard, please don't distubed!"
        });
    });
    return app;
}