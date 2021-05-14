# Python One Time Secret API #

This API is modified version [python-ots-api](https://github.com/do-community/python-ots-api).

**Note: Redis UI can be installed using https://github.com/qishibo/AnotherRedisDesktopManager**


## API

### POST `/secrets`
Create a secret associated with a passphrase. Setting an experation time is 
optional.

*Parameters*

* `passphrase` (required) - The passphrase to access the secret.
* `message` (required) - The message to encrypt and store
* `expiration_time` - The amount of time in seconds before the secret expires.
Defaults to 604800 which is 1 week.

*Example*
```json
{
    "passphrase": "hello",
    "message": "Droplets are cool",
    "expiration_time": 100
}
```

`$ curl -X POST http://localhost:5000/secrets -d "@test-data.json" -H "Content-Type: application/json"`

*Returns 200*
```json
{
  "id": "0cc0f1cc5dd14e6fbfefa6d451543abd", 
  "success": "True"
}
```

*Returns 400*
```json
{
    "success": "False", 
    "message": "Missing passphrase and/or message"
}
```

### POST `/secrets/<ID_OF_MESSAGE>`
Retrieve the secret associated with an ID using a passphrase

*Parameters*

```json
{
    "passphrase": "hello",
}
```

*Example*

`curl -X POST http://localhost:5000/secrets/0cc0f1cc5dd14e6fbfefa6d451543abd -d "@test-data.json" -H "Content-Type: application/json"`

*Returns 200*
```json
{
    "success": "True",
    "message": "Droplets are cool"
}
```

*Returns 400*
```json
{
    "success": "False", 
    "message": "Missing passphrase"
}
```

*Returns 404*
```json
{
    "success": "False",
    "message": "This secret either never existed or it was already read",
}
```

## Deploying the App ##
