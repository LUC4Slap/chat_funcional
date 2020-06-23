const app = require("../../config/server");

module.exports = function(application) {
    application.get('/', (req, res) => {
        application.app.controllers.index.home(application, req, res);
    })
}