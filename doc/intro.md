# Introduction

The following documentation is the outline of the websocket and REST API's for use with Oxyl's microservices, mainly for reference by developers interested in contributing to Oxyl / adding more microservices to Oxyl.

# REST Base URL

The base URL for all requests to the API (in production). All responses are encoded in JSON.

```
https://api.oxyl.website/
```

# Versioning

You must specify a version to use the REST API with, by appending it to the base URL as such: `https://api.oxyl.website/v{version number}`. You cannot omit the version number, otherwise you will get an error 400.

## Versions

| Version | Status    |
|---------|-----------|
| 1       | available |

# REST Authentication

All REST API requests must have an `Authorization` header with the secret api key (also used for [websocket identifying](ws/identify.md))

# REST Endpoints

See the [rest folder](/rest) for a list of all the endpoints and what they return.

# Websocket API

Oxyl's Websocket API allows for real-time communication of events and data. All microservices are required to be connected to the Websocket API before using the REST API.

# Websocket API Base URL

The base URL for all Websocket API connections (in production). All payloads are encoded using JSON. There is an option to compress payloads in the identify payload, in order to send zlib compressed payloads which the client must handle.

```
wss://api.oxyl.website/ws
```

# Versioning

You must specify a version to use the Websocket API with, by appending it to the base URL as such: `wss://api.oxyl.website/ws/v{version number}`. You cannot omit the version number, otherwise you will not be able to connect.

## Versions

| Version | Status    |
|---------|-----------|
| 1       | available |

# Using the Websocket API

See the websocket [payloads](ws/payloads.md) for more information about using the Websocket API.
