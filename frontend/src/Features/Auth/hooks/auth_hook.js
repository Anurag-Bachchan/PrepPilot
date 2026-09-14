import {useContext} from 'react';
import { AuthContext } from '../auth_context';
import {login, register, logout} from "../services/auth_api"

export const useAuth=()=> {
    const authContext = useContext(AuthContext);
    const {user,setUser,loading,setLoading} = authContext;
    
    const handleLogin=async({email,password})=>{
        setLoading(true);
        try{
            const response=await login({email,password})
            setUser(response.user);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleRegister=async({username,email,password})=>{
        setLoading(true);
        try{
            const response=await register({username,email,password});
            setUser(response.user);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }
    
    const handleLogout=async()=>{
        setLoading(true);
        try{
            await logout();
            setUser(null);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {user,loading,handleLogin,handleRegister,handleLogout};
}