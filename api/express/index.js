import express from "express";

import { Guest } from "../../entities/user.js";

import pages from "./routes/pages.js";
import handwriting from "./routes/handwriting.js";
import calculator from "./routes/calculator.js";

const router = express.Router();

/*
router.use(async function (req, res, next) {
  if (req.session.entity_created == undefined) {
    req.session.entity_created = true;
    req.session.user = new Guest();
  }

  next();
});
*/

router.use(handwriting);
//router.use(calculator);
router.use(pages);

export default router;
