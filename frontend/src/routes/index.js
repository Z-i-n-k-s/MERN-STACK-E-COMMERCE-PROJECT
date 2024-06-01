import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUP from "../pages/SignUP";



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
            }
        ]
        
    }
])

export default router