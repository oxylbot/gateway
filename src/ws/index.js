const WebSocket = require("ws");
const wss = new WebSocket.Server({
	port: 3282
});

module.exports = async r => {
	wss.r = r;
};
