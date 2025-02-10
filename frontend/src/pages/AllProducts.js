import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import UploadProduct from "../components/UploadProduct";
import AdminProductCard from "../components/AdminProductCard";
import { ThreeDots } from "react-loader-spinner";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  const fetchAllProduct = async () => {
    setShowLoader(true);
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);
    const products = dataResponse?.data || [];
    setAllProduct(products);
    groupByCategory(products);

    setShowLoader(false);
  };

  const groupByCategory = (products) => {
    const grouped = products.reduce((acc, product) => {
      const category = product.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
    setGroupedProducts(grouped);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* All products grouped by category */}
      {showLoader ? (
        <div className="h-96 flex justify-center items-center">
          <ThreeDots type="ThreeDots" color="#7542ff" height={80} width={80} />
        </div>
      ) : (
        <div className="py-4">
          {Object.keys(groupedProducts).map((category) => (
            <div key={category} className="mb-6">
              <h3 className="font-semibold text-xl mb-4 border-b pb-2">
                {category}
              </h3>
              <div className="flex items-center flex-wrap gap-5">
                {groupedProducts[category].map((product, index) => (
                  <AdminProductCard
                    data={product}
                    key={index + "categoryProduct"}
                    fetchdata={fetchAllProduct}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload product component */}
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
