import express from "express";

import handwriting_service from "../../../services/handwriting.js";

const input_size = handwriting_service.input_size;

const router = express.Router();

router.get("/handwriting/input-size", async function (req, res) {
  res.send({ input_size: input_size });
});

router.post("/handwriting/compute", async function (req, res) {
  let layer1 = req.body.layer1;
  if (layer1) {
    if (Array.isArray(layer1)) {
      if (layer1.length === input_size) {
        for (let i = 0; i < layer1.length; i++) {
          if (typeof layer1[i] !== "number") {
            return;
          } else if (layer1[i] < 0 || layer1[i] > 1) {
            return;
          }
        }

        let number = handwriting_service.get_number(layer1);
        res.send({ number: number });
      }
    }
  }
});

router.post("/handwriting/correct", async function (req, res) {
  let layer1 = req.body.layer1;
  if (layer1) {
    if (Array.isArray(layer1)) {
      if (layer1.length === input_size) {
        for (let i = 0; i < layer1.length; i++) {
          if (typeof layer1[i] !== "number") {
            return;
          } else if (layer1[i] < 0 || layer1[i] > 1) {
            return;
          }
        }

        let correct_number = req.body.number;
        if (typeof correct_number === "string") {
          correct_number = parseInt(correct_number);
        }
        if (typeof correct_number === "number") {
          if (Number.isInteger(correct_number)) {
            if (correct_number >= 0 && correct_number <= 9) {
              handwriting_service.correct_number(req.body.number, req.body.layer1);
            }
          }
        }
      }
    }
  }
});

export default router;
