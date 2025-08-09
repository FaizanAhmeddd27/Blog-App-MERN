import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    formData.append("blogImage", blogImage);
    try {
      const { data } = await axios.post(
        "/api/blogs/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(data);
      toast.success("Blog Created Successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Please fill the required fields");
    }
  };

  return (
    <div className="h-screen overflow-hidden p-2">
      <div className="max-w-xl border-2 border-blue-800 p-6 mx-auto h-[96vh] rounded-lg flex flex-col">
        <h3 className="text-lg text-blue-800 font-semibold mb-2 text-center">Create Blog</h3>
        <form onSubmit={handleCreateBlog} className="flex-1 flex flex-col space-y-2 overflow-y-auto">

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-medium mb-1">Blog Image</label>
            <div className="flex-1 flex items-center justify-center min-h-[80px]">
              {blogImagePreview ? (
                <img
                  src={blogImagePreview}
                  alt="Blog preview"
                  className="max-w-full max-h-[120px] rounded object-cover"
                />
              ) : (
                <div className="text-center text-gray-500 text-sm p-4">
                  <svg className="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>No image selected</div>
                  <div className="text-xs text-gray-400 mt-1">Click below to upload</div>
                </div>
              )}            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded outline-none focus:border-blue-500"
              accept="image/*"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-medium mb-1">About</label>
            <textarea
              rows="2"
              placeholder="Write something about your blog"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded outline-none focus:border-blue-500 resize-none flex-1"
            />
          </div>

          <button
            type="submit"
            className="w-full mb-3 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors duration-200 font-semibold mt-2"
          >
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;