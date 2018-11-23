const Mongoose = require('mongoose');
module.exports = function(app) {
    const _self = {};
    /**
     * authorizeUserID
     * @param {Object} req
     * @param {Object} res
     * @return {Object} next
     */
    _self.authorizeUserID = (req, res, next) => {
        if (req.header('star')) {
            app.models.accounts.findOne({
                _id: req.header('star')
            }).then((response) => {
                if (response) {
                    next();
                } else {
                    res.status(401).json({
                        status: 401,
                        message: 'Not authorized!'
                    }); 
                }
            },(error) => {
                app.logger.error(error);
                res.status(401).json({
                    status: 401,
                    message: 'Not authorized!'
                });
            });
        } else {
            res.status(401).json({
                status: 401,
                message: 'Not authorized!'
            });
        }
    }

    return _self;
}