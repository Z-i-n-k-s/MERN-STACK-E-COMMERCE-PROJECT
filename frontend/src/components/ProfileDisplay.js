import React, { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import AllUsers from "../pages/AllUsers";
import { FaEdit } from "react-icons/fa";
import imageTobase64 from "../helpers/imageTobase64";

const ProfileDisplay = ({
  name,
  email,
  role,
  userId,
  onClose,
  profilePic,
  callFunc,
}) => {

 // console.log(name,email)
  
  
  const [newProfilePic, setNewProfilePic] = useState("");
  const [imgError, setImgError] = useState(false);

  const [profilepic, setProfilePic] = useState(profilePic);

  const[data,setData] = useState({
    userId : userId,
    newemail: email,
    
    newname: name,

    newprofilepic : profilePic
    
})

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);
    console.log("file value ",imagePic)
    console.log("before ", profilePic);
    setData((preve)=>{
      return{
        ...preve,
        newprofilepic: imagePic
      }
    })

    //setProfilePic(imagePic);
    setNewProfilePic(imagePic);

    console.log("now ", profilePic);
    console.log("now ", newProfilePic);
  };
  const updateUserProfile = async()=>{
    const fetchResponse = await fetch(SummaryApi.updateProfile.url,{
       method: SummaryApi.updateProfile.method,
       credentials: 'include',
       headers : {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        userId : userId,
        email : data.newemail,
        name : data.newname,
        
        profilePic:data.newprofilepic
       })
       })
           const responseData = await fetchResponse.json()

           if(responseData.success){
               toast.success(responseData.message)
               onClose()
               callFunc()
           }
           console.log("role updated",responseData)

}


  // console.log(userId)

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="relative bg-white shadow-xl p-5 w-full max-w-md rounded-xl ">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaWindowClose size={24} />
        </button>
        <h1 className="pb-4 text-2xl font-semibold text-center text-gray-800">
          Your Profile
        </h1>
        <div className="flex flex-col items-center ">
          <div className="relative m-4">
            {newProfilePic === "" && imgError ? (
              <FaUserLarge className="w-24 h-24 text-gray-500 rounded-full shadow-md mt-4" />
            ) : (
              <img
                src={data.newprofilepic}
                alt="Profile"
                className="w-24 h-24 rounded-full shadow-md mt-4"
                onError={() => setImgError(true)}
              />
            )}
            <input type="file" className="hidden" />
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 text-center cursor-pointer absolute bottom-0 w-full">
                  Upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <div className="text-gray-700 w-full text-center m-4 ">
            <div className="flex flex-row justify-center">
              <p className="p-2 text-lg">
                <span className="font-medium">Name : </span>{" "}
              </p>
              <input
                className="text-center text-gray-900 bg-transparent border-b border-gray-500 focus:outline-none"
                type="text"
                value={data.newname}
                onChange={e=>setData({...data,newname:e.target.value})}
              />
            </div>
            <div className="flex flex-row justify-center m-4">
              <p className="p-2 text-lg">
                <span className="font-medium">Email : </span>{" "}
              </p>
              <input
                className="text-center text-gray-900 bg-transparent border-b border-gray-500 focus:outline-none"
                type="email"
                value={data.newemail}
                onChange={e=>setData({...data,newemail:e.target.value})}
              />
            </div>
            <div className="mt-4">
              <p className="p-2 text-lg">
                <span className="font-medium">Role:</span> {role}
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button className="bg-green-400 text-black px-4 py-2 rounded-lg shadow hover:bg-green-700 hover:text-white transition duration-300"onClick={updateUserProfile}>
              Save
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow ml-4 hover:bg-gray-400 transition duration-300"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
