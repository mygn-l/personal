import * as THREE from "three";
import { GLTFLoader } from "GLTFLoader";

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
  scene.background = new THREE.Color(0x000000);

  let loader = new GLTFLoader();

  loader.load("/public/3d-objects/fun_video_tv_red_bird_v2/output.gltf", function (gltf) {
    scene.add(gltf.scene);
  });

  //self_player camera
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(self_player.position.x, self_player.position.y, self_player.position.z);
  camera.rotation.set(self_player.rotation.elevation, self_player.rotation.y, 0, "YXZ");

  //lighting
  let dirLight = new THREE.DirectionalLight(0xffffff, 0.01);
  dirLight.color.setHSL(0.1, 1, 0.95);
  dirLight.position.set(-1, 1.75, 1);
  dirLight.position.multiplyScalar(100);
  scene.add(dirLight);

  let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.01);
  hemiLight.color.setHSL(0.6, 0.6, 0.6);
  hemiLight.groundColor.setHSL(0.1, 1, 0.4);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  let light_center = new THREE.PointLight(0xffffff, 50, 100);
  light_center.position.set(2, 3, 2);
  scene.add(light_center);

  let light1 = new THREE.PointLight(0xffffff, 50, 100);
  light1.position.set(23, 3, 23);
  scene.add(light1);

  let light2 = new THREE.PointLight(0xffffff, 50, 100);
  light2.position.set(-23, 3, 23);
  scene.add(light2);

  let light3 = new THREE.PointLight(0xffffff, 50, 100);
  light3.position.set(-23, 3, -23);
  scene.add(light3);

  let light4 = new THREE.PointLight(0xffffff, 50, 100);
  light4.position.set(23, 3, -23);
  scene.add(light4);

  //renderer setup
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("body-container").appendChild(renderer.domElement);

  //meshes
  let blockPlane = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshPhongMaterial({ color: 0xa0afa4 })
  );
  blockPlane.position.set(0, -2, 0);
  blockPlane.scale.set(50, 2, 50);
  scene.add(blockPlane);

  let pilar_corner_1 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshPhongMaterial({ color: 0xa0afa4 })
  );
  pilar_corner_1.position.set(25, 0, 25);
  pilar_corner_1.scale.set(1, 2, 1);
  scene.add(pilar_corner_1);

  let pilar_corner_2 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshPhongMaterial({ color: 0xa0afa4 })
  );
  pilar_corner_2.position.set(-25, 0, 25);
  pilar_corner_2.scale.set(1, 2, 1);
  scene.add(pilar_corner_2);

  let pilar_corner_3 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshPhongMaterial({ color: 0xa0afa4 })
  );
  pilar_corner_3.position.set(-25, 0, -25);
  pilar_corner_3.scale.set(1, 2, 1);
  scene.add(pilar_corner_3);

  let pilar_corner_4 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshPhongMaterial({ color: 0xa0afa4 })
  );
  pilar_corner_4.position.set(25, 0, -25);
  pilar_corner_4.scale.set(1, 2, 1);
  scene.add(pilar_corner_4);

  let pilar_center = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshPhongMaterial({ color: 0xa0afa4 })
  );
  pilar_center.position.set(2, -0.5, 2);
  pilar_center.scale.set(1, 0.5, 1);
  scene.add(pilar_center);

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
