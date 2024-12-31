// here we write our schema and model for blog post

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogPostSchema = Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title should be atleast 3 characters long"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    minlength: [10, "Content should be atleast 10 characters long"],
  },
  summary: {
    type: String,
    required: [true, "Summary is required"],
    minlength: [5, "Summary should be atleast 5 characters long"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// exporing the model
module.exports = mongoose.model("BlogPost", BlogPostSchema);
