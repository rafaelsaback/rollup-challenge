# Rollup Code Challenge

This is a prototype for a collaboration tool meant to be used for managing key/value pairs
split between documents across a workspace.

Websocket communication is leveraged to keep all clients informed about the latest
changes in a given workspace. However, no persistence mechanism is present at the
moment, meaning that clients that open the workspace will only see the changes
made after they've opened the given workspace.

![alt text](https://github.com/rafaelsaback/rollup-challenge/blob/master/app.png?raw=true)

## Running the code

1. Go to the `server` folder, run `npm install` and then `npm run start-server`
2. Go to the `client` folder, run `npm install` and then `npm start`
3. Open the link [http://localhost:3000/?workspaceId=123](http://localhost:3000/?workspaceId=123) on your browser.
Feel free to change the query param `workspaceId`.

## Testing the app

1. Open the link mentioned in the previous section in two separate windows
(e.g. put them side-by-side). 
2. Changes made in one window should be reflected in the other window. For example:
   1. Add a new document
   2. Change the document's name
   3. Add multiple key/value pairs
   4. Change the values for a key/value pair
   5. Move a key/value pair up/down using the arrow keys
   6. Delete a key/value pair
   7. Delete the document
