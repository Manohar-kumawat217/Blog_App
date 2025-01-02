import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { createPost, updatePost, fetchPost } from "../BlogPost_API";

export default function CreateEditPost() {
  const { id } = useParams(); // if id exists it's edit mode
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      //fetch existing post if in edit mode
      const getpost = async () => {
        try {
          const response = await fetchPost(id);
          setFormData({
            title: response.data.oneBlogPost.title,
            content: response.data.oneBlogPost.content,
            summary: response.data.oneBlogPost.summary,
          });
          setLoading(false);
        } catch (error) {
          console.log("Error while fetching post for editing", error);
          setLoading(false);
        }
      };
      getpost();
    }
  }, [id]);

  const validation = () => {
    const errors = {}; //initializing empty object

    //for title
    if (!formData.title.trim()) {
      // if title is empty
      errors.title = "Title is Required";
    } else if (formData.title.length < 3) {
      //if title is less then 3 characters
      errors.title = "Title must be at least 3 characters long";
    }

    //for content
    if (!formData.content.trim()) {
      errors.content = "Content is required";
    } else if (formData.content.length < 10) {
      errors.content = "Content must be at least 10 characters long";
    }

    //for summary
    if (!formData.summary.trim()) {
      errors.summary = "Summary is required";
    } else if (formData.summary.length < 10) {
      errors.summary = "Summary must be at least 10 charcaters long";
    }

    setErrors(errors);
    // Object.keys(errors) -> converting all object keys into an array
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); //clear an error on input change
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // here we check that form contain any error or not / validation success or fail check
    if (!validation()) {
      return; // stop submission if validation fails
    }
    setLoading(true);

    try {
      if (id) {
        //here we use updatePost
        await updatePost(id, formData);
        navigate(`/post/view/${id}`);
      } else {
        //here we use createPost
        await createPost(formData);
        navigate("/"); //redirected to home page after success
      }
    } catch (error) {
      console.log("Error while submitting form", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* Form container */}
      <div className="">
        <h1 className="m-4 p-4 text-3xl font-bold text-blue-500">
          {id ? "Edit your Post" : "Create a new Post"}
        </h1>
        {/* form begins */}
        <form action="" onSubmit={handleSubmit}>
          {/* form container */}
          <div className=" flex flex-col m-4 p-4 justify-evenly">
            {/* for title */}
            <div className="p-4  mb-4">
              <label htmlFor="title" className="">
                Title :
              </label>
              <input
                type="text"
                id="title" // it uses in label
                name="title" // use in setFormData
                value={formData.title}
                onChange={handleChange}
                className="border-2 ml-4"
                required
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            {/* for content */}
            <div className="p-4  mb-4">
              <label htmlFor="content" className="">
                Content :
              </label>
              <textarea
                type="text"
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="border-2"
                rows="3"
                required
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content}</p>
              )}
            </div>

            {/* for summary */}
            <div className="p-4  mb-4">
              <label htmlFor="summary" className="">
                Summary :
              </label>
              <input
                type="text"
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                className="border-2"
                rows="3"
                required
              />
              {errors.summary && (
                <p className="text-red-500 text-sm">{errors.summary}</p>
              )}
            </div>

            <div className="flex">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4"
                disabled={loading}
              >
                {loading ? "Saving ..." : id ? "Update Post" : "Create Post"}
              </button>
              <Link
                to="/"
                className="flex justify-center items-center bg-black text-white py-2 px-4 ml-4"
              >
                Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
