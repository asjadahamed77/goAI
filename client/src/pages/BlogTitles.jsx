import { Edit, Hash, Sparkles } from 'lucide-react';
import React, { useState } from 'react'

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food"
  ];

  const [selectedCategory, setSelectedCategory] = useState("General"); 
  const [input, setInput] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
    {/* Left Side */}
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
    >
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 text-primary" />
        <h1 className="text-xl font-semibold">AI Title Generator</h1>
      </div>
      <p className="mt-6 text-sm font-medium">Keyword</p>
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className="w-full p-2 px-3 mt-2 outline-0 text-sm rounded-md border border-gray-300"
        placeholder="The future of artificial intelligence is ..."
        required
      />
      <p className="mt-4 text-sm font-medium">Category</p>
      <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
        {blogCategories.map((item) => (
          <div
            key={item}
            onClick={() => setSelectedCategory(item)}
            className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
              selectedCategory === item
                ? "bg-gradient-to-br from-primary to-secondary text-white border-primary"
                : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <br />
      <button className="w-full bg-gradient-to-br from-primary to-secondary text-white flex justify-center items-center gap-2 px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer hover:opacity-90 duration-300 transition-all ease-in-out">
        <Hash className="w-5" />
        Generate Title
      </button>
    </form>
    {/* Right Side */}
    <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96   ">
      <div className="flex items-center gap-3">
        <Hash className="w-5 h-5 text-primary" />
        <h1 className="text-xl font-semibold">Generated Titles</h1>
      </div>
      <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
        <Hash className="w-9" />
        <p>Enter a keyword and click "Genarate Title" to get started</p>
          </div>
      </div>
    </div>
  </div>
  )
}

export default BlogTitles
