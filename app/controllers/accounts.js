module.exports = function(app) {
    const _self = {};
    const Accounts = app.models.accounts;

    /**
     * insertOrUpdate
     * @param {Object} req
     * @param {Object} res
     * @route /api/accounts
     * @method POST
     */
    _self.insertOrUpdate = async (req, res) => {
        try {
            req.check('active', 'param active not found!').notEmpty();
            req.check('name', 'param name not found!').notEmpty();
            req.check('email', 'param email not found!').notEmpty();
            if (errors) {
                res.status(400).json({
                    status: 400,
                    message: "Params not found",
                    data: errors
                });
            } else {
                if (req.body._id) {
                    req.body.updated_date = new Date();
                    const updated = await Accounts.updateOne({
                        _id: req.body._id
                    },req.body);
                    if (updated) {
                        res.status(200).json({
                            status: 200,
                            message: 'Account updated',
                            data: updated
                        });
                    } else {
                        res.status(500).json({
                            status: 500,
                            message: 'Account not updated',
                            data: updated
                        });
                    }
                } else {
                    req.body.created_date = new Date();
                    req.body.updated_date = req.body.created_date;
                    req.body.users = JSON.parse(req.body.users);
                    req.body.users[0].created_date = req.body.created_date;
                    req.body.users[0].updated_date = req.body.updated_date;
                    const created = await Accounts.create(req.body);
                    if (created) {
                        res.status(200).json({
                            status: 200,
                            message: 'Account created',
                            data: created
                        });
                    } else {
                        res.status(500).json({
                            status: 500,
                            message: 'Account not created',
                            data: created
                        });
                    }
                }
            }
        } catch (error) {
            app.logger.error("app - controllers - accounts - insertOrUpdate: " + error);
            res.status(500).json({
                status: 500,
                messae: "Internal server error",
                data: error
            });
        }
    }

    /**
     * insertOrUpdate
     * @param {Object} req
     * @param {Object} res
     * @route /api/accounts/users
     * @method POST
     */
    _self.insertOrUpdateUser = async (req, res) => {
        try {
            req.check('active', 'param active not found!').notEmpty();
            req.check('name', 'param name not found!').notEmpty();
            req.check('email', 'param email not found!').notEmpty();
            if (errors) {
                res.status(400).json({
                    status: 400,
                    message: "Params not found",
                    data: errors
                });
            } else {
                const account = await Accounts.findOne({
                    _id: req.header('star')
                });
                if (account) {
                    if (req.body._id) {
                        account.users.find((item, index) => {
                            if (item._id === req.body._id) {
                                account.users[index] = req.body;
                            }
                        });
                        const updated = await Accounts.updateOne({
                            _id: account._id
                        }, account);
                        if (updated) {
                            res.status(200).json({
                                status: 200,
                                message: 'User updated',
                                data: updated
                            });
                        } else {
                            res.status(500).json({
                                status: 500,
                                message: 'User not updated',
                                data: updated
                            });
                        }
                    } else {
                        account.users.push(req.body);
                        const created = await Accounts.updateOne({
                            _id: account._id
                        }, account);
                        if (created) {
                            res.status(200).json({
                                status: 200,
                                message: 'User created',
                                data: created
                            });
                        } else {
                            res.status(500).json({
                                status: 500,
                                message: 'User not created',
                                data: created
                            });
                        }
                    }
                } else {
                    res.status(500).json({
                        status: 500,
                        message: 'Account not found!',
                        data: account
                    });
                }
            }
        } catch (error) {
            app.logger.error("app - controllers - accounts - insertOrUpdateUser: " + error);
            res.status(500).json({
                status: 500,
                messae: "Internal server error",
                data: error
            });
        }
    }

    return _self;
}