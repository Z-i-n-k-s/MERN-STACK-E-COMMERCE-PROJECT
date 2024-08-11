import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast }   from  'react-toastify';

const AdminDeleteProduct = ({
    onClose,
    productdata,
    fetchdata
}) => {
    const [data, setData] = useState({
        ...productdata,
        productName: productdata?.productName,
        brandName: productdata?.brandName,
        category: productdata?.category,
        productImage: productdata?.productImage||[],
        description: productdata?.description,
        price: productdata?.price,
        sellingPrice: productdata?.sellingPrice
    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value

            }
        })
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]

            }
        })
    }

    const handleDeleteProductImage = async (index) => {
        console.log("image index", index)

        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductImage]

            }
        })

    }

    {/**upload product */ }

    const handleSubmit = async(e) => {
        e.preventDefault()
        //console.log("data",data)
        const response = await fetch(SummaryApi.deleteProduct.url, {
            method: SummaryApi.deleteProduct.method,
            credentials: 'include',
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()
        
        //console.log('responseData',responseData)
        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            fetchdata()
        }

        if(responseData.error){
            toast.error(responseData.message)
        }
    }
  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
    <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

        <div className='flex justify-between items-center pb-3 text-center'>
            <h2 className='font-bold text-lg items-center'>Delete This Product ?</h2>

            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <CgClose />
            </div>
        </div>

        <div className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' >

            <label htmlFor='productName'>Product Name : {data.productName}</label>
          

            <label htmlFor='brandName' className='mt-3'>Brand Name : {data.brandName}</label>
            

            <label htmlFor='category' className='mt-3'>Category : {data.category}</label>
           
            <label htmlFor='productImage' className='mt-3'>Product Image :</label>
           
            <div>
                {
                    data?.productImage[0] ? (
                        <div className='flex items-center gap-2'>
                            {
                                data.productImage.map((el, index) => {
                                    return (
                                        <div className='relative group'>
                                            <img
                                                src={el}
                                                alt={el}
                                                width={80}
                                                height={80}
                                                className='bg-slate-100 border cursor-pointer'
                                                onClick={() => {
                                                    setOpenFullScreenImage(true)
                                                    setFullScreenImage(el)
                                                }} />
                                          

                                        </div>

                                    )
                                })
                            }
                        </div>
                    ) : (
                        <p className='text-red-600 text-xs'>image</p>
                    )
                }

            </div>

            <label htmlFor='price' className='mt-3'>Price : {data.price}</label>

           


            <label htmlFor='sellingPrice' className='mt-3'>Selling Price : {data.sellingPrice}</label>

          
            <label htmlFor='description' className='mt-3'>Description : {data.description}</label>
            

            <div className="flex justify-center mt-4 pb-5">
              <button
                className="bg-red-400 text-black px-4 py-2 rounded-lg shadow hover:bg-red-600 hover:text-white transition duration-300"
                onClick={handleSubmit}
              >
                Confirm
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

    {/***display image full screen */}{
        openFullScreenImage && (
            <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )
    }

</div>
  )
}

export default AdminDeleteProduct
