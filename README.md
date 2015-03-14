node-red-contrib-1wire
=================

A <a href="http://nodered.org" target="_new">Node-RED</a> node to read a 1-wire DS18B20 temp sensor.

This node uses the built in GPIO pins to read the 1-wire sensor. This must be enabled in the /boot/config.txt using parameters such as:
	dtoverlay=w1-gpio,gpiopin=4
Once enabled you should see the sensor information at /sys/bus/w1/devices/

Install
-------

Run the following command in the root directory of your Node-RED install

    npm install -g .


Usage
-----

Provide the identifier for the 1-wire sensor to read
The **msg.topic** will contain the sensor identifier 
The **msg.payload** will contain the termpature in degrees C

