import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaUserLarge } from "react-icons/fa6";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const Adminpanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
            <aside className='bg-white min-h-screen w-full max-w-60 customShadow flex flex-col'>
                <div className='h-32 flex justify-center items-center flex-col'>
                    <div className="text-5xl cursor-pointer relative flex justify-center">
                        {user?.profilePic ? (
                            <img src={user?.profilePic} className="w-20 h-20 rounded-full" alt={user?.name} />
                        ) : (
                            <FaUserLarge />
                        )}
                    </div>
                    <p className='capitalize text-lg font-bold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                {/** Navigation */}
                <div className='h-full flex-1'>
                    <nav className='grid p-4'>
                        <NavLink to="all-products" className={({ isActive }) => `px-2 py-2 border-b-2 transition-all ${isActive ? "text-red-500 font-bold text-xl " : "hover:bg-red-600 hover:text-white"}`}>
                            All Products
                        </NavLink>
                        <NavLink to="all-users" className={({ isActive }) => `px-2 py-2 border-b-2 transition-all ${isActive ? "text-red-500 font-bold text-xl " : "hover:bg-red-600 hover:text-white"}`}>
                            All Users
                        </NavLink>
                        <NavLink to="allorder" className={({ isActive }) => `px-2 py-2 border-b-2 transition-all ${isActive ? "text-red-500 font-bold text-xl " : "hover:bg-red-600 hover:text-white"}`}>
                            All Orders
                        </NavLink>
                        <NavLink to="sells" className={({ isActive }) => `px-2 py-2 border-b-2 transition-all ${isActive ? "text-red-500 font-bold text-xl " : "hover:bg-red-600 hover:text-white"}`}>
                            Summary
                        </NavLink>
                    </nav>
                </div>
            </aside>

            <main className='w-full h-full p-2'>
                <Outlet />
            </main>
        </div>
    );
};

export default Adminpanel;
