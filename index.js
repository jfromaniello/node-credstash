const async = require('async');
const decrypter = require('./lib/decrypter');
const encoder = require('./lib/encoder');
const hmac = require('./lib/hmac');
const keys = require('./lib/keys');
const secrets = require('./lib/secrets');

function Credstash(config) {
  this.table = config ? config.table : undefined;
}

Credstash.prototype.get = function(name, done) {
  return async.waterfall([
    async.apply(secrets.get, this.table, name),
    async.apply(keys.decrypt),
    async.apply(hmac.check),
    async.apply(decrypter.decrypt)
  ], done);
};

module.exports = Credstash;
