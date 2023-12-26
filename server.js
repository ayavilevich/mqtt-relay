var mqtt = require('mqtt');
require('dotenv').config()

var srcHost = process.env.SOURCE;
var destHost = process.env.DESTINATION;
var topics = process.env.TOPICS;

if (!srcHost) {
  console.error("Please define a SOURCE host (as env variable)");
  process.exit(1);
}

if (!destHost) {
  console.error("Please define a DESTINATION host (as env variable)");
  process.exit(1);
}

if (!topics) {
  console.error("Please define TOPICS (as comma separated env variable) to forward");
  process.exit(1);
}
topics = topics.split(",");


var srcClient = mqtt.connect(srcHost);
var destClient = mqtt.connect(destHost);

srcClient.on('connect', function () {
  console.log("Connected to source " + srcHost);
  console.log("Subscribing to topics: " + topics.join(", "));
  srcClient.subscribe(topics);
});

destClient.on('connect', function () {
  console.log("Connected to destination " + destHost);
});

srcClient.on('error', function (error) {
  console.error("Failed to connect to source " + srcHost, error);
});

destClient.on('error', function (error) {
  console.error("Failed to connect to destination " + destHost, error);
});

srcClient.on('message', function (topic, message) {
  if (!destClient.connected) {
    console.log("Received message from source, but destination isn't connected. Dropping message");
    return;
  }
  // console.log("forwarding message on topic " + topic); // reduce this log entry so that it doesn't blow up the log on disk
  destClient.publish(topic, message);
});

// generic notifications
// source
srcClient.on('reconnect', () => {
	console.warn('S MQTT reconnect');
});

srcClient.on('disconnect', () => {
	console.warn('S MQTT disconnect');
});

srcClient.on('offline', () => {
	console.warn('S MQTT offline');
});

srcClient.on('close', () => {
	console.warn('S MQTT close');
});

srcClient.on('end', () => {
	console.warn('S MQTT end');
});

// dest
destClient.on('reconnect', () => {
	console.warn('D MQTT reconnect');
});

destClient.on('disconnect', () => {
	console.warn('D MQTT disconnect');
});

destClient.on('offline', () => {
	console.warn('D MQTT offline');
});

destClient.on('close', () => {
	console.warn('D MQTT close');
});

destClient.on('end', () => {
	console.warn('D MQTT end');
});
