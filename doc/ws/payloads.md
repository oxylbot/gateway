# Websocket Payloads

All websocket payloads are encoded with JSON and have an option of being compressed (see [identifying](identify.md)). Each payload follows a predictable structure:

## Structure

| Field | Type | Description |
|---|---|---|
| op | integer | [opcode](opcodes.md) of the payload |
| d | array or object | data from the event |
| t | string? | event name, only present for opcode 2 (event) |

# Sending a Payload

Payloads sent to the Websocket API must also follow the payload structure with a proper opcode and data. The data must be JSON, even if the websocket is sending compressed data.

# Recieving a Payload

The gateway has an option to compress payloads in the `identify` payload. If enabled, the client _must_ identify if the payload is compressed and decompress the payload before attempting to parse it. Payloads sent before identifying are not compressed.

# Hello Payload Data

After connecting, the client should recieve a opcode 3 hello payload. This will have the client's heartbeat interval.

```json
{
	"heartbeatInterval": 30000
}
```

# Heartbeats

The client should begin to send a opcode 1 heartbeat payload every `heartbeatInterval` milliseconds, until the connection is closed or terminated. The websocket may also request a heartbeat, so you should send a heartbeat back to the gateway if you recieve a request for one as well. This heartbeat should also contain data about the service.

After sending a heartbeat payload, the server will immediately respond with a opcode 4 heartbeat acknowledgement payload (no data). This will allow a client to identify their latency to the websocket, as well as failed connections.


### Example Heartbeat Data (Sending)
```json
{
	"heapUsed": 102292113
}
```

Certain services will require extra data fields to be sent:
| Service | Field | Description | Example |
|---|---|---|---|
| sharder | guilds | amount of guilds the sharder is handling | 3000 |

# Caching

The websocket will cache data to be then used by the REST portion of the API. Each payload should have the `type` field with one of the following valid cache types: `member, role, user, guild, channel, voiceState`. To see what each type must include, see below.

### Member

| Field | Type | Description |
|---|---|---|
| id | string | id of the member |
| guildID | string | id of the guild the member is from |
| nickname | string? | nickname of member in the guild, or null |
| roles | string[] | ids of the roles the member has |
| joinedAt | ISO8601 timestamp | when the user joined the guild |
| user | user | the user that the member represents

### Role

| Field | Type | Description |
|---|---|---|
| id | string | id of the role |
| guildID | string | id of guild the role belongs to |
| name | string | name of the role |
| color | integer | integer representation of hexadecimal color code |
| position | integer | position of this role |
| permissions | integer | permission bit set |

### User

| Field | Type | Description |
|---|---|---|
| id | string | id of the user |
| username | string | user's username |
| discriminator | string | 4 digit discriminator |
| avatar | string? | user avatar hash or null |
| bot | boolean | whether or not the user is a bot |

### Guild

| Field | Type | Description |
|---|---|---|
| id | string | id of the guild |
| name | string | guild name |
| icon | string? | guild icon hash or null |
| ownerID | string | owner id of the guild |
| region | string | voice region for the guild |
| roles | role[] | array of role objects | 
| memberCount | integer | number of members in the guild |
| members? | member[] | array of members in the guild |
| voiceStates? | voice state[] | array of voice states |
| channels? | channel[] | array of channels in the guild |

### Channel

| Field | Type | Description |
|---|---|---|
| id | string | id of the role |
| guildID | string | id of guild the channel belongs to |
| type | integer | type of channel |
| position | integer | position of the channel |
| name | string | channel name |
| nsfw | boolean | whether or not the channel is nsfw |
| overwrites? | overwrite[] | overwrites of channel |
| userLimit? | integer | user limit (for voice channels) |
| parentID? | string | id of parent category or null |

### Overwrite

| Field | Type | Description |
|---|---|---|
| id | string | role or user id |
| type | string | "role" or "member" |
| allow | integer | permission bit set |
| deny | integer | permission bit set |

### Voice State

| Field | Type | Description |
|---|---|---|
| guildID | string | id of guild the voice state belongs to |
| channelID | string | id of the channel this voice state is for |
| userID | string | user id corresponding to this voice state |
| deaf | boolean | if the user is deafened (by server) |
| mute | boolean | if the user is muted (by server) |
| selfDeaf | boolean | if the user deafened himself |
| selfMute | boolean | if the user muted himself |
 
# Events

The websocket will send an opcode 2 event payload for events. The `t` field of the payload will be the constant event name, and the `d` field will be populated with the data from the event. The `from` and `to` headings of this table describe where the event cant be sent from and where the event can be recieved. Attempting to send an event from a microservice that cannot send that event will [close the connection](closecodes.md).

| Constant Name | Name | From | To | Description |
|---|---|---|---|---|
| EXECUTE_COMMAND | Execute Command | sharder | commands | execute a command on a commands service |
| IDENTIFIED | Identified | none | all | after identifying successfully |

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
| ids.shard | integer | id of guild's shard |

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

### Identified

| Service Type | Field | Description | Example |
|---|---|---|---|
| sharder | shards | what shards the sharder should run | [0, 1, 2] |

```json
{
	"shards": [0, 1, 2]
}
```