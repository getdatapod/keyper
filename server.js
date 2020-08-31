const { app: electronApp } = require('electron');
const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const open = require('open');
const path = require('path');

const providerRouter = require('./routes/providerRoutes');
const permissionRouter = require('./routes/permissionRoutes');
const appRouter = require('./routes/appRoutes');
const keyRouter = require('./routes/keyRoutes');
const viewRouter = require('./routes/viewRoutes');
const requestRouter = require('./routes/requestRoutes');
const auditLogsRouter = require('./routes/auditLogRoutes');
require('./utils/seedProviders');

const app = express();

const server = http.createServer(app);

// TODO Remove cors in production
// GitHub issue - https://github.com/getdatapod/bridge23-samples/issues/4
app.use(cors());

// For parsing req.body data
app.use(express.json());

// Setting pug template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/providers', providerRouter);
app.use('/api/permissions', permissionRouter);
app.use('/api/apps', appRouter);
app.use('/api/keys', keyRouter);
app.use('/api/auditLogs', auditLogsRouter);

app.use('/auth', viewRouter);

app.post('/connect', async (req, res) => {
  const { providerName, appMetadata } = req.body;

  const domain = appMetadata.domain;
  const manifestUri = appMetadata.manifestUri;

  // Open consent screen in the system default browser
  open(
    `http://localhost:4242/auth?providerName=${providerName}&domain=${domain}&manifestUri=${manifestUri}`
  );

  res.end();
});

app.use('/endpoint', requestRouter);

app.get('/health', (req, res) => res.json('ok'));

// Setting directory for serving all static assets
app.use(express.static(path.join(__dirname, 'build')));

// Secondary static directory if asset not found above
app.use(
  express.static(path.join(electronApp.getPath('home'), '.keyper', 'images'))
);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(4242);

server.on('close', () => {
  console.log('Server closed!!');
});

server.on('listening', () => {
  console.log('Server started');
});

module.exports = { server };
