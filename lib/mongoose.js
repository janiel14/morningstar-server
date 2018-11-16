const Mongoose = require('mongoose');
module.exports = function() {
    const _self = {};
    const _options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false, // Don't build indexes
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    };

    /**
     * getConfig
     * @return {Object} config
     */
    const getConfig = () => {
        const config = {
            database: process.env.NODE_MONGO_DBNAME || "morningstar",
            host: process.env.NODE_MONGO_HOST || 'localhost',
            user: process.env.NODE_MONGO_USER || 'morningstar',
            pass: process.env.NODE_MONGO_PASS || 'dfhuw128ysg',
            port: process.env.NODE_MONGO_PORT || 27017
        };
        return config;
    }

    /**
     * getConnection
     * @return {Object} connection
     */
    _self.getConnection = () => {
        const config = getConfig();
        return Mongoose.connect('mongodb://' + config.user + ':' + config.pass + '@' + config.host +':' + config.port + '/' + config.database, _options, (error) => {
            if (error) {
                console.error(error);
            }
        });
    }
    return _self;
}