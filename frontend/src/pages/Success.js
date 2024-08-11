import React from 'react'
import SUCCESSIMAGE from '../assest/success.gif'
import { Link } from 'react-router-dom'

const Success = () => {
    return (
        <div className='bg-gradient-to-r from-green-200 to-blue-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-6 m-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300'>
          <img
            src={SUCCESSIMAGE}
            alt="Success"
            className='w-32 h-32 mb-4'
          />
          <p className='text-green-800 font-extrabold text-2xl mb-2'>
            Payment Successful!
          </p>
          <p className='text-gray-700 text-center mb-4'>
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <Link
            to="/order"
            className='inline-block py-2 px-5 mt-5 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transition-colors duration-200'
          >
            See Order
          </Link>
        </div>
      );
}

export default Success