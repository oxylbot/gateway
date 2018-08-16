# Websocket Opcodes

Each websocket payload has the `op` field with the opcode of the payload. The following is a table of the codes, their names, client action, and their descriptions.

## Opcodes

| Code | Name | Client Action | Description |
|---|---|---|---|
| 0 | identify | send | used for [identifying](identify.md) a microservice |
| 1 | heartbeat | send/recieve | used for checking ping |
| 2 | event | recieve | dispatches an event |
| 3 | hello | recieve | sends heartbeat interval |
| 4 | heartbeat acknowledgement | recieve | tells the client the server recieved the heartbeat |