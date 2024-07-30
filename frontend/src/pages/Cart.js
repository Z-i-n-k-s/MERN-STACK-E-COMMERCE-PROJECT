import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

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
    console.log("data cart", responseData);
    if (responseData.success) {
      setData(responseData.data);
   //   setLoading(false);
    }

    
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && <p>No items in cart</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 justify-between">
        {/* view product */}
         <div className="w-full max-w-3xl">
         {loading ? (
            loadingCart.map((el=> {
              return (
                <div
                  key={el + "Cart Product Loading"}
                  className="w-full bg-slate-200 h-32  my-3 border border-slate-300 animate-pulse rounded-lg"
                >
                  load true
                </div>
              );
            }) 
          )
          ) : (
            // data.map((product,index)=>{
              
            // })
            <div className="h-36 bg-slate-200">
              loading false
            </div>
          )}
          </div>
         {/* {loading
            ? (loadingCart.map((el=> {
                return (
                  <div
                    key={el + "Cart Product Loading"}
                    className="w-full bg-slate-200 h-32  my-3 border border-slate-300 animate-pulse rounded-lg"
                  >
                    load true
                  </div>
                );
              }) 
            ))
            :( data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Cart Product Loading"}
                    className="w-full bg-white h-32  my-3 border border-slate-300 rounded-lg"
                  >
                    load false
                  </div>
                );
              }))
              }
        </div> */}
        {/* total product */}
        <div className="mt-6 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="w-full bg-slate-200 h-32  my-3 border border-slate-300 animate-pulse rounded-lg">
              total loading true
            </div>
          ) : (
            <div className="h-36 bg-slate-200">
              loading false
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
