'use strict';

const express = require('express');
const os = require('os');
const properties = require('properties');
const fs = require('fs');

const PORT = process.env.NODE_PORT || 3000;
const userInfo = os.userInfo();
const hostName = os.hostname();
const env = process.env;

const bailOut = (err) => {
    console.error(err);
    process.exit(1);
}

const apiKey = (done) => {
    fs.readFile(__dirname+'/secrets/api_key.txt', {encoding: 'utf-8'}, (err, data) => {
        if (err) done(err);
        else done(null, data.trim());
    });
}

const routes = (config, done) => {

    const app = express();
    
    app.get('/info', (req, res, next) => {
        const data = {
            time: new Date().toJSON(),
            ip: req.ip,
            hostname: req.hostname,
            method: req.method,
            path: req.path,
            headers: req.headers,
            system: {
                runtime: process.release.name+'@'+process.version,
                user: userInfo.username+' ('+userInfo.uid+':'+userInfo.gid+')',
                hostname: hostName
            }
        };
        res.status(200).json(data);
    });
    
    app.get('/config', (req, res, next) => {
        res.status(200).json(config);
    });

    done(null, app);
}

const setup = (done) => {
    properties.parse(__dirname+'/config/app.properties', {path: true, sections: true}, (err, props) => {
        if (err) done(err);
        else apiKey((err, apiKey) => {
            if (err) done(err);
            else {
                const config = Object.assign({}, props, {apiKey});
                routes(config, done);
            }
        })
    });
}

setup((err, app) => {
    if (err) bailOut(err);
    else app.listen(PORT, () => console.log(':'+PORT));
});
