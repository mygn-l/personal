import { io } from "/socket.io";

const GET = async function (path, handler) {
  let response = await fetch(path);
  return handler(response);
};

const POST = async function (path, body, handler) {
  let response = await fetch(path, {
    body: body,
  });
  return handler(response);
};

const Router = class {
  get(path, handler) {
    GET(path, handler);
  }
  post(path, body, handler) {
    POST(path, body, handler);
  }
};

const Socket = class {
  constructor() {
    this.socket = io();
  }
  emit(path, data) {
    this.socket.emit(path, data);
  }
  on(path, handler) {
    this.socket.on(path, handler);
  }
};

const event = function (obj) {
  obj.events = {};

  obj.on = function (path, handler) {
    obj.events[path] = handler;
  };

  obj.emit = function (path, data) {
    obj.events[path](data);
  };
};

export { GET, POST, Router, Socket, event };
