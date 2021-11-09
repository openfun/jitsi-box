# Desc
This is just a little node server faking the marsha backend for development.

# Setup
The `app.js` file sets a node server, listening for a post on route `/login`.

The body of the request must contain a `code` key, with a string value.

Response will be `200 Success`
```json
{
    success: true,
    link: 'link.defined.in.env',
}
```
if code is `111111`, else the response will be `404 Error`
```json
{
    success: false,
    link: undefined,
}
```