const init = function (io, session, callback) {
  io.on("connection", function (socket) {});

  callback();
};

export default init;
