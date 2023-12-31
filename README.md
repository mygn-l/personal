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

Install Homebrew. Install Node using Homebrew. NPM is automatically installed. Install MongoDB community edition using Homebrew. Install Redis using Homebrew. Create a "data" folder. Inside, create a "db" folder.

Run the following commands :
1. `mongod --dbpath /Users/euphrasycosette/data/db --port 27017` (replace with your own path)
2. `mongosh`
3. `redis-server`
4. `node app.js`

Go to "http://localhost".
Download MongoDB Compass if you want to inspect the database.
