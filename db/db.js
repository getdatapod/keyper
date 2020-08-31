const { app } = require('electron');
const Datastore = require('nedb-promises');
const path = require('path');

const homePath = app.getPath('home');

const keys = Datastore.create({
  filename: path.join(homePath, '.keyper', 'db', 'keys.db'),
  autoload: true,
  timestampData: true,
});

const providers = Datastore.create({
  filename: path.join(homePath, '.keyper', 'db', 'providers.db'),
  autoload: true,
});

const permissions = Datastore.create({
  filename: path.join(homePath, '.keyper', 'db', 'permissions.db'),
  autoload: true,
  timestampData: true,
});

const apps = Datastore.create({
  filename: path.join(homePath, '.keyper', 'db', 'apps.db'),
  autoload: true,
});

const auditLogs = Datastore.create({
  filename: path.join(homePath, '.keyper', 'db', 'audit_logs.db'),
  autoload: true,
  timestampData: true,
});

module.exports = {
  Key: keys,
  Provider: providers,
  Permission: permissions,
  App: apps,
  AuditLog: auditLogs,
};
