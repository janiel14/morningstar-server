const Mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
module.exports = function(app) {
    const users = new Schema({
        active: 'String',
        created_date: 'Date',
        updated_date: 'Date',
        name: 'String',
        email: 'String',
        password: 'String',
        last_login: 'Date'
    });
    return app.mongodb.model('accounts', new Mongoose.Schema({
        active: 'String',
        created_date: 'Date',
        updated_date: 'Date',
        name: 'String',
        address: 'String',
        zipcode: 'String',
        phone: 'String',
        cellphone: 'String',
        email: 'String',
        users: [users]
    }));
}