## Guild Object

```json
{
	"id": "254768930223161344",
	"name": "Oxyl Support",
	"icon": "55f43c27e5b592a5e97047ac088e0cce",
	"ownerID": "155112606661607425",
	"region": "us-east",
	"memberCount": 2000
}
```

Notes:
* `icon` will be `null` if there is no icon set.

### Guild Icon URL's

`https://cdn.discordapp.com/icons/{guild.id}/{hash}.{format}`

Format can be `png`, `jpg`, `jpeg` or `webp`.

Optional `?size={size}` querystring with size being one of `16`, `32`, `64`, `128`, `256`, `512`, `1024`, `2048`.

## Member Object

```json
{
	"id": "155112606661607425",
	"guildID": "254768930223161344",
	"nickname": "jeff",
	"roles": ["254775500336005120", "269629626530136074", "279459162885193728"],
	"joinedAt": "2016-12-04T00:40:46.361Z"
}
```

Notes:
* `nickname` will be `null` if there is no icon set.

## Role Object

```json
{
	"id": "254775500336005120",
	"guildID": "254768930223161344",
	"name": "Moderator",
	"color": 1752220,
	"position": 11,
	"permissions": 2146958591
}
```

## User Object

```json
{
	"id": "155112606661607425",
	"username": "minemidnight",
	"discriminator": "0001",
	"avatar": "da7c5f27e760ffc71ebc7cce3bf681b6",
	"bot": false
}
```

Notes:
* `avatar` will be `null` if there is no avatar set.

### User Avatar URL's

`https://cdn.discordapp.com/avatars/{user.id}/{hash}.{format}`

Format can be `png`, `jpg`, `jpeg`, `webp`, or `gif`.

`gif` is only a valid format if the hash starts with `a_`.

If the user has no avatar set, the avatar URL is as follows:

`https://cdn.discordapp.com/embed/avatars/{user.discriminator % 5}.png`

`png` is the only available format for this.

Optional `?size={size}` querystring for either with size being one of `16`, `32`, `64`, `128`, `256`, `512`, `1024`, `2048`.

## Channel Object

```json
{
	"id": "254770965018443776",
	"guildID": "254768930223161344",
	"type": "text",
	"position": 1,
	"name": "general",
	"nsfw": false,
	"overwrites": [{
		"id": "155112606661607425",
		"type": "member",
		"allow": 2146958591,
		"deny": 0
	}],
	"userLimit": 4,
	"parentID": "360568066050097165"
}
```

Notes:
* List of all channel types: `text`, `dm`, `groupdm`, `voice`, `category`
* List of all overwrite types: `member`, `role`
* None of `overwrties`, `userLimit` and `parentID` are guaranteed to exist.

## Voice State Object

```json
{
	"guildID": "254768930223161344",
	"channelID": "293170404879761408",
	"userID": "155112606661607425",
	"deaf": false,
	"mute": false,
	"selfDeaf": false,
	"selfMute": false
}
```

