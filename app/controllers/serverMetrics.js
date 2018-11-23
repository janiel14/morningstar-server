module.exports = function(app) {
    const _self = {};
    const ServerMetrics = app.models.serverMetrics;

    /**
     * insert
     * @param {Object} req
     * @param {Object} res
     * @route /api/servermetrics
     * @method POST
     */
    _self.insert = async (req, res) => {
        try {
            req.body.date = new Date();
            const saved = await ServerMetrics.create(req.body);
            if (saved) {
                res.status(200).json({
                    status: 200,
                    message: 'Saved metrics',
                    data: saved
                });
            } else {
                res.status(500).json({
                    status: 500,
                    message: 'Failed on save metrics',
                    data: saved
                });
            }
        } catch (error) {
            app.logger.error("app - controllers - serverMetrics - insert: " + error);
            res.status(500).json({
                status: 500,
                messae: "Internal server error",
                data: error
            });
        }
    }

    /**
     * getMetrics
     * @param {Object} req
     * @param {Object} res
     * @route /api/servermetrics/:hostname/:datebegin/:dateend/:skip/:limit
     * @method GET
     */
    _self.getMetrics = async (req, res) => {
        try {
            const metrics = await ServerMetrics.find({
                hostname: req.params.hostname,
                date: {
                    $gte: new Date(req.params.datebegin),
                    $lt: new Date(req.params.dateend)
                }
            }).skip(parseInt(req.params.skip)).limit(parseInt(req.params.limit));
            if (metrics) {
                res.status(200).json({
                    status: 200,
                    message: 'Metrics found',
                    data: metrics,
                    total: metrics.length
                });
            } else {
                res.status(500).json({
                    status: 500,
                    message: 'Failed on take metrics',
                    data: metrics
                });
            }
        } catch (error) {
            app.logger.error("app - controllers - serverMetrics - getMetrics: " + error);
            res.status(500).json({
                status: 500,
                messae: "Internal server error",
                data: error
            });
        }
    }

    return _self;
}