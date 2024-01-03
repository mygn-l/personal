import url from "url";
import path from "path";
import http from "http";

import mongoose from "mongoose";
import express_session from "express-session";
import redis from "redis";
import Redis_store from "connect-redis";
import express from "express";
import helmet from "helmet";
import nocache from "nocache";
import compression from "compression";
import cors from "cors";
import favicon from "serve-favicon";
import { Server as Socket_server } from "socket.io";

import log from "./lib/logger.js";
import router from "./api/express/index.js";
import socket_init from "./api/socket/index.js";
import db_config from "./config/db.js";
import session_config from "./config/session.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

mongoose.connect(db_config, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
  log("Database", "connected");
});

const redis_client = redis.createClient({
  host: "localhost",
  port: 6379,
});
(async function () {
  await redis_client.connect();
})();
redis_client.on("connect", function () {
  log("Redis", "connected");
});
const redis_store = new Redis_store({ client: redis_client });
const session = express_session({
  store: redis_store,
  secret: session_config,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: false,
    sameSite: true,
    maxAge: 3600000,
  },
});

const app = express();
app.set("view engine", "ejs");
app.set("trust proxy", true);
app.use(helmet());
app.use(cors());
app.use(
  express.json({
    limit: "100mb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(nocache());
app.use(session);
app.use(compression());
app.use(favicon(path.join(__dirname, "public/images/favicon.png")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/three.js", function (req, res) {
  res.sendFile(path.join(__dirname, "node_modules/three/build/three.module.min.js"));
});
app.get("/socket.io", function (req, res) {
  res.sendFile(path.join(__dirname, "node_modules/socket.io/client-dist/socket.io.esm.min.js"));
});
app.use(router);

const server = http.createServer(app);
server.listen(process.env.PORT || 80, function () {
  log("Server", "listening");
});

const io = new Socket_server(server);
socket_init(io, session, function () {
  log("Socket", "listening");
});
