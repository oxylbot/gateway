# GET /discord/guilds/{guild.id}

Returns a guild object if it exists, otherwise 404.

# DELETE /discord/guilds/{guild.id}

Deletes a guild object (and its counterparts such as roles, channels, members and voice states) from the cache. Returns a 204 with no content on success, otherwise a 404.

# GET /discord/guilds/{guild.id}/channels

Returns an array of channel objects in a guild if it exists, otherwise 404.

# GET /discord/guilds/{guild.id}/channels/{channel.id}

Returns a channel object in a guild if the channel exists, otherwise 404.

# DELETE /discord/guilds/{guild.id}/channels/{channel.id}

Deletes a channel object from the cache if it exists. Returns a 204 with no content on success, otherwise a 404.

# GET /discord/guilds/{guild.id}/members/{member.id}

Returns a member object if it exists, otherwise a 404.

# DELETE /discord/guilds/{guild.id}/members/{member.id}

Deletes a member object from the cache if they exist. Returns a 204 with no content on success, otherwise a 404.

# GET /discord/guilds/{guild.id}/roles

Returns an array of role objects if the guild exists, otherwise 404.

# GET /discord/guilds/{guild.id}/roles/{role.id}

Returns a role object if it exists, otherwise a 404.

# DELETE /discord/guilds/{guild.id}/roles/{role.id}

Deletes a role object from the cache if it exists. Returns a 204 with no content on success, otherwise a 404.

# GET /discord/users

Returns the amount of users cached.

Example body:
```json
{ "users": 582313 }
```

# GET /discord/users/{user.id}

Returns a user object if they exist, otherwise a 404.