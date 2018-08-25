# GET /services/

Returns an array of all connected services, along with some statistics.

Each service has the fields `type`, `heapUsed` and `startTime` guaranteed. Some services also have extra data sent with them.

## Example Response

```json
[{
	"type": "sharder",
	"shards": [0, 1, 2],
	"maxShards": 18,
	"heapUsed": 102292113,
	"startTime": 1534383433045,
	"guilds": 3000
}, {
	"type": "commands",
	"heapUsed": 102292113,
	"startTime": 1534383433045
}, { ... }]
```

## Extra  Fields

| Type | Field | Information | Example |
|---|---|---|---|
| sharder | shards | an array of integers representing all shards the service is handling | [0, 1, 2] |
| sharder | maxShards | the total number of shards that are being ran across all shards | 18 |
| sharder | guilds | amount of guilds that the sharder is handling |
