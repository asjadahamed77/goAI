import { Scissors, Sparkles } from 'lucide-react';
import React, { useState } from 'react'

import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState ("");
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if(object.split(' ').length > 1){
        return toast.error("Please enter only one object name")
      }

      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", object);

      const { data } = await axios.post(
        "/ai/remove-image-object",
          formData,
        
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
setLoading(false)
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
        <h1 className="text-xl font-semibold">Object Removal</h1>
      </div>
      <p className="mt-6 text-sm font-medium">Upload Image</p>
      <input
        type="file"
        onChange={(e) => setInput(e.target.files[0])}
       accept='image/*'
        className="w-full p-2 px-3 mt-2 outline-0 text-sm rounded-md border border-gray-300 text-gray-600"
      
        required
      />

     
     
     <p className='text-xs mt-1 text-gray-500 font-light'>Supports JPG, PNG, and other image formats.</p>
     {input && (
  <p className="text-xs mt-2 text-primary truncate">
    Selected: {input.name}
  </p>
)}

<p className="mt-6 text-sm font-medium">Describe object name to remove</p>


<textarea
          rows={5}
          onChange={(e) => setObject(e.target.value)}
          value={object }
          className="w-full p-2 px-3 mt-2 outline-0 text-sm rounded-md border border-gray-300"
          placeholder="e.g. , watch or spoon, Only single object name "
          required
        />

      <button disabled={loading} className="w-full bg-gradient-to-br from-primary to-secondary text-white flex justify-center items-center gap-2 px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer hover:opacity-90 duration-300 transition-all ease-in-out">
      {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Scissors className="w-5" />
          )}
        Remove Object
      </button>
    </form>
    {/* Right Side */}
    <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96   ">
      <div className="flex items-center gap-3">
        <Scissors className="w-5 h-5 text-primary" />
        <h1 className="text-xl font-semibold">Processed Image </h1>
      </div>
     {
      !content ? (
        <div className="flex-1 flex justify-center items-center">
        <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
      <Scissors className="w-9" />
      <p>Upload an image, describe your image and click "Remove Object" to get started</p>
        </div>
    </div>
      ) : (
        <div className="h-full mt-3">
        <img src={content} alt="image" className="w-full h-full" />
      </div>
      )
     }
    </div>
  </div> 
  )
}

export default RemoveObject
