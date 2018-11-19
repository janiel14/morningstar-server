const Mongoose = require('mongoose');
module.exports = function(app) {
    return app.mongodb.model('servers', new Mongoose.Schema({
        active: 'String',
        status: 'String',
        os: 'String',
        hostname: 'String',
        uptime: 'Number',
        fails: 'Number'
    }));
}