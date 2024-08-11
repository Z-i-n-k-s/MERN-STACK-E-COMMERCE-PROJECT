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
import OrderPage from "../pages/OrderPage";
import AllOrder from "../pages/AllOrder";
import Sells from "../pages/Sells";





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
                path : "order",
                element:<OrderPage/>
            },
            {
                path:"product/:id",
                element : <ProductDetails/>
            },
            {
                path:"success",
                element : <Success/>

            },
            {
                path:"cart",
                element : <Cart/>
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
                    },
                    {
                        path : "allorder",
                        element:<AllOrder/>
                    },
                    {
                        path : "sells",
                        element:<Sells/>
                    },
                ]
            },
          

        ]
        
    }
])

export default router