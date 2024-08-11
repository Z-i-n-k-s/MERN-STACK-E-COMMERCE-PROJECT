import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";
import DisplayUserDetails from "../components/DisplayUserDetails";
import { ImProfile } from "react-icons/im";
import Context from "../context";
import DeleteUserDetails from "../components/DeleteUserDetails";
import Audio, { Bars, ThreeCircles, ThreeDots } from 'react-loader-spinner';

const AllUsers = () => {
  const [showOneUser,setShowOneUser] = useState(false)
  const [showLoader,setShowLoader] = useState(false)
  const [allUser, setAllUsers] = useState([]);
  const [oneUser, setOneUsers] = useState(null);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
    profilePic:"",
  });
 
  const[data,setData] = useState({
      email: "",
      
  })
 

  const fetchAllusers = async () => {
    setShowLoader(true)
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
      setShowLoader(false)
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }

    //console.log(dataResponse)
  };
  useEffect(() => {
    fetchAllusers();
  }, []);

  const { fetchUserDetails } = useContext(Context)

  const handleOnChange = (e) =>{
    const {name , value } = e.target

    setData((preve)=>{
        return{
            ...preve,
            [name] : value
        }
    })
}
const handleUserSubmit = async(e) =>{
  e.preventDefault()

const dataResponse = await fetch(SummaryApi.userSearch.url,{
   method : SummaryApi.userSearch.method,
   credentials : 'include',
   headers : {
       "content-type" : "application/json"
   },
   body : JSON.stringify(data)
})
const dataApi = await dataResponse.json()

if(dataApi.success){
   toast.success(dataApi.message)
   fetchUserDetails()
   setShowOneUser(true)
   setOneUsers(dataApi.data)
   console.log(dataApi.data)
   
   
}

if(dataApi.error){
  toast.error(dataApi.message)
   if(setShowOneUser)setShowOneUser(false)
    else{}
}

}



  return (
    <div>
      <div className=" flex justify-center p-3">
         <form className='flex flex-row ' onSubmit={handleUserSubmit}>
        <div className="hidden lg:flex items-center w-full justify-between border-2 rounded-full focus-within:shadow-md pl-3 ">
          <input 
            type='email' 
            placeholder='Find User By Email'
            name='email' 
            value={data.email}
            onChange={handleOnChange}
            style={{ width: '350px' }}
            className='w-full h-full outline-none bg-transparent '>

            </input>
          <button className='bg-red-600 hover:bg-red-700 text-white fu px-6 py-2 w-full max-w-[100px] rounded-full hover:scale-110 transition-all mx-auto block ' onClick={handleUserSubmit} >
                            search
                        </button>
        
        </div></form>
      </div>
      
      <div className="bg-white pb-4">
      <table className="w-full userTable">
    <thead>
      <tr className="bg-black text-white">
        <th>sr.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Created Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {showLoader ? (
        
        <tr>
        <td colSpan="6" className="text-center">
          <div className="flex justify-center items-center">
            <ThreeDots type="ThreeDots" color="#7542ff" height={80} width={80} />
          </div>
        </td>
        
      </tr>
      
        
      ) : (
        (showOneUser && oneUser ? [oneUser] : allUser).map((el, index) => (
          <tr key={el.id || index}>
            <td>{index + 1}</td>
            <td>{el?.name}</td>
            <td>{el?.email}</td>
            <td>{el?.role}</td>
            <td>{moment(el?.createdAt).format("LLL")}</td>
            <td>
              <div className="flex justify-evenly">
                <button
                  className="bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-800 hover:text-white"
                  onClick={() => {
                    setUpdateUserDetails(el);
                    setOpenUpdateRole(true);
                  }}
                >
                  <FiEdit />
                </button>
                <button
                  className="bg-green-200 p-2 rounded-full cursor-pointer hover:bg-red-600 hover:text-white"
                  onClick={() => {
                    setUpdateUserDetails(el);
                    setOpenDelete(true);
                  }}
                >
                  <MdDelete />
                </button>
                <button
                  className="bg-green-200 p-2 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white"
                  onClick={() => {
                    setUpdateUserDetails(el);
                    setOpenUserDetails(true);
                  }}
                >
                  <ImProfile />
                </button>
              </div>
            </td>
          </tr>
        ))
      )}
 
         
          </tbody>
        </table>
        {openDelete && (
          <DeleteUserDetails
            onClose={() => setOpenDelete(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            profilePic={updateUserDetails.profilePic}
            callFunc={fetchAllusers}
          />
        )}



        {openUserDetails && (
          <DisplayUserDetails
            onClose={() => setOpenUserDetails(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            profilePic={updateUserDetails.profilePic}
            callFunc={fetchAllusers}
          />
        )}

        {openUpdateRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllusers}
          />
        )}
      </div>
    </div>
  );
};

export default AllUsers;
