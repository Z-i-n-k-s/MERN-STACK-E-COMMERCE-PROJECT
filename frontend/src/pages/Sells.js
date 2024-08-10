import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import SalesBarChart from '../components/SalesBarChart';
import CategorySalesBarChart from '../components/CategorySalesBarChart';
import Audio, { Bars, ThreeCircles, ThreeDots } from "react-loader-spinner";

const Sells = () => {
    const [data, setData] = useState([]); // To store fetched data
    const [loading, setLoading] = useState(true); // To indicate loading state
  
    const fetchSellsDetails = async () => {
      try {
        const response = await fetch(SummaryApi.allOrder.url, {
          method: SummaryApi.allOrder.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        });
  
        if (response.error) {
          throw new Error("Network response was not ok");
        }
  
        const responseData = await response.json();
        setData(Array.isArray(responseData.data) ? responseData.data : []); // Ensure data is an array
        console.log("admin panel order  list", responseData);
      } catch (error) {
        console.error("Error fetching order details:", error);
        // Handle error state if needed
      } finally {
        setLoading(false); // Set loading to false after data fetch is complete
      }
    };
  
    useEffect(() => {
        fetchSellsDetails();
    }, []);
  
  return (
    <div className="h-[calc(100vh-190px)] overflow-y-scroll p-4 bg-gray-50">
    {loading ? (
      <div className="h-96 flex justify-center items-center">
        <ThreeDots type="ThreeDots" color="#7542ff" height={80} width={80} />
      </div>
    ) 
     : (
    <div>
    <h1  className="font-bold text-2xl mb-2" >Sales Bar Chart</h1>
    <SalesBarChart data={data} />
    <h1 className="font-bold text-2xl mt-6 mb-2">Category Sales Bar Chart</h1>
        <CategorySalesBarChart data={data} />
  </div>
     )
    }
    </div>

  )
}

export default Sells