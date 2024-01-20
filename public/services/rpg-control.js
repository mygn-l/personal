const rpg_control_service = {};

rpg_control_service.active_keys = { w: false, a: false, s: false, d: false, space: false };
rpg_control_service.mouse_position = { x: 0, y: 0 };

rpg_control_service.start_perpetual_key = function (handler) {
  window.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "w":
        rpg_control_service.active_keys.w = true;
        break;
      case "a":
        rpg_control_service.active_keys.a = true;
        break;
      case "s":
        rpg_control_service.active_keys.s = true;
        break;
      case "d":
        rpg_control_service.active_keys.d = true;
        break;
      case " ":
        rpg_control_service.active_keys.space = true;
        break;
    }
  });

  window.addEventListener("keyup", function (e) {
    switch (e.key) {
      case "w":
        rpg_control_service.active_keys.w = false;
        break;
      case "a":
        rpg_control_service.active_keys.a = false;
        break;
      case "s":
        rpg_control_service.active_keys.s = false;
        break;
      case "d":
        rpg_control_service.active_keys.d = false;
        break;
      case " ":
        rpg_control_service.active_keys.space = false;
        break;
    }
  });

  document.body.addEventListener("click", async function () {
    await document.body.requestPointerLock({
      unadjustedMovement: true,
    });
  });

  document.addEventListener("mousemove", function (e) {
    if (document.pointerLockElement === document.body) {
      rpg_control_service.mouse_position.x -= e.movementX / 300;
      rpg_control_service.mouse_position.y -= e.movementY / 300;
    }
    if (rpg_control_service.mouse_position.y > Math.PI / 3) {
      rpg_control_service.mouse_position.y = Math.PI / 3;
    }
    if (rpg_control_service.mouse_position.y < -Math.PI / 3) {
      rpg_control_service.mouse_position.y = -Math.PI / 3;
    }
  });

  let perpetual = function () {
    handler(rpg_control_service.active_keys, rpg_control_service.mouse_position);

    requestAnimationFrame(perpetual);
  };
  perpetual();
};

export default rpg_control_service;
