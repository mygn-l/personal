import mongoose from "mongoose";
import express_session from "express-session";
//import redis from "redis";
//import connect_redis from "connect-redis";
import express from "express";
import helmet from "helmet";
import nocache from "nocache";
import compression from "compression";
import cors from "cors";
import favicon from "serve-favicon";
import url from "url";
import path from "path";
import vhost from "vhost";
import http from "http";
import { Server } from "socket.io";

import log from "./lib/logger.js";
import router from "./api/express/index.js";
import init from "./api/socket/index.js";
import db_config from "./config/db.js";
import session_config from "./config/session.js";
//import { rate_limiter } from "./api/express/mid/limiter.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/*
mongoose.connect(db_config, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
  log("Database", "connected");
});
*/


//const store = connect_redis(express_session);
//const client = redis.createClient();
const session = express_session({
  //store: new store({ client: client }),
  secret: session_config,
  resave: false,
  saveUninitialized: true,
  cookie: {
    //httpOnly: true,
    //secure: true,
    //sameSite: true,
  },
});


const app = express();
app.set("view engine", "ejs");
app.set("trust proxy", true);
//app.use(rate_limiter);
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
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(router);


const server = http.createServer(app);
server.listen(process.env.PORT || 80, function () {
  log("Server", "listening");
});


const io = new Server(server);
init(io, session);
log("Socket", "listening");

