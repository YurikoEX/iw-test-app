var _ = require('lodash');
var MainService = require('./Service/MainService');
if (_.isUndefined(process.env.VCAP_APP_PORT)) {
    process.env.VCAP_APP_PORT = 8081;
}
console.log(process.env.VCAP_APP_PORT);
var service = new MainService();
//# sourceMappingURL=index.js.map