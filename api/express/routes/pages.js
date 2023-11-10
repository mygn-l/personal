import express from "express";

const router = express.Router();

router.get("/", async function (req, res) {
  res.render("pages/index.ejs");
});

router.get("/math-roadmap", async function (req, res) {
  res.render("pages/math-roadmap.ejs");
});

router.get("/science-roadmap", async function (req, res) {
  res.render("pages/science-roadmap.ejs");
});

router.get("/music", async function (req, res) {
  res.render("pages/music.ejs");
});

router.get("/code", async function (req, res) {
  res.render("pages/code.ejs");
});

router.get("/rpg", async function (req, res) {
  res.render("pages/rpg.ejs");
});

router.get("/about", async function (req, res) {
  res.render("pages/about.ejs");
});

router.get("/memory", async function (req, res) {
  res.render("pages/memory.ejs");
});

export default router;
