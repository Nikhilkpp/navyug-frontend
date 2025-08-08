import { useState } from "react"
import toast from "react-hot-toast";

const apiUrl=import.meta.env.VITE_API_URI;
const useCreateArticle=()=>{

    const [loading,setLoading] = useState(false);

    const CreateArticle = async(formData)=>{
        try {
            setLoading(true);
            if(formData.content.length === 0){
            toast.error('Please fill in the content section');
            return false;
            }
            const form = new FormData();

            form.append('title',formData.title);
            form.append('category', formData.category);
            form.append('state',formData.state);

            if(formData.image1) form.append('image1',formData.image1);
            if(formData.image2) form.append('image2',formData.image2);
            if(formData.image3) form.append('image3',formData.image3);

            if(formData.caption1) form.append('caption1',formData.caption1);
            if(formData.caption2) form.append('caption2',formData.caption2);
            if(formData.caption3) form.append('caption3',formData.caption3);

            form.append('content',formData.content)
            form.append('freshness',formData.freshness);


            const res = await fetch(`${apiUrl}/api/v1/article/createarticle`,{
                method:"POST",
                credentials:"include",
                body: form
            })
            const data = await res.json();
            if(data.err){
                toast.error(data.err);
                return false;
            }
            if(data.message){
                toast.success(data.message);
                return true;
            }
        } catch (error) {
            toast.error(error);
            return false;
            
        }finally{
            setLoading(false);
        }


    }
    return {loading, CreateArticle};
}
export default useCreateArticle;

