// here we create services(basic function which are interact with database)

const BlogPost = require("../models/blogPost.model");

module.exports.createBlogPostInDb = async ({ title, content, summary }) => {
  //  create blog post in database

  // here we apply our check
  if (!title || !content || !summary) {
    throw new Error("All Fields are requiured");
  }

  // create blog in db
  const blogPost = await BlogPost.create({ title, content, summary });
  return blogPost;
};

module.exports.getAllBlogPost = async () => {
  //fetch all blog posts in db
  const allBlogPosts = BlogPost.find({});
  return allBlogPosts;
};

module.exports.getOneBlogPost = async ({ id }) => {
  // fetch single blog post in db
  const oneBlogPost = await BlogPost.findById(id);
  return oneBlogPost;
};

module.exports.updateBlogPost = async ({ id, title, content, summary }) => {
  // update selected blog post
  const updatedBlogPost = await BlogPost.findByIdAndUpdate(
    id,
    {
      title,
      content,
      summary,
    },
    { new: true }
  );
  return updatedBlogPost;
};

module.exports.deleteBlogPost = async ({ id }) => {
  // delete selected blog post
  const deletedBlogPost = await BlogPost.findByIdAndDelete(id);
  return deletedBlogPost;
};
