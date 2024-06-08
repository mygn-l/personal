import { Router } from "/public/lib/face.js";

import calculator_control from "/public/services/calculator-control.js";

const router = new Router();

calculator_control.on_button_click(function (expression) {
  router.post("/calculator/compute", JSON.stringify({ expression: expression }), function (res) {
    calculator_control.display_answer(res.answer);

    console.log("Sent");
  });
});
