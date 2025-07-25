import { Edit, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios"
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL


const WriteArticle = () => {
  const articleLength = [
    {
      length: 800,
      text: "Short (500-800 words)",
    },
    {
      length: 1200,
      text: "Medium (800-1200 words)",
    },
    {
      length: 1600,
      text: "Long (1200+ words)",
    },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState("")

  const {getToken} = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.text}`

      const {data} = await axios.post('/ai/generate-article',{
        prompt, length: selectedLength.length
      },{
        headers:{
          Authorization: `Bearer ${await getToken()}`
        }
      })

      if(data.success){
        setContent(data.content)
      }else{
        toast.error(data.message)
       
        
      }

    } catch (error) {
      toast.error(error.message)
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
          <h1 className="text-xl font-semibold">Article Configuration</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Article Topic</p>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="w-full p-2 px-3 mt-2 outline-0 text-sm rounded-md border border-gray-300"
          placeholder="The future of artificial intelligence is ..."
          required
        />
        <p className="mt-4 text-sm font-medium">Article Length</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {articleLength.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedLength(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedLength.text === item.text
                  ? "bg-gradient-to-br from-primary to-secondary text-white border-primary"
                  : ""
              }`}
            >
              {item.text}
            </div>
          ))}
        </div>
        <br />
        <button disabled={loading} className="w-full bg-gradient-to-br from-primary to-secondary text-white flex justify-center items-center gap-2 px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer hover:opacity-90 duration-300 transition-all ease-in-out">
          {
            loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span> : <Edit className="w-5" />
          }
          
          Generate Article
        </button>
      </form>
      {/* Right Side */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-[600px]  ">
        <div className="flex items-center gap-3">
          <Edit className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-semibold">Generated Article</h1>
        </div>
       {
        !content ? (
          <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
        <Edit className="w-9" />
        <p>Enter a topic and click "Genarate Article" to get started</p>
          </div>
      </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
            <div className="reset-tw">
            <Markdown>
            {content}
            </Markdown>
            </div>
          </div>
        )
       }
      </div>
    </div>
  );
};

export default WriteArticle;
