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

router.get("/rpg", async function (req, res) {
  res.render("pages/rpg.ejs");
});

router.get("/3d-eng", async function (req, res) {
  res.render("pages/3d-eng.ejs");
});

router.get("/handwriting", async function (req, res) {
  res.render("pages/handwriting.ejs");
});

router.get("/chess", async function (req, res) {
  res.render("pages/chess.ejs");
});

router.get("/calculator", async function (req, res) {
  res.render("pages/calculator.ejs");
});

router.get("/about", async function (req, res) {
  res.render("pages/about.ejs");
});

router.get("/writing", async function (req, res) {
  res.render("pages/writing.ejs");
});

router.get("/writing/:worktitle", async function (req, res, next) {
  if (/^[a-zA-Z\-]+$/.test(req.params.worktitle)) {
    res.render("pages/pdf-viewer.ejs", {
      file_name: req.params.worktitle,
      work_name: req.params.worktitle.replaceAll(/-/g, " "),
    });
  } else {
    next();
  }
});

router.get("/blog", async function (req, res) {
  res.render("pages/blog.ejs");
});

router.get("/blog/education", async function (req, res, next) {
  res.render("pages/blog/education.ejs");
});

router.get("/hidden-fitness", async function (req, res) {
  res.render("pages/fitness.ejs");
});

router.get("/hidden-cv", async function (req, res) {
  res.render("pages/cv.ejs");
});

router.get("*", async function (req, res) {
  res.render("pages/error.ejs");
});

/*
router.get("/", async function (req, res) {
  res.render("pages/point-cloud.ejs");
});
router.get("/point-cloud", async function (req, res) {
  res.render("pages/point-cloud.ejs");
});
*/

export default router;
