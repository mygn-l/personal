import express from "express";

import calculator_service from "../../../services/calculator.js";

const router = express.Router();

router.post("/calculator/compute", async function (req, res) {
  let answer = calculator_service.compute(req.body.expression);
  res.send({ answer: answer });
});

export default router;
