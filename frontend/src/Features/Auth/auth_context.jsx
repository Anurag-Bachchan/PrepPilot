import {createContext, useEffect, useState} from 'react';
import { getMe } from './services/auth_api';

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const getAndSetUser=async()=>{
            setLoading(true);
            try{
                const response=await getMe();
                setUser(response.user);
            } catch (error) {
                //user is simply not logged in yet, nothing to report to the user
            } finally {
                setLoading(false);
            }
        };

        getAndSetUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
}