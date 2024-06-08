# Bright Lin's personal website

## Technologies used

- Express.js
- Socket.io
- EJS
- Redis
- MongoDB
- Three.js
- Ammo.js

## Run the project

CD into the directory and `node app.js` should be enough. Then, go to "http://localhost".

## Note to myself

Install Homebrew. Install Node using Homebrew. NPM is automatically installed. Install MongoDB community edition using Homebrew. Install Redis using Homebrew. Create a "data" folder. Inside, create a "db" folder.

Run the following commands :
1. `mongod --dbpath /Users/euphrasycosette/data/db --port 27017` (replace with your own path)
2. `mongosh`
3. `redis-server`
4. `node app.js`

Download MongoDB Compass if you want to inspect the database.
