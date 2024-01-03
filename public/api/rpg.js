import { Socket } from "/public/lib/face.js";

import rpg_render_service from "/public/services/rpg-render.js";
import rpg_control_service from "/public/services/rpg-control.js";

const client_socket = new Socket();

client_socket.emit("create-player");

client_socket.on("player-get-world-response", function (data) {
  rpg_render_service.update_world(data);
});

rpg_render_service.start_perpetual_get_world(function () {
  client_socket.emit("player-get-world");
});

//handler function brings detected active_keys into the API to be emitted
rpg_control_service.start_perpetual_key(function (active_keys, mouse_position) {
  client_socket.emit("player-controls", {
    active_keys: active_keys,
    mouse_position: mouse_position,
  });
  rpg_render_service.update_camera_rotation(mouse_position);
});

rpg_render_service.start_perpetual_render();
