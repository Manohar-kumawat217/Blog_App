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
        console.log(response); // for test
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
    return <div className="text-center mt-8">No Posts Availabel.</div>;
  }

  return (
    <>
      {/* Blog Container*/}
      <div className="">
        {/* header*/}
        <h2 className="">Blog Posts</h2>
        {/* Posts container */}
        <div className="">
          {posts.map((post) => (
            <Link to={`post/${post._id}`} className="" key={post._id}>
              <h2 className="">{post.title}</h2>
              <p className="">{post.content}</p>
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
