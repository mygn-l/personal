import * as THREE from "/three.js";

let players = [];
let self_username = "";
let self_player = {
  username: "",
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  rotation: {
    y: 0,
    elevation: 0,
  },
};

const rpg_render_service = {};

rpg_render_service.start_perpetual_get_world = function (handler) {
  let perpetual = function () {
    handler();
    requestAnimationFrame(perpetual);
  };
  perpetual();
};

rpg_render_service.update_world = function (data) {
  self_username = data.self_username;
  players = data.players;

  //remove self from render, already
  for (let i = 0; i < players.length; i++) {
    if (players[i].username === self_username) {
      self_player = players.slice(i, i + 1)[0];
      break;
    }
  }
};

rpg_render_service.update_camera_rotation = function (mouse_position) {
  self_player.rotation.y = mouse_position.x;
  self_player.rotation.elevation = mouse_position.y;
};

rpg_render_service.start_perpetual_render = function () {
  //scene
  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbfd1e5);

  //self_player camera
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(self_player.position.x, self_player.position.y, self_player.position.z);
  camera.rotation.set(self_player.rotation.elevation, self_player.rotation.y, 0, "YXZ");

  //lighting
  let dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.color.setHSL(0.1, 1, 0.95);
  dirLight.position.set(-1, 1.75, 1);
  dirLight.position.multiplyScalar(100);
  scene.add(dirLight);

  let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
  hemiLight.color.setHSL(0.6, 0.6, 0.6);
  hemiLight.groundColor.setHSL(0.1, 1, 0.4);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  //renderer setup
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("body-container").appendChild(renderer.domElement);

  //axis helper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //meshes
  let blockPlane = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshPhongMaterial({ color: 0xa0afa4 })
  );
  blockPlane.position.set(0, -2, 0);
  blockPlane.scale.set(50, 2, 50);
  scene.add(blockPlane);

  let perpetual = function () {
    camera.position.set(self_player.position.x, self_player.position.y, self_player.position.z);
    camera.rotation.set(self_player.rotation.elevation, self_player.rotation.y, 0, "YXZ");
    for (let player of players) {
      if (player.username === self_username) continue;
      let player_mesh = scene.getObjectByName(player.username);
      if (player_mesh) {
        player_mesh.position.set(player.position.x, player.position.y, player.position.z);
      } else {
        let ball = new THREE.Mesh(
          new THREE.SphereGeometry(1),
          new THREE.MeshPhongMaterial({ color: 0xff0505 })
        );
        ball.position.set(player.position.x, player.position.y, player.position.z);
        ball.name = player.username;
        scene.add(ball);
      }
    }

    renderer.render(scene, camera);

    requestAnimationFrame(perpetual);
  };
  perpetual();
};

export default rpg_render_service;
