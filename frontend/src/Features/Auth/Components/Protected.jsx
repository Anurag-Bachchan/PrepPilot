import { useAuth } from "../hooks/auth_hook";
import { Navigate } from "react-router";
import Loader from "../../../Shared/Loader";

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return <Loader message="Checking your session..." />
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected;