const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        { model: User, attributes: ["name"] },
        { model: Comment, attributes: ["comment_body"] }
      ]
    });

    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

    res.render("homepage", {
      blogPosts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve blog posts." });
  }
});

router.get("/blogPost/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["name"] },
        { model: Comment, include: [User] }
      ]
    });

    if (!blogPostData) {
      return res.status(404).json({ error: "Blog post not found." });
    }

    const blogPost = blogPostData.get({ plain: true });

    res.render("blogPost", {
      ...blogPost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve blog post." });
  }
});

router.all("/login", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/dashboard");
  }

  res.render("login");
});

module.exports = router;