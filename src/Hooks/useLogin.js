const apiUrl = import.meta.env.VITE_API_URI;
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
const useLogin = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setAuthUser } = useAuthContext();

    const LoginUser = async ({ email, password }) => {



        try {
            setLoading(true)
            const hasConsent = localStorage.getItem("cookiesAccepted");
            if (!hasConsent) {
                toast.error("Please accept cookies to log in");
                
            }

            const res = await fetch(`${apiUrl}/api/v1/users/login`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            })

            const data = await res.json();
            if (data.err) {
                toast.error(data.err);
                return;
            }
            // console.log(data);
            if (!data.user.isActive) {
                toast.error('You have been restricted from login');
                return
            }
            toast.success('Logged in successfully');

            const role = data.user.role;
            let encryptedRole;

            if (role === 'admin') {
                encryptedRole = '@321$BS1'
            } else if (role === 'editor') {
                encryptedRole = '@213#AA5'
            } else {
                encryptedRole = '@12#3xyA'
            }
            setAuthUser({
                role: encryptedRole,
                isActive: 1
            })
            localStorage.setItem('cookiesAccepted', true);

            localStorage.setItem('$xyz', encryptedRole);
            localStorage.setItem('$yxz', data.user.isActive ? 1 : 0)
            navigate('/dashboard')
        } catch (error) {
            console.log("An error occured while login", error);
            toast.error(data.err)

        } finally {
            setLoading(false)
        }
    }
    return { loading, LoginUser }
}
export default useLogin;
