module.exports = function(app) {
    const controller = app.controllers.servers;
    app.route('/api/servers')
        .post(controller.insertOrUpdate);
    app.route('/api/servers/:hostname')
        .delete(controller.delete)
        .get(controller.getServer);
    app.route('/api/servers/:skip/:limit')
        .get(controller.getServers);
}