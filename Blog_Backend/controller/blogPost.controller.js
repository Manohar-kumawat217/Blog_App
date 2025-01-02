// this is controller module here we write logic of our controller

const { validationResult } = require("express-validator");
const blogPostService = require("../services/blogPost.Service");

module.exports.createBlogPost = async (req, res) => {
  //here we write our logic to create the post
  //check for error in request body
  const errors = validationResult(req);
  // if any error occured in request object
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, summary } = req.body;

  if (!title || !content || !summary) {
    res.status(400).json({ error: "All fields are require" });
  }
  try {
    const blogPost = await blogPostService.createBlogPostInDb({
      title,
      content,
      summary,
    });

    res.status(201).json({ blogPost });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getAllBlogPost = async (req, res) => {
  //here we write our logic to fetch all the post
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const allBlogPosts = await blogPostService.getAllBlogPost();
    res.status(200).json({ allBlogPosts });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getOnePost = async (req, res) => {
  //here we write our logic to fetch One the post

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const oneBlogPost = await blogPostService.getOneBlogPost({ id });
    res.status(200).json({ oneBlogPost });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.editBlogPost = async (req, res) => {
  //here we write our logic to edit the post
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // if request body contain any errors this section will be execute
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, content, summary } = req.body;

  try {
    const updatedBlogPost = await blogPostService.updateBlogPost({
      id,
      title,
      content,
      summary,
    });
    res.status(200).json({ updatedBlogPost });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deletePost = async (req, res) => {
  //here we write our logic to delete the post
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }

  const { id } = req.params;
  try {
    const deletedBlogPost = await blogPostService.deleteBlogPost({ id });

    if (!deletedBlogPost)
      return res.status(404).json({ error: "post not found" });

    res.status(200).json({ message: "Post deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
