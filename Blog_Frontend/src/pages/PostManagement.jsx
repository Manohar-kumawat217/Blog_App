import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchAllPosts, deletePost } from "../BlogPost_API";

export default function PostManagement() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // fetch all blog posts form backend
  const getAllBlogPosts = async () => {
    try {
      const response = await fetchAllPosts();
      console.log(response.data.allBlogPosts);
      setPosts(response.data.allBlogPosts); //setting the posts
    } catch (error) {
      console.log("Error while fetching posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogPosts();
  }, []);

  // delete post method
  const handleDelete = async (id) => {
    // ask from user to delete or not
    if (window.confirm("are you sure want to delete this post")) {
      try {
        await deletePost(id);
        alert("Post deleted Successfully");
        getAllBlogPosts();
      } catch (error) {
        console.log("Error while deleting post", error);
        alert("Failed to delete post. Please try again later");
      }
    }
  };

  //handling edit post method
  const handleEdit = (id) => {
    navigate(`/post/edit/${id}`);
  };

  //check if loading
  if (loading) {
    return (
      <div className="text-2xl font-bold text-center m-4">Loading Posts...</div>
    );
  }
  // check if post not exists
  if (posts.length === 0) {
    return (
      <>
        <div className="m-4 px-4 py-2 flex">
          <Link to="/" className="bg-black text-white py-2 px-4 m-4 ml-0">
            Back
          </Link>
          <div className="text-2xl font-bold text-center m-4">
            No posts available
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Hello</h1>
      <div>
        {posts.map((post) => (
          <div
            className="flex justify-between items-center flex-wrap m-4 mx-28 p-4 border-2 "
            key={post._id}
          >
            <div>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={() => handleEdit(post._id)}
                className="flex justify-center items-center text-white bg-blue-500 m-4 py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-white bg-red-500 m-4 py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
