import React, {
  useCallback,
  useEffect,
  useState,
  Suspense,
  lazy,
  useContext,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa6";
import displayBDTCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import { toast } from "react-toastify";

const CategoryWisepProductDisplay = lazy(() =>
  import("../components/CategoryWiseProductDisplay")
);

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  // --- States for Review Section ---
  const [rating, setRating] = useState(0); // Stores the selected star rating
  const [hover, setHover] = useState(0); // For changing star color on hover
  const [reviewText, setReviewText] = useState(""); // Stores the review text

  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };

  // Fetch reviews for this product.
  const fetchReviews = async () => {
    try {
      // Assuming SummaryApi.getReviews is defined in your common file.
      // Here we pass the productId as a query parameter.
      const response = await fetch(SummaryApi.getReviews.url, {
        method: SummaryApi.getReviews.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productId: params?.id,
        }),
      });

      const dataResponse = await response.json();
      console.log("response reciew ", dataResponse);

      if (dataResponse.success) {
        setReviews(dataResponse.data);

        setRating(0);
        setReviewText("");
      } else {
        // toast.error(dataResponse.message);
        console.error("Failed to fetch reviews:", dataResponse.message);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("coordinate", left, top, width, height);
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({ x, y });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handelAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  // --- Handle Review Submission ---
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || reviewText.trim() === "") {
      alert("Please provide both a rating and a review.");
      return;
    }
    try {
      const payload = {
        productId: data?._id, // product ID to identify the product
        rating, // user-selected star rating
        review: reviewText, // review text
      };

      const response = await fetch(SummaryApi.addReview.url, {
        method: SummaryApi.addReview.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        // Optionally, clear the fields after submission:
        setRating(0);
        fetchReviews();
        setReviewText("");
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Error submitting review", error);
      alert("An error occurred while submitting your review.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/** Product Image Section */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-3">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
              alt="Product"
            />
            {/** Product Zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                />
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((e1, index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                    key={"loadingImage" + index}
                  />
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded p-1"
                    key={imgURL}
                  >
                    <img
                      src={imgURL}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      onClick={() => handleMouseEnterProduct(imgURL)}
                      alt="Product Thumbnail"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/** Product Details Section */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-4 lg:h-8 bg-slate-200 animate-pulse w-full"></h2>
            <p className="captalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full"></p>
            <div className="text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full"></div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full">
              <p className="text-red-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>
            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></button>
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></button>
            </div>
            <div className="w-full">
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></p>
              <p className="bg-slate-200 rounded animate-pulse h-10 lg:h-12 w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="captalize text-slate-400">{data?.category}</p>
            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">
                {displayBDTCurrency(data.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayBDTCurrency(data.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Buy
              </button>
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white"
                onClick={(e) => handelAddToCart(e, data?._id)}
              >
                Add To Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {/** Recommended Products Section */}
      {data.category && (
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryWisepProductDisplay
            category={data?.category}
            heading={"Recommended Product"}
          />
        </Suspense>
      )}

<div className="max-w-2xl mx-auto mt-12">
      {/** Write a Review Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg border">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Write a Review</h3>
        <form onSubmit={handleReviewSubmit}>
          {/** Star Rating */}
          <div className="flex items-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <label key={starValue} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={starValue}
                  className="hidden"
                  onClick={() => setRating(starValue)}
                />
                <FaStar
                  size={30}
                  color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            ))}
          </div>
          {/** Review Textarea */}
          <textarea
            className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-red-400 focus:outline-none resize-none"
            rows="4"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          {/** Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/** Display Reviews Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h3>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={review._id || index}
                className="p-5 border rounded-lg shadow-md bg-gray-50"
              >
                <p className="text-lg font-medium text-gray-900">{review.review}</p>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-semibold">By,  {review.user.name}</span> | Rating: <span className="text-yellow-500">{review.rating} ⭐</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No reviews available yet.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
