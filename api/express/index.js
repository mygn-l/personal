import express from "express";

import pages from "./routes/pages.js"

const router = express.Router();

router.use(pages);

export default router;
