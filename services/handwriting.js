import path from "path";
import url from "url";

import { Vector } from "../lib/deep-learning/lin-alg.js";
import Neural_network from "../lib/deep-learning/network.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const json_path = path.join(__dirname, "../lib/deep-learning/stored.json");

const input_size = 100;

const handwriting_service = {};

const network = new Neural_network(Neural_network.sigmoid, [input_size, 50, 20, 10]);
//network.read_file(json_path);
//network.write_file(json_path);

handwriting_service.input_size = input_size;

handwriting_service.get_number = function (layer1) {
  let inputs = new Vector(...layer1);

  let outputs = network.run(inputs);

  let digit = outputs.components.indexOf(Math.max(...outputs.components));

  console.log("Output number : " + digit);

  return digit;
};

handwriting_service.correct_number = function (digit, layer1) {
  let inputs = new Vector(...layer1);

  let desired_outputs = new Vector(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  desired_outputs.components[digit] = 1;

  network.train(inputs, desired_outputs, 1);

  //network.write_file(json_path);

  console.log("Corrected number : " + digit);
};

export default handwriting_service;
