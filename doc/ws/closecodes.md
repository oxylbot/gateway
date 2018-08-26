# Websocket Close Codes

If the websocket encounters an error or needs to close for any reason, it will close with a code and description.

## Close Event Codes

| Code | Description | Explaination |
|---|---|---|
| 4000 | not identified | you tried to send a payload before [identifying](identify.md) |
| 4001 | authentication failed | you cannot connect to the websocket, your secret is wrong |
| 4002 | already authenticated | you sent a second identify payload |
| 4003 | unknown opcode | you sent an invalid [opcode](opcodes.md) |
| 4004 | invalid json | the payload could not be parsed properly |
| 4005 | invalid payload | the [payload](payloads.md#sending-a-payload) was invalid |
| 4006 | cant send | you sent an event payload that can't be sent from that type of microservice |
| 4007 | no heartbeat | the client hasn't sent a heartbeat in double the heartbeat interval |