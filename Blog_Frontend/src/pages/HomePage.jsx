import React, { useEffect, useState } from "react";
import { fetchAllPosts } from "../BlogPost_API";
import { Link } from "react-router-dom";
const HomePage = () => {
  // our state variables
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch all blog posts from backend
    const getAllBlogPosts = async () => {
      try {
        const response = await fetchAllPosts();
        setPosts(response.data.allBlogPosts);
        setLoading(false);
      } catch (error) {
        console.log("error fetching posts :", error);
        setLoading(false);
      }
    };
    getAllBlogPosts();
  }, []);
  // applying check
  if (loading) {
    return <div className="text-center mt-8">Loading ...</div>;
  }
  if (posts.length === 0) {
    return (
      <>
        <div className="text-center text-3xl font-bold mt-28 text-gray-500">
          No Posts Availabel.
        </div>
        <Link to="/post/create">Create post</Link>
      </>
    );
  }

  return (
    <>
      {/* Blog Container*/}
      <div className="">
        {/* header*/}
        <div>
          <h2 className="">Blog Posts</h2>{" "}
          <Link to="/post/create">Create post</Link>
        </div>
        {/* Posts container */}
        <div className="flex flex-wrap justify-start w-full">
          {posts.map((post) => (
            <Link
              to={`post/view/${post._id}`}
              className="flex flex-col justify-center m-4 p-4 border-2 w-auto"
              key={post._id}
            >
              <h2 className="">{post.title}</h2>
              <p className="">{post.summary}</p>
              <p className="">
                Published on : {new Date(post.date).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
