import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Login = () => {
    const[showPassword,setShowPassword] = useState(false)
    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className=' bg-white p-2 py-5 w-full max-w-md mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icons' />
                    </div>
                    <form>
                        <div className='grid'>
                            <label>
                                Email :
                            </label>
                            <div className='bg-slate-200 p-2'>
                                <input type='email' placeholder='enter email' className='w-full h-full outline-none bg-transparent'></input>
                            </div>
                        </div>

                        <div>
                            <label>
                                Password :
                            </label>
                            <div className='bg-slate-200 p-2 flex'>
                                <input type={showPassword ?  "text" : "password"} placeholder='enter password' className='w-full h-full outline-none bg-transparent'></input>
                                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash />
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                        
                                        
                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot password
                            </Link>
                        </div>
                        <button className='bg-red-600 text-white fu px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
                            login
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login
