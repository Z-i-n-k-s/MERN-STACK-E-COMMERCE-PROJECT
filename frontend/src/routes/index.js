import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUP from "../pages/SignUP";
import Adminpanel from "../pages/Adminpanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";





const router  = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "login",
                element : <Login/>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "sign-up",
                element: <SignUP/>
            },
            {
                path : "product-category",
                element:<CategoryProduct/>
            },
            {
                path:"product/:id",
                element : <ProductDetails/>
            },
            {
                path:"cart",
                element : <Cart/>
            },
            {
                path:"success",
                element : <Success/>

            },
            {
                path:"cancel",
                element : <Cancel/>

            },
            {
                path:"order",
                element : <OrderPage/>

            },
            {
                path:"search",
                element : <SearchProduct/>
            },
            {
                path: "admin-panel",
                element: <Adminpanel/>,
                children:[
                    {
                        path: "all-users",
                        element: <AllUsers/>
                    },
                    {
                        path: "all-products",
                        element: <AllProducts/>
                    }
                ]
            },
          

        ]
        
    }
])

export default router