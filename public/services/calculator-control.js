const calculator_control = {};

calculator_control.on_button_click = function (handler) {
  const button = document.getElementById("expression-button");
  const input = document.getElementById("expression-input");
  button.addEventListener("click", function () {
    handler(input.value);
  });
};

calculator_control.display_answer = function (answer) {
  const answer_p = document.getElementById("answer");
  answer_p.innerHTML = answer;
};

export default calculator_control;
