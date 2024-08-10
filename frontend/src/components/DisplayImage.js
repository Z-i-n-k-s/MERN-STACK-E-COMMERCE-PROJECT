import React from "react";
import { CgClose } from "react-icons/cg";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center">
      <div className="bg-gray-600 shadow-lg rounded max-w-5xl mx-auto p-4">
        <div
          className="w-fit ml-auto text-2xl text-red-300 hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <CgClose />
        </div>
  
        <div className="flex justify-center p-4 max-w-[70vh] max-h-[70vh]">
          <div className="bg-slate-200 h-48 p-4 min-w-[350px] min-h-[400px] md:min-w-[445px] flex justify-center items-center">
            <img
              src={imgUrl}
              className="object-contain h-full w-full hover:scale-110 transition-all mix-blend-multiply"
              alt="Displayed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
