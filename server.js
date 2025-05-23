const http = require('http');
const express = require('express');
const RED = require('node-red');
 
const app = express();
const server = http.createServer(app);
 
// Create settings object
const settings = {
  httpAdminRoot: "/admin",
  httpNodeRoot: "/api",
  userDir: "./.nodered/",
  functionGlobalContext: {},
  flowFile: 'flows.json',
  logging: {
    console: {
      level: "info",
      metrics: false,
      audit: false
    }
  }
};
 
// Initialise the runtime with a server and settings
RED.init(server, settings);
 
// Serve the editor UI from /admin
app.use(settings.httpAdminRoot, RED.httpAdmin);
 
// Serve the HTTP nodes UI from /api
app.use(settings.httpNodeRoot, RED.httpNode);
 
const PORT = process.env.PORT || 3000;
server.listen(PORT);
 
// Start Node-RED
RED.start();