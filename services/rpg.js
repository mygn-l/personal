import RAPIER from "@dimforge/rapier3d-compat/rapier.cjs.js";
//import RAPIER from "@dimforge/rapier3d/rapier.js";

import { Vector3 } from "../lib/vector.js";

const players = [];

let floor_handle;

const speed = 0.1;
const offset = 0.01;

const Player = class {
  constructor(username) {
    this.username = username;

    let rigid_body_desc = RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 1, 0).setLinvel(0, 0, 0);
    this.rigid_body = world.createRigidBody(rigid_body_desc);

    let collider_desc = RAPIER.ColliderDesc.capsule(0.5, 0.2);
    this.collider = world.createCollider(collider_desc, this.rigid_body);

    this.character_controller = world.createCharacterController(offset);

    this.velocityY = 0;
    this.desired_displacement = new Vector3(0, 0, 0);
    this.rotation = {
      y: 0,
      elevation: 0,
    };

    this.touching_ground = false;
  }
  update_velocity(delay) {
    this.velocityY += (delay / 1000) * -10;
    this.desired_displacement.y = (delay / 1000) * this.velocityY; //x, z already set, add y

    this.character_controller.computeColliderMovement(this.collider, this.desired_displacement);

    let corrected_displacement = this.character_controller.computedMovement();
    this.rigid_body.setLinvel(
      {
        x: corrected_displacement.x / (delay / 1000),
        y: corrected_displacement.y / (delay / 1000),
        z: corrected_displacement.z / (delay / 1000),
      },
      true
    );

    this.touching_ground = false;
    for (let i = 0; i < this.character_controller.numComputedCollisions(); i++) {
      let collision = this.character_controller.computedCollision(i);
      if (collision.collider.handle === floor_handle) {
        this.velocityY = 0;
        this.touching_ground = true;
      }
    }
    this.desired_displacement = new Vector3(0, 0, 0);
  }
  move_direction(angle_y) {
    //set x, z first
    this.desired_displacement = Vector3.polar_to_coord(
      this.rotation.y + Math.PI / 2 + angle_y,
      0,
      speed
    );
  }
  jump() {
    if (this.touching_ground) {
      this.velocityY = 5;
      this.touching_ground = false;
    }
  }
  set_rotation(y, elevation) {
    this.rotation.y = y;
    this.rotation.elevation = elevation;
  }
  get_info() {
    return {
      username: this.username,
      position: {
        x: this.rigid_body.translation().x,
        y: this.rigid_body.translation().y,
        z: this.rigid_body.translation().z,
      },
      rotation: {
        y: this.rotation.y,
        elevation: this.rotation.elevation,
      },
    };
  }
};

let world;

const start_perpetual_game = async function () {
  await RAPIER.init();

  const gravity = { x: 0, y: -20, z: 0 };
  world = new RAPIER.World(gravity);

  let ground_collider_desc = RAPIER.ColliderDesc.cuboid(50, 2, 50).setTranslation(0, -2, 0);
  let ground_collier = world.createCollider(ground_collider_desc);
  floor_handle = ground_collier.handle;

  let perpetual = function () {
    for (let player of players) {
      player.update_velocity(16);
    }

    world.step();

    setTimeout(perpetual, 16);
  };
  perpetual();
};
await start_perpetual_game();

const rpg_service = {};

rpg_service.player_exists = function (username) {
  let found_player = players.find(function (e) {
    return e.username === username;
  });
  return found_player !== undefined;
};

rpg_service.create_player = function (username) {
  players.push(new Player(username));
};

rpg_service.delete_player = function (username) {
  let player_index = players.findIndex(function (e) {
    return e.username === username;
  });
  world.removeRigidBody(players[player_index].rigid_body);
  players.splice(player_index, 1);
};

rpg_service.player_controls = function (username, controls) {
  let active_keys = controls.active_keys;
  let mouse_position = controls.mouse_position;

  let player =
    players[
      players.findIndex(function (e) {
        return e.username === username;
      })
    ];

  if (active_keys.w === true) {
    player.move_direction(0);
  }
  if (active_keys.a === true) {
    player.move_direction(Math.PI / 2);
  }
  if (active_keys.s === true) {
    player.move_direction(Math.PI);
  }
  if (active_keys.d === true) {
    player.move_direction(-Math.PI / 2);
  }
  if (active_keys.w === true && active_keys.a === true) {
    player.move_direction(Math.PI / 4);
  }
  if (active_keys.w === true && active_keys.d === true) {
    player.move_direction(-Math.PI / 4);
  }
  if (active_keys.s === true && active_keys.a === true) {
    player.move_direction((Math.PI * 3) / 4);
  }
  if (active_keys.s === true && active_keys.d === true) {
    player.move_direction((-Math.PI * 3) / 4);
  }
  if (active_keys.space === true) {
    player.jump();
  }
  player.set_rotation(mouse_position.x, mouse_position.y);
};

rpg_service.player_get_world = function (username) {
  let data_back = {
    self_username: username,
    players: [],
  };
  for (let player of players) {
    data_back.players.push(player.get_info());
  }
  return data_back;
};

export default rpg_service;
