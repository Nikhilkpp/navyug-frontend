import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext=createContext();

export const useAuthContext =()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children})=>{
    const apiUrl = import.meta.env.VITE_API_URI;

    const role=localStorage.getItem('$xyz') || null;
    const isActive=localStorage.getItem('$yxz') || null;
    const [authUser,setAuthUser]=useState({role,isActive,dashboard:null});
    const [loading,setLoading]=useState(false);
    

    return <AuthContext.Provider value={{authUser,setAuthUser,loading}}>
        {children}
    </AuthContext.Provider>
}