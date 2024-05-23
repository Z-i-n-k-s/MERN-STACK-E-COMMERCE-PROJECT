import React from "react";
import Logo from "./Logo";
import { IoSearchSharp } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";

const Header = () => {
  return (
    <header className="h-16 shadow-md">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Logo w={90} h={50} />
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3">
          <input
            type="text"
            placeholder="Find your items...."
            className="w-full outline-none "
          />
          <div className="text:lg min-w-[50px] h-8 bg-red-500 flex items-center justify-center rounded-full text-white">
            <IoSearchSharp />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="text-3xl cursor-pointer">
            <FaUserLarge />
          </div>
          <div className="text-2xl relative">
            <span>
              <BsCart4 />
            </span>
            <div className="bg-red-400 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>
          <div>
            <button className="px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700 flex items-center justify-center ">LogIn</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
