module.exports = function(app) {
    const controller = app.controllers.serverMetrics;
    app.route('/api/servermetrics')
        .post(app.auth.authorizeUserID, controller.insert);
    app.route('/api/servermetrics/:hostname/:datebegin/:dateend/:skip/:limit')
        .get(app.auth.authorizeUserID, controller.getMetrics);
        
}