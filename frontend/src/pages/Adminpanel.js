import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaUserLarge } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
const Adminpanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(()=>{
         if(user?.role !== ROLE.ADMIN){
            navigate("/")
         }
    },[user])
    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
            <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
                <div className='h-32 flex justify-center items-center flex-col'>
                    <div className="text-5xl cursor-pointer relative flex justify-center" >
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} className="w-20 h-20 rounded-full" alt={user?.name} />
                            ) : (
                                <FaUserLarge />
                            )
                        }

                    </div>
                    <p className='capitalize text-lg font-bold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>
                
                {/**navigation */}
                <div>
                    <nav className='grid p-4'>
                        <Link to={"all-products"}className='px-2 py-1 hover:bg-slate-100'>All product</Link>
                        <Link to={"all-users"}className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                        <Link to={"allorder"}className='px-2 py-1 hover:bg-slate-100'>All Orders</Link>
                        <Link to={"sells"}className='px-2 py-1 hover:bg-slate-100'>Summary</Link>
                        
                    </nav>

                </div>
            </aside>

            <main className='w-full h-full p-2'>
                <Outlet/>
            </main>
        </div>
    )
}

export default Adminpanel
