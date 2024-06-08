"use strict";

import Eng from "/public/lib/eng.js";

const meshes = [];

const GET_MESH = function (action, handler) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", action, false);
  xhr.send();
  if (xhr.status === 200) {
    handler(xhr.responseText);
  }
};

GET_MESH("/public/3d-objects/dinosar.obj", function (responseText) {
  let mesh = Eng.ParseMesh(responseText);
  mesh.id = 0;
  meshes.push(mesh);
});

const renderer = new Eng.Renderer();
renderer.appendCanvas(document.getElementById("body-container"));

const scene = new Eng.Scene();
const camera = new Eng.Camera(new Eng.Vector([0, 0, 0]), new Eng.Vector([0, 0, 0]), 1, 3.5, 1000, 0.1);

for (let mesh of meshes) {
  scene.addMesh(mesh);
}

const light = new Eng.DirectionalLight(new Eng.Vector([0, -1, -1]));
scene.addLight(light);

const activeKeys = {
  a: false,
  w: false,
  d: false,
  s: false,
  q: false,
  e: false,
};

window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "a":
      activeKeys.a = true;
      break;
    case "w":
      activeKeys.w = true;
      break;
    case "d":
      activeKeys.d = true;
      break;
    case "s":
      activeKeys.s = true;
      break;
    case "q":
      activeKeys.q = true;
      break;
    case "e":
      activeKeys.e = true;
      break;
  }
});

window.addEventListener("keyup", function (e) {
  switch (e.key) {
    case "a":
      activeKeys.a = false;
      break;
    case "w":
      activeKeys.w = false;
      break;
    case "d":
      activeKeys.d = false;
      break;
    case "s":
      activeKeys.s = false;
      break;
    case "q":
      activeKeys.q = false;
      break;
    case "e":
      activeKeys.e = false;
      break;
  }
});

const loop = function () {
  if (activeKeys.a === true) {
    camera.translate(new Eng.Vector([1, 0, 0]));
  }
  if (activeKeys.w === true) {
    camera.translate(new Eng.Vector([0, 0, -1]));
  }
  if (activeKeys.d === true) {
    camera.translate(new Eng.Vector([-1, 0, 0]));
  }
  if (activeKeys.s === true) {
    camera.translate(new Eng.Vector([0, 0, 1]));
  }
  if (activeKeys.q === true) {
    camera.rotate(new Eng.Vector([0, -0.1, 0]));
  }
  if (activeKeys.e === true) {
    camera.rotate(new Eng.Vector([0, 0.1, 0]));
  }

  renderer.render(scene, camera);

  requestAnimationFrame(loop);
};

loop();
