import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import './Styles/Login.css';
import logo from './assets/logo.png'; 
import useLogin from './Hooks/useLogin';
import CookieConsent from './components/cookieConsent';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {loading , LoginUser} = useLogin();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Simulate API call
    await LoginUser({email,password});

   
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hover: { y: -5, boxShadow: "0 10px 25px rgba(220, 38, 38, 0.2)" },
    tap: { scale: 0.98 }
  };
  

  return (
    <div className="login-page">
        
      <motion.div 
        className="login-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div 
          className="login-header"
          variants={itemVariants}
        >
          <div className="logo">
            {/* <span className="logo-text">समाचार</span> */}
            <img className='' src={logo} alt='NavyugTv'></img>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to access your news dashboard</p>
        </motion.div>

        {/* Login Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="login-form"
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {/* Email Field */}
          <motion.div 
            className="form-group"
            variants={itemVariants}
          >
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div 
            className="form-group"
            variants={itemVariants}
          >
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </motion.div>

          {/* Remember Me & Forgot Password */}
          

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="login-button"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                Sign In <FiArrowRight className="button-icon" />
              </>
            )}
          </motion.button>

          {/* Divider */}
          

          {/* Social Login */}
          
        </motion.form>

        {/* Sign Up Link */}
        
      </motion.div>

      {/* Background Elements */}
      <div className="login-bg-elements">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
    </div>
  );
};

export default Login;