const handwriting_control = {};

handwriting_control.layer_1 = Array(100).fill(0);

handwriting_control.setup = function (input_size) {
  const row_number = parseInt(Math.sqrt(parseInt(input_size)));
  const canvas_width = 500;
  const row_width = canvas_width / row_number;

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let mouse_down = false;

  canvas.addEventListener("mousedown", function () {
    mouse_down = true;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    handwriting_control.layer_1 = Array(row_number ** 2).fill(0);
  });

  canvas.addEventListener("mousemove", function (e) {
    if (mouse_down === true) {
      let rect = canvas.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      ctx.fillRect(
        Math.floor(x / row_width) * row_width,
        Math.floor(y / row_width) * row_width,
        row_width,
        row_width
      );

      handwriting_control.layer_1[
        Math.floor(y / row_width) * row_number + Math.floor(x / row_width)
      ] = 1;
    }
  });

  canvas.addEventListener("mouseup", function () {
    mouse_down = false;
  });
};

handwriting_control.onmouseup = function (handler) {
  const canvas = document.getElementById("canvas");
  canvas.addEventListener("mouseup", function () {
    handler(handwriting_control.layer_1);
  });
};

handwriting_control.display_number = function (number) {
  const p = document.getElementById("number");
  p.innerHTML = String(number);
};

handwriting_control.oncorrection = function (handler) {
  const input = document.getElementById("correction-input");
  const button = document.getElementById("correction-button");

  button.addEventListener("click", function () {
    handler(handwriting_control.layer_1, input.value);
  });
};

export default handwriting_control;
