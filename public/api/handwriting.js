import { Router } from "/public/lib/face.js";

import handwriting_control from "/public/services/handwriting-control.js";

const router = new Router();

router.get("/handwriting/input-size", function (res) {
  handwriting_control.setup(res.input_size);
});

handwriting_control.onmouseup(function (layer1) {
  router.post("/handwriting/compute", JSON.stringify({ layer1: layer1 }), function (res) {
    handwriting_control.display_number(res.number);
  });
});

handwriting_control.oncorrection(function (layer1, number) {
  router.post(
    "/handwriting/correct",
    JSON.stringify({ number: number, layer1: layer1 }),
    function (res) {}
  );
});
