import React from 'react'
import loginIcons from '../assest/signin.gif'

const Login = () => {
  return (
    <section id = 'login'>
        <div className='mx-auto container p-4'>
           <div className=' bg-white p-2 py-5 w-full max-w-md mx-auto'>
                   <div className='w-20 h-20 mx-auto'>
                    <img src = {loginIcons} alt = 'login icons'/>
                   </div>
                   <form>
                    <div className='grid'>
                        <label>
                            Email :
                        </label>
                        <div>
                            <input type='email' placeholder='enter email'></input>
                        </div>
                    </div>

                    <div>
                        <label>
                            Password :
                        </label>
                        <div>
                        <input type='password' placeholder='enter password'></input>
                        </div>
                    </div>
                    <button>
                        Login
                    </button>
                   </form>
           </div>
        </div>
    </section>
  )
}

export default Login
