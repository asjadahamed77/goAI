import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react'

const ReviewResume = () => {
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
        <h1 className="text-xl font-semibold">Resume Review</h1>
      </div>
      <p className="mt-6 text-sm font-medium">Upload Resume</p>
      <input
        type="file"
        onChange={(e) => setInput(e.target.files[0])}
       accept='application/pdf'
        className="w-full p-2 px-3 mt-2 outline-0 text-sm rounded-md border border-gray-300 text-gray-600"
      
        required
      />
     
     
     <p className='text-xs mt-1 text-gray-500 font-light'>Supports PDF resume only.</p>
     {input && (
  <p className="text-xs mt-2 text-primary truncate">
    Selected: {input.name}
  </p>
)}
      <button className="w-full bg-gradient-to-br from-primary to-secondary text-white flex justify-center items-center gap-2 px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer hover:opacity-90 duration-300 transition-all ease-in-out">
        <FileText className="w-5" />
        Review Resume
      </button>
    </form>
    {/* Right Side */}
    <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96   ">
      <div className="flex items-center gap-3">
        <FileText className="w-5 h-5 text-primary" />
        <h1 className="text-xl font-semibold">Analysis Result </h1>
      </div>
      <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
        <FileText className="w-9" />
        <p>Upload an resume and click "Resume Review" to get started</p>
          </div>
      </div>
    </div>
  </div> 
  )
}

export default ReviewResume
