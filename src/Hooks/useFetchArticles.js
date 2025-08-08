import { useState } from "react"
import toast from "react-hot-toast";

const apiUrl=import.meta.env.VITE_API_URI;

const useFetchArticles=()=>{

    const [loading,setLoading]=useState(false);

    const FetchArticles=async(page)=>{
        try {
            setLoading(true);
            const res = await fetch(`${apiUrl}/api/v1/serve/articlesfordashboard`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                credentials:"include",
                body: JSON.stringify({
                    page,
                    limit:30
                })
            })
            const data= await res.json();
            if(data.err) {
                toast.error(data.err);
                return
            }
            if(data.message){
                return data.data;
            }
            
        } catch (error) {
            toast.error(error)
            return;
        }finally{
            setLoading(false);
        }
    }
    return {loading,FetchArticles};
}
export default useFetchArticles;