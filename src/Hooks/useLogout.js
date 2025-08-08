import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
const apiUrl=import.meta.env.VITE_API_URI;
const useLogout=()=>{
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate();
    const {setAuthUser} =useAuthContext();

    const LogoutUser=async()=>{

        try {
            setLoading(true)
            const res= await fetch(`${apiUrl}/api/v1/users/logout`,{
                method:"POST",

            })
            const data = await res.json();

            if(data.err) {
                toast.error(data.err);
                return
            }

            toast.success('Logged out successfully')
            localStorage.removeItem('$xyz');
            localStorage.removeItem('$yxz');
            setAuthUser({
                role:null,
                isActive:false
            })

            navigate('/login')
        } catch (error) {
            toast.error('Some error occured');
            console.log('error occured while logging out',error)
        }finally{
            setLoading(false);
        }
    }
    return {loading,LogoutUser}
}
export default useLogout;