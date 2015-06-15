///<reference path='../../node_modules/ironworks/ironworks.d.ts' />
var _ = require('lodash');
var ironworks = require('ironworks');
var async = require('async');
var FooBarWorker = (function () {
    function FooBarWorker(service) {
        this.worker = new ironworks.worker([
            'iw-socket'
        ], service.comm, service.who(), {
            id: 'foobar-worker',
            name: 'foobar-worker'
        });
        this.worker.answer('foo', function (cb) {
            cb(null, 'bar');
        });
        this.worker.init = function (cb) {
            if (!_.isUndefined(cb)) {
                cb();
            }
        };
        this.worker.start = function (deps, cb) {
            if (!_.isUndefined(cb)) {
                cb();
            }
            setInterval(function () {
                service.comm.inform('update', { "time": (new Date).getTime(), "data": Math.floor(Math.random() * 100000) });
            }, 1000);
        };
        return this.worker;
    }
    return FooBarWorker;
})();
module.exports = FooBarWorker;
//# sourceMappingURL=FooBarWorker.js.map