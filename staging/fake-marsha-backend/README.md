# Desc
This is just a little node server faking the marsha backend for development.

# Env
Create a `.env` file and add a `LINK` and a `PORT` entry to it (do not set port to 3000, it is usually used by the frontend):
```env
PORT=3001
LINK=https://your.jitsi.meet.com/yourRoom
```

# Setup
The `app.js` file sets a node server, listening for a post on route `/marsha/login`.

The body of the request must contain a `code` key, with a string value.

If code is `111111`, response will be `200 Success`
```javascript
{
    "success": true,
    "link": "link.defined.in.env"
}
```
else the response will be `404 Error`
```javascript
{
    "success": false,
    "link": null
}
```

# Dockerfile
Starting with the official Node alpine image, we add the package file, install the dependencies, copy the files and launch the node server.

# Launching without docker
To start the server, you can use the command `node app.js`
