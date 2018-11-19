module.exports = function(app) {
    const _self = {};
    const Servers = app.models.servers;

    /**
     * insertOrUpdate
     * @param {Object} req
     * @param {Object} res
     * @route /api/servers
     * @method POST
     */
    _self.insertOrUpdate = async (req, res) => {
        try {
            req.check('hostname', 'param hostname not found!').notEmpty();
            const errors = req.validationErrors();
            if (errors) {
                res.status(400).json({
                    status: 400,
                    message: "Params not found",
                    data: errors
                });
            } else {
                const serverExists = await Servers.findOne({
                    hostname: req.body.hostname
                });
                if (serverExists) {
                    const updated = await Servers.updateOne({
                        hostname: req.body.hostname
                    }, req.body);
                    if (updated) {
                        res.status(200).json({
                            status: 200,
                            message: "Server updated",
                            data: updated
                        });
                    } else {
                        res.status(500).json({
                            status: 500,
                            message: "can't update server",
                            data: created
                        });                        
                    }
                } else {
                    req.body.active = "Y";
                    req.body.status = "O";
                    req.body.fails = 0;
                    const created = await Servers.create(req.body);
                    if (created) {
                        res.status(200).json({
                            status: 200,
                            message: "Server created",
                            data: created
                        });
                    } else {
                        res.status(500).json({
                            status: 500,
                            message: "can't create server",
                            data: created
                        });
                    }
                }
            }
        } catch (error) {
            app.logger.log("error", "app - controllers - servers - insertOrUpdate: " + error);
            res.status(500).json({
                status: 500,
                messae: "Internal server error",
                data: error
            });
        }
    }

    /**
     * getServer
     * @param {Object} req
     * @param {Object} res
     * @route /api/servers/:hostname
     * @method GET
     */
    _self.getServer = async (req, res) => {
        try {
            const server = await Servers.findOne({
                hostname: req.params.hostname
            });
            res.status(200).json({
                status: 200,
                message: "Servers finded",
                data: server,
                total: 1
            });
        } catch (error) {
            app.logger.log("error", "app - controllers - servers - getServer: " + error);
            res.status(500).json({
                status: 500,
                messae: "Internal server error",
                data: error
            });
        }
    }

    /**
     * getServers
     * @param {Object} req
     * @param {Object} res
     * @route /api/servers/:skip/:limit
     */
    _self.getServers = async (req, res) => {
        try {
            const servers = Servers.find({
                skip: req.params.pag,
                limit: req.params.limit
            });
            res.status(200).json({
                status: 200,
                message: "Servers finded",
                data: servers,
                total: servers.length
            });
        } catch (error) {
            app.logger.log("error", "app - controllers - servers - getServers: " + error);
            res.status(500).json({
                status: 500,
                messae: "Internal server error",
                data: error
            });
        }
    }

    /**
     * delete
     * @param {Object} req
     * @param {Object} res
     * @route /api/servers/:hostname
     * @method DELETE
     */
    _self.delete = async (req, res) => {
        try {
            const deleted = await Servers.destroy({
                hostname: req.params.hostname
            });
            res.status(200).json({
                status: 200,
                message: "Servers deleted"
            });
        } catch (error) {
            app.logger.log("error", "app - controllers - servers - delete: " + error);
            res.status(500).json({
                status: 500,
                messae: "Internal server error",
                data: error
            });
        }
    }

    return _self;
}