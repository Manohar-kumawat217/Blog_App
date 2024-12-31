// here we describe our routes

const express = require("express");
const router = express.Router();
const blogPostController = require("../controller/blogPost.controller.js");
const { body } = require("express-validator");

// here we start creating our routes

// ham baad me iska logic controller me transfer kr dege tab ye ese dikhega
// router.get("/posts", postController.showAllPosts);

// create new post
router.post(
  "/post",
  [
    body("title")
      .isLength({ min: 3 })
      .withMessage("Title should be atleast 3 characters long"),
    body("content")
      .isLength({ min: 10 })
      .withMessage("Content should be atleast 10 characters long"),
    body("summary")
      .isLength({ min: 5 })
      .withMessage("Summary should be atleast 5 characters long"),
  ],
  blogPostController.createBlogPost
);

// Get all posts
router.get("/post", blogPostController.getAllBlogPost);
// get specific post
router.get("/post/:id", blogPostController.getOnePost);
// edit specific post
router.put("/post/:id", blogPostController.editBlogPost);
// delete a post
router.delete("/post/:id", blogPostController.deletePost);

//export the router
module.exports = router;
