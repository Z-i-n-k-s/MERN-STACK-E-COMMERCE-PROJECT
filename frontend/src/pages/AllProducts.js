import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import UploadProduct from "../components/UploadProduct";
import AdminProductCard from "../components/AdminProductCard";
import Audio, { Bars, ThreeCircles, ThreeDots } from "react-loader-spinner";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const fetchAllProduct = async () => {
    setShowLoader(true);
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);
    setAllProduct(dataResponse?.data || []);
    if (dataResponse.success) {
      setShowLoader(false);
    } else {
      setShowLoader(false);
    }
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white  transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>
      {/* all product */}
      {showLoader ? (
        <div className="h-96 flex justify-center items-center">
          <ThreeDots type="ThreeDots" color="#7542ff" height={80} width={80} />
        </div>
      ) : (
        <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-scroll">
          {allProduct.map((product, index) => {
            return (
              <AdminProductCard
                data={product}
                key={index + "allProduct"}
                fetchdata={fetchAllProduct}
              />
            );
          })}
        </div>
      )}

      {/**upload product component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
