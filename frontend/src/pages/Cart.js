import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context)
  const loadingCart = new Array(4).fill(null)

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
      //setLoading(false)
    }

    console.log("data cart", responseData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && <p>No items in cart</p>}
      </div>

      <div>
        {/* view product */}
        <div className="w-full max-w-3xl">
        {loading ? (
            loadingCart.map(el=>{
                return (
                      <div key={el+"Cart Product Loading"} className="w-full bg-slate-200 h-32  my-3 border border-slate-300 animate-pulse rounded-lg">

                      </div>
                )
            })
          
        )
         : (
         <div>

        </div>
    )}</div>
      </div>
    </div>
  );
};

export default Cart;
