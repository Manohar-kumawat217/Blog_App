import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // for extract id from request body in frontend
import { fetchPost } from "../BlogPost_API";

export default function BlogPostPage() {
  const { id } = useParams(); // extracting post id from url
  const [post, setPost] = useState(null); // post data store here
  const [loading, setLoading] = useState(true); //Loading state

  useEffect(() => {
    const getBlogPost = async () => {
      try {
        const response = await fetchPost(id); // fetch post from backend
        setPost(response.data.oneBlogPost); //set data into post state
        setLoading(false); //loading complete
      } catch (error) {
        console.log("Error while fetching post", error);
        setLoading(false); // stop loading also in error case
      }
    };

    getBlogPost();
  }, [id]);

  //check if data is loading
  if (loading) {
    return (
      <h1 className="text-center text-black font-black  m-4 p-4 text-3xl">
        Post Loading...
      </h1>
    );
  }

  //check if post not exist
  if (!post) {
    return (
      <h1 className="text-center text-black font-black m-4 p-4 text-3xl">
        404 Post Not found
      </h1>
    );
  }

  return (
    <>
      {/* post container*/}
      <div className="flex flex-col items-start justify-center m-4 p-4">
        {/* Post Data */}
        <h2 className="">{post.title}</h2>
        <div className="prose">{post.content}</div>
        <p className="">{post.summary}</p>
        <p className="">
          Published On : {new Date(post.date).toLocaleDateString()}
        </p>
        {/* Actions buttons*/}
        <div className=" flex flex-row ">
          <Link to="/" className="bg-black text-white py-2 px-4 m-4 ml-0">
            Back
          </Link>
          <Link
            to={`/post/edit/${post._id}`}
            className="bg-blue-500 text-white py-2 px-4 m-4"
          >
            Edit
          </Link>
          <Link
            to="/post/manage"
            className="bg-red-500 text-white py-2 px-4 m-4"
          >
            Manage Post
          </Link>
        </div>
      </div>
    </>
  );
}
