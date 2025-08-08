import { useState } from "react"
import toast from "react-hot-toast";
const apiUrl=import.meta.env.VITE_API_URI

const useAddUser=()=>{
    const [loading,setLoading]=useState(false);

    const AddUser=async(newAuthor)=>{
        try {
            setLoading(true);
            const success=handleUserData(newAuthor);

            if(!success) return false;

             const res = await fetch(`${apiUrl}/api/v1/users/adduser`,{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              credentials:"include",
              body: JSON.stringify(newAuthor)
            })
            const data=await res.json();

            if(data.err){
                toast.error(data.err);
                return false;
            }
            if(data.message){
                toast.success(data.message);
                return true;
            }
    
            // return true;


        } catch (error) {
            
            toast.error(error);
            return false;

        }finally{
            setLoading(false);
        }
    }
    return {loading, AddUser}
}
export default useAddUser;

const handleUserData=(newAuthor)=>{

    if(newAuthor.gender == 'null'){
        alert('श्रीमान कृपया करके इनका लिंग तो चुनें');
        return false;
    }
    if(newAuthor.password.length<6){
        alert('Password must be grater than 6');
        return false;
    }
    else{
        return true
    }

}