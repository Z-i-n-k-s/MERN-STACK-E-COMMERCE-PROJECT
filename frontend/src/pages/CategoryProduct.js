import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'

const CategoryProduct = () => {
    const params = useParams()
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(false)
    
    const fetchData = async()=>{
        const response = await fetch()
        const dataResponse = await response.json()

        setData(dataResponse?.data || [])
        console.log(dataResponse)
    }
    
    //{params?.categoryName}
  return (
    <div className='container mx-auto p-5'>
        {/**desktop version */}
        <div className='hidden lg:grid grid-cols-[200px,1fr]'>
          {/**left side */}
          <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>

            {/***sort by */}
                  <div className=''>
                    <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300'>Sort by </h3>
                  
                  <form className='text-sm flex-col grid gap-2 py-2'>
                    <div className='flex items-center gap-3'>
                        <input type='radio' name='sortBy' />
                        <label>Price: Low to High</label>
                    </div>

                    <div className='flex items-center gap-3'>
                        <input type='radio' name='sortBy' />
                        <label>Price: High to Low</label>
                    </div>
                  </form>
                  
                  </div>

                  {/**filter by */}
                  <div className=''>
                    <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300'>Category </h3>
                  
                  <form className='text-sm flex-col grid gap-2 py-2'>
                    {
                      productCategory.map((categoryName,index)=>{
                        return(
                      <div className='flex items-center gap-3'>
                        <input type = 'checkbox' name={"category"} id={categoryName?.value}/>
                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                      </div>
                        )
                      })
                    }
                  </form>
                  
                  </div>
          </div>

          {/**right side (product) */}
          <div>
            display 
          </div>
        </div>

      </div>
  )
}

export default CategoryProduct