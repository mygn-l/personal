import express from "express";

const router = express.Router();

router.get("/", async function (req, res) {
  res.render("pages/index.ejs");
});

router.get("/math", async function (req, res) {
  res.render("pages/math.ejs");
});

router.get("/tech", async function (req, res) {
  res.render("pages/tech.ejs");
});

router.get("/music", async function (req, res) {
  res.render("pages/music.ejs");
});

/*
router.get("/rpg", async function (req, res) {
  res.render("pages/rpg.ejs");
});
*/

router.get("/about", async function (req, res) {
  res.render("pages/about.ejs");
});

router.get("/memory", async function (req, res) {
  res.render("pages/memory.ejs");
});

router.get("*", async function (req, res) {
  res.render("pages/error.ejs");
});

export default router;
