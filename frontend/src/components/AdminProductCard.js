import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayBDTCurrency from "../helpers/displayCurrency";
import AdminDeleteProduct from "./AdminDeleteProduct";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            className="mx-auto object-fill h-full"
          />
        </div>

        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>

        <div>
          <p className="font-semibold">
            {displayBDTCurrency(data.sellingPrice)}
          </p>

          <div className="flex space-x-2">
            <div
              className="w-fit ml-auto p-2 bg-green-200 hover:bg-green-500 rounded-full hover:text-white cursor-pointer"
              onClick={() => setEditProduct(true)}
            >
              <FaEdit />
            </div>
            <div
              className="w-fit ml-auto p-2 bg-orange-200 hover:bg-red-500 rounded-full hover:text-white cursor-pointer"
              onClick={() => setDeleteProduct(true)}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productdata={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
      {deleteProduct && (
        <AdminDeleteProduct
          productdata={data}
          onClose={() => setDeleteProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
