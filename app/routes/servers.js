module.exports = function(app) {
    const controller = app.controllers.servers;
    app.route('/api/servers')
        .post(app.auth.authorizeUserID, controller.insertOrUpdate);
    app.route('/api/servers/:hostname')
        .delete(controller.delete)
        .get(app.auth.authorizeUserID, controller.getServer);
    app.route('/api/servers/:skip/:limit')
        .get(app.auth.authorizeUserID, controller.getServers);
}