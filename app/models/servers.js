const Mongoose = require('mongoose');
module.exports = function(app) {
    const ipsSchema = new Mongoose.Schema({
        ip: 'String',
        primary: 'Boolean'
    });
    const hdsSchema = new Mongoose.Schema({
        path: 'String',
        size: 'Number',
        used: 'Number',
        avail: 'Number',
        mount: 'String'
    });
    const servicesSchema = new Mongoose.Schema({
        active: 'String',
        status: 'String',
        service: 'String',
        uptime: 'String',
        mainpid: 'Number'
    });
    return app.mongoose.model('servers', new Mongoose.Schema({
        active: 'String',
        status: 'String',
        os: 'String',
        hostname: 'String',
        uptime: 'Number',
        fails: 'Number',
        ips: [ipsSchema],
        hds: [hdsSchema],
        services: [servicesSchema]
    }));
}