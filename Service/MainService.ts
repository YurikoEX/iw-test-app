///<reference path='../node_modules/ironworks/ironworks.d.ts' />
var ironworks = require('ironworks');
var async = require('async');
var path = require('path');

import FooBarWorker = require('./Workers/FooBarWorker')

class MainService{
    service: any; //wish i had types :(
    constructor(){
        this.service = new ironworks.service('foobar-service', {
            dependencyCheckTimeout: 250,
            dependencyCheckFrequency: 10
        })
            .inject(function (service, use) {
                var w = new FooBarWorker(service);
                use(w);
            })
            .inject(function (service, use) {
                use(new ironworks.plugins.socket(service.comm, service.who()));
            })
            .inject(function (service, use) {
                use(new ironworks.plugins.http(service.comm, service.who(),{
                    apiUri: '/api',
                    rootSitePagePath:'index.html',
                    hapi: {
                        connections: {
                            routes: {
                                files: {
                                    relativeTo: path.resolve('./Service/public/dist')
                                }
                            }
                        }
                    }
                }));
            })
            .info('error', function (e) {
                throw e;
            })
            .info('ready', function (iw) {
               console.log('ready freddy');
            })
            .start();
    }
}

export = MainService;