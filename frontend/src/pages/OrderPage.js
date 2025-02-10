import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayBDTCurrency from "../helpers/displayCurrency";
import { ThreeDots } from "react-loader-spinner";

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.orderList.url, {
        method: SummaryApi.orderList.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const responseData = await response.json();
      setData(responseData.data || []);
      console.log("order list", responseData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handler to mark an order as received
  const handleMarkAsReceived = async (orderId) => {
    try {
      const response = await fetch(SummaryApi.updateReceivedStatus.url, {
        method: SummaryApi.updateReceivedStatus.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, receivedStatus: true }),
      });
      const result = await response.json();
      if (result.success) {
        // Update the receivedStatus locally for the order
        setData((prevData) =>
          prevData.map((order) =>
            order._id === orderId ? { ...order, receivedStatus: true } : order
          )
        );
      } else {
        console.error("Failed to update received status:", result.message);
      }
    } catch (error) {
      console.error("Error updating received status:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div>
      {data.length === 0 && !loading ? (
        <div className="text-center text-lg my-3">
          <p className="text-lg text-gray-600">No items in cart</p>
        </div>
      ) : (
        <div className="p-4 w-full">
          {loading && (
            <div className="h-96 flex justify-center items-center">
              <ThreeDots color="#7542ff" height={80} width={80} />
            </div>
          )}
          {data.map((order) => {
            return (
              <div key={order._id} className="mb-4">
                <p className="font-medium text-lg ">
                  {moment(order.createdAt).format("LL")}
                </p>
                <div className="border rounded">
                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="grid gap-1 p-4">
                      {order.productDetails.map((product) => {
                        return (
                          <div
                            key={product._id}
                            className="flex gap-3 bg-slate-100 p-2 rounded"
                          >
                            <img
                              src={product.productId.productImage[0]}
                              className="w-28 h-28 bg-slate-200 object-scale-down"
                              alt={product.productId.productName}
                            />
                            <div>
                              <div className="font-medium text-lg line-clamp-1">
                                {product.productId.productName}
                              </div>
                              <div className="flex items-center gap-5 mt-1">
                                <div className="text-lg text-red-500">
                                  {displayBDTCurrency(product.productId.price)}
                                </div>
                                <p>Quantity: {product.quantity}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 border-t">
                    <div className="font-semibold lg:text-lg">
                      Total Amount: {displayBDTCurrency(order.totalAmount)}
                    </div>
                  </div>
                  {/* Display order status and, if delivered, the received button */}
                  <div className="flex justify-between items-center p-4 border-t">
                    <div>
                      <span className="font-semibold">Order Status: </span>
                      {order.status}
                    </div>
                    {order.status === "delivered" && (
                      <div>
                        {order.receivedStatus ? (
                          <button
                            className="bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded cursor-default"
                            disabled
                          >
                            Received
                          </button>
                        ) : (
                          <button
                            className="bg-blue-500 text-white font-semibold py-1 px-3 rounded"
                            onClick={() => handleMarkAsReceived(order._id)}
                          >
                            Mark as Received
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
