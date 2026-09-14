import {createBrowserRouter} from "react-router";
import Login from "./Features/Auth/Pages/Login";
import Register from "./Features/Auth/Pages/Register";
import Protected from "./Features/Auth/Components/Protected";
import Interview from "./Features/Interview/Pages/Interview";
import Home from "./Features/Interview/Pages/Home"

export const router=createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path:"/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    }
])