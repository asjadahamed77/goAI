import React, { useState } from 'react'
import MarkDown from 'react-markdown'

const CreationItem = ({item}) => {
    const [expanded, setExpanded] = useState(false)
     
  return (
    <div onClick={()=> setExpanded(!expanded )} className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer hover:-translate-y-1 duration-300 tranition-all ease-in-out '>
      <div className='flex justify-between items-center gap-4 '>
                <div>
                    <h2>{item.prompt}</h2>
                    <p className='text-gray-500'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>

                </div>
                <button className='bg-primary/10 border border-secondary text-primary px-4 py-1 rounded-full'>{item.type}</button>
      </div>
      {
        expanded && (
            <div>
                {
                    item.type === "image" ?
                    (
                        <div >
                            <img src={item.content} alt="image-item" className='mt-3 w-full max-w-md' />
                        </div>
                    ) :
                    (
                        <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-700'>
                            <div className='reset-tw'>
                                <MarkDown>
                                {
                                    item.content
                                }
                                </MarkDown>
                            </div>
                        </div>
                    )
                }
            </div>
        )
      }
    </div>
  )
}

export default CreationItem
