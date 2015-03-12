/**
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {

    function Wirenode(n) {
        RED.nodes.createNode(this,n);
	this.identifier = n.identifier.trim();
	this.format = n.format;
	var node = this;

        node.on("input", function(msg) {
		var identifier = this.identifier || msg.topic || null;
		var fs = require("fs");
		var filename = "/sys/bus/w1/devices/" + identifier +  "/w1_slave";	
		var data = fs.readFileSync(filename, "utf8");
		var re = new RegExp("YES");
		if (re.test(data)) {
			var test = data.match(/t=(\d*)/);
			if ( this.format == 1 ) {
				msg.payload = test[1]/1000;
			} else {
				msg.payload = (test[1]/1000 - 32) * (5/9) ;
			}	
		} 
		// Read the sensor and update message
		node.send(msg);
        });
    }
    RED.nodes.registerType("1-Wire",Wirenode);
}
