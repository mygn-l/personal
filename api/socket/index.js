import log from "../../lib/logger.js";

import rpg_service from "../../services/rpg.js";

const init = function (io, session, callback) {
  io.engine.use(session);
  io.on("connection", function (socket) {
    let req = socket.request;

    socket.use(function (__, next) {
      req.session.reload(function (e) {
        if (e) {
          socket.disconnect();
        } else {
          next();
        }
      });
    });

    socket.on("create-player", function () {
      if (!rpg_service.player_exists(req.session.user.username)) {
        rpg_service.create_player(req.session.user.username);

        log(req.session.user.username, "connected");
      }
    });

    socket.on("player-controls", function (data) {
      if (
        rpg_service.player_exists(req.session.user.username) &&
        data.active_keys !== undefined &&
        data.mouse_position !== undefined
      ) {
        if (
          typeof data.mouse_position.x === "number" &&
          typeof data.mouse_position.y === "number"
        ) {
          rpg_service.player_controls(req.session.user.username, data);
        }
      }
    });

    socket.on("player-get-world", function () {
      if (rpg_service.player_exists(req.session.user.username)) {
        let data_back = rpg_service.player_get_world(req.session.user.username);
        socket.emit("player-get-world-response", data_back);
      }
    });

    socket.on("disconnect", function () {
      if (rpg_service.player_exists(req.session.user.username)) {
        rpg_service.delete_player(req.session.user.username);

        log(req.session.user.username, "disconnected");
      }
    });
  });

  callback();
};

export default init;
