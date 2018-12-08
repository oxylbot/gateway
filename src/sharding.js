const shardCount = 0;
const sharderCount = 0;
const unusedShards = [];
const usedShards = [];

module.exports = {
	return(shards) {
		shards.forEach(shard => {
			unusedShards.push(shard);
			usedShards.splice(usedShards.indexOf(shard), 1);
		});
	},
	next() {
		// TODO: get shardCount and amount of sharders automatically
		const next = unusedShards.splice(0, Math.ceil(shardCount / sharderCount));
		usedShards.push(...next);

		return next;
	}
};

