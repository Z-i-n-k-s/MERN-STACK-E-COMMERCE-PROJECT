import React from 'react'
import { CgClose } from "react-icons/cg";

const UploadProduct = ({
    onClose
}

) => {
  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-lg'>
                UploadProduct</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <CgClose/>
               </div>
            </div>
        
        </div>
    </div>
  )
}

export default UploadProduct