/* eslint-disable no-console */
const { Service } = require('node-windows');
const path = require('path');

// Create a new service object
const svc = new Service({
	name: 'mqtt-relay',
	description: 'Agent to provide mqtt relay functionality',
	script: path.join(__dirname, 'index.js'),
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', () => {
	console.log('Uninstall complete.');
	console.log('The service exists: ', svc.exists);
});

// Uninstall the service.
svc.uninstall();
