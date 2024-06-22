import React, { useState } from 'react'
import ROLE from '../common/role'
import { FaWindowClose } from "react-icons/fa";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId, 
    onClose,
    callFunc,
}) => {
    const [userRole,setUserRole]= useState(role)

    const handleOnChangeSelect= (e)=>{
        setUserRole(e.target.value)
        
        console.log(e.target.value) 
    }

const updateUserRole = async()=>{
         const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId : userId,
                role: userRole
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

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>

      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
            <button className='block ml-auto' onClick={onClose}>
            <FaWindowClose />
                </button>    



        <h1 className='pb-4 text-lg font-medium'>ChangeUserRole</h1>
          

          <p className='p-2 text-lg'>Current Name : {name}</p>
          <input 
                        type='email' 
                        placeholder='enter new name'
                        name='newName' 
                        // value={data.email}
                        // onChange={handleOnChange}
                        // required
                        className="w-full h-full p-1 border-solid border-2 border-black rounded-lg bg-white ">

                        </input>
          <p className='text-lg p-2'>Current Email : {email}</p>
          <input 
                        type='email' 
                        placeholder='enter new email'
                        name='newEmail' 
                        // value={data.email}
                        // onChange={handleOnChange}
                        // required
                        className="w-full h-full p-1 border-solid border-2 border-black rounded-lg bg-white ">

                        </input>

          <div className='flex items-center justify-between my-4'>
          <p>
            Role :
          </p>
        <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
            {
                Object.values(ROLE).map(el=>{
                    return(
                        <option value={el} key={el}>
                        {
                            el
                        } 
                        </option>
                    )
                })
            }
            
        </select>
          </div>



          <button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole} >Change role</button>
      </div>
    </div>
  )
}

export default ChangeUserRole
