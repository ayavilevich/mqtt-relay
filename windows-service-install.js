const { Service } = require('node-windows');
const path = require('path');

// Create a new service object
const svc = new Service({
	name: 'mqtt-relay',
	description: 'Agent to provide mqtt relay functionality',
	script: path.join(__dirname, 'server.js'),
	workingDirectory: __dirname,
	/*
	env: [{
		name: "HOME",
		value: process.env["USERPROFILE"],
	},
	{
		name: "TEMP",
		value: 'value',
	}],
	*/
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', () => {
	svc.start();
});

svc.install();
