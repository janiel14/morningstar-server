const Schema = require('mongoose').Schema;
const Mongoose = require('mongoose');
module.exports = function(app) {
    const ips = new Schema({
        ip: 'String',
        primary: 'Boolean'
    });
    const hds = new Schema({
        path: 'String',
        size: 'Number',
        used: 'Number',
        avail: 'Number',
        mount: 'String'
    });
    const services = new Schema({
        active: 'Boolean',
        status: 'String',
        uptime: 'String',
        name: 'String',
        description: 'String',
    });
    return app.mongodb.model('servers', new Mongoose.Schema({
        id_user: 'String',
        active: 'String',
        status: 'String',
        os: 'String',
        hostname: 'String',
        uptime: 'Number',
        fails: 'Number',
        memory_ram: 'Number',
        cpu_clocks: 'Number',
        swap: 'Number',
        ips: [ips],
        hds: [hds],
        services: [services]
    }));
}