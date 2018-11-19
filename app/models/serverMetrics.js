const Mongoose = require('mongoose');
module.exports = function(app) {
    return app.mongodb.model('serverMetrics', new Mongoose.Schema({
        hostname: 'String',
        date: 'Date',
        cpu: 'Number',
        ram: 'Number',
        load_1: 'Number',
        load_5: 'Number',
        load_15: 'Number'
    }));
}