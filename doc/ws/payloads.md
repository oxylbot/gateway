# Websocket Payloads

All websocket payloads are encoded with JSON and have an option of being compressed (see [identifying](identify.md)). Each payload follows a predictable structure:

## Structure

| Field | Type | Description |
| op | integer | [opcode](opcodes.md) of the payload |
| d | array or object | data from the event |
| t | string? | event name, only present for opcode 2 (event) |

# Sending a Payload

Payloads sent to the Websocket API must also follow the payload structure with a proper opcode and data. The data must be JSON, even if the websocket is sending compressed data.

# Recieving a Payload

The gateway has an option to compress payloads in the `identify` payload. If enabled, the client _must_ identify if the payload is compressed and decompress the payload before attempting to parse it. Payloads sent before identifying can not be compressed.

# Hello Payload

After connecting, the client should recieve a opcode 3 hello payload. This will have the client's heartbeat interval:

```json
{
	"heartbeatInterval": 30000 
}
```

# Heartbeats

The client should begin to send a opcode 1 heartbeat payload every `heartbeatInterval` milliseconds, until the connection is closed or terminated. The websocket may also request a heartbeat, so you should send a heartbeat back to the gateway if you recieve a request for one as well.


After sending a heartbeat payload, the server will immediately respond with a opcode 4 heartbeat acknowledgement payload (no data). This will allow a client to identify their latency to the websocket, as well as failed connections.

# Events

The websocket will send an opcode 2 event payload for events. The `t` field of the payload will be the constant event name, and the `d` field will be populated with the data from the event (below table)

| Constant Name | Name | Description |
|---|---|---|
| EXECUTE_COMMAND | Execute Command | execute a command on a commands service |

## Event Data

### Execute Command

Sends a payload to the commands service to parse the raw command arguments and execute it.

| Field | Type | Description |
|---|---|---|
| command | string | the command attempted to be executed (may not exist) |
| raw | string | everything in the message after the command, including flags and quoted arguments |
| ids | object | object full of discord id's to allow the commands worker to send api requests as necessary using the data from the event |
| ids.message | string | id of message sent |
| ids.author | string | id of the message's author |
| ids.channel | string | id of the message's channel |
| ids.guild | string | id of the channel's guild |
| ids.shard | string | id of guild's shard |


```json
{
	"command": "ban",
	"raw": "minemidnight#0001 spamming -t 5h",
	"ids": {
		"message": "479455578708639755",
		"author": "155112606661607425",
		"channel": "254770965018443776",
		"guild": "254768930223161344",
		"shard": 1
	}
}
```