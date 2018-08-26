const config = require("../config");
const superagent = require("superagent");

let shardCount = 0;
let unusedShards = [];
const usedShards = [];

module.exports = {
	return(shards) {
		shards.forEach(shard => {
			unusedShards.push(shard);
			usedShards.splice(usedShards.indexOf(shard), 1);
		});
	},
	next() {
		const next = unusedShards.splice(0, Math.ceil(shardCount / config.sharders));
		usedShards.push(...next);

		return next;
	}
};

async function getShards() {
	const { body } = await superagent.get("https://discordapp.com/api/gateway/bot")
		.set("Authorization", `Bot ${config.token}`);

	shardCount = body.shards;
	unusedShards = Array.from({
		length: shardCount
	}, (val, i) => i);
}

getShards();
