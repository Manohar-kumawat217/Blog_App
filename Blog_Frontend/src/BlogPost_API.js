import axios from "axios";

//creating a base url
const BlogPost_API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your backend url
});

// defining api route functions
export const fetchAllPosts = () => BlogPost_API.get("/blogs/post");
export const fetchPost = (id) => BlogPost_API.get(`/blogs/post/${id}`);
export const createPost = (blogPostData) =>
  BlogPost_API.post("/blogs/post", blogPostData);
export const updatePost = (id, blogPostData) =>
  BlogPost_API.put(`/blogs/post/${id}`, blogPostData);
export const deletePost = (id) => BlogPost_API.delete(`/blogs/post/${id}`);
