import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../Styles/User.css';
import useLogout from '../Hooks/useLogout';
import toast from 'react-hot-toast';
const apiUrl=import.meta.env.VITE_API_URI;

const User = () => {
   const [user,setUser] = useState({
    name: "",
    role: "",
    avatar:null,
    email:"",
    createdAt: "",
    active: true,
    bio: "",
    stats: {
      articles: 142,
    }
  });
  useEffect(()=>{

    const fetchData=async()=>{
      
      const res = await fetch(`${apiUrl}/api/v1/users/fetchuser`,{
        method:"GET",
        credentials:"include"
      });
      const userDetails = await res.json();
      if(userDetails.err) {
        toast.error("An error occured, please try after some time");
        return
      }
      setUser({
        name: userDetails.user.name,
        role: userDetails.user.role ==='reporter' ? 'Intern':userDetails.user.role ,
        avatar:userDetails.user.avatar,
        email:userDetails.user.email,
        createdAt: userDetails.user.createdAt,
        active: true,
        bio: "Journalism enthusiast",
        stats: {
          articles: 142,        
        }
      })


    }
    fetchData();
  },[])

  // console.log(userDetails)
 
  
  const [activeTab, setActiveTab] = useState('profile');

  const {loading,LogoutUser}=useLogout();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLogout=async()=>{
    await LogoutUser();


  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const cardVariants = {
    hover: { y: -10, boxShadow: "0 15px 30px rgba(220, 38, 38, 0.2)" },
    tap: { scale: 0.98 }
  };

  const badgeVariants = {
    hidden: { scale: 0, rotate: -20 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-6"
          variants={itemVariants}
        >
          <h1 className="text-3xl font-bold text-red-700 mb-2">Profile</h1>
          <p className="text-red-500">Your trusted source for journalism</p>
        </motion.div>
        
        {/* User Card */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-red-200"
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          variants={cardVariants}
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 text-center relative">
            <div className="absolute top-4 right-4">
              <motion.div 
                className="w-3 h-3 rounded-full bg-green-400 shadow-lg"
                variants={badgeVariants}
                animate={user.active ? "visible" : "hidden"}
              />
            </div>
            {/* avatar */}
            <motion.div 
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto mb-4 overflow-hidden"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring" }}
            >
              <div className="bg-red-300 w-full h-full flex items-center justify-center">
                {/* <span className="text-4xl text-white font-bold">RS</span> */}
                <img src={user.avatar} alt="" />
              </div>
            </motion.div>
            {/* user name */}
            <motion.h2 
              className="text-xl font-bold text-white"
              whileHover={{ scale: 1.05 }}
            >
              {user.name}
            </motion.h2>

            {/* user role */}
            <motion.p 
              className="text-red-100 mt-1"
              whileHover={{ scale: 1.05 }}
            >
              {user.role}
            </motion.p>
          </div>
          
          {/* Stats */}
          <motion.div 
            className=" p-4 bg-red-50 "
            variants={containerVariants}
          >
            {Object.entries(user.stats).map(([key, value], index) => (
              <motion.div 
                key={key}
                className="text-center p-3 bg-white rounded-lg shadow-sm"
                variants={itemVariants}
                whileHover={{ y: -5, backgroundColor: "#fef2f2" }}
              >
                <p className="text-sm text-red-500 capitalize">{key}</p>
                <p className="font-bold text-lg text-red-700">{value}</p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Tabs */}
          {/* profile tab  */}
          <div className="flex border-b border-red-100">
            {['profile'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  activeTab === tab 
                    ? 'text-red-700 border-b-2 border-red-700' 
                    : 'text-gray-500 hover:text-red-600'
                }`}
               
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <motion.div 
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* profile tab content */}

            {/* profile info viewer */}
            {activeTab === 'profile' && (
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-red-600 mb-1">About</h3>
                  <p className="text-gray-700">{user.bio}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Joined</p>
                      <p className="text-gray-900">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="text-gray-900">
                        {user.active ? (
                          <span className="text-green-600 font-medium">Active</span>
                        ) : (
                          <span className="text-red-600 font-medium">Inactive</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            
            
          </motion.div>
          
          {/* Footer Actions */}
          <div className="p-4 bg-red-50 border-t border-red-100 flex justify-between">
            
            
            {/* logout button */}
            <motion.button
              className={`px-4 py-2 font-medium rounded-lg shadow-sm 
                bg-red-400 text-white
                 
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
            >
              Logout
            </motion.button>
          </div>
        </motion.div>
        
       
        {/* Footer */}
        <motion.div 
          className="text-center mt-8 text-red-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>News Portal Profile System • v2.4</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default User;