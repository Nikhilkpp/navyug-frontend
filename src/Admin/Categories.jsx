import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../Styles/Categories.css';
import { useAuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URI

const Categories = () => {
  const {authUser,setAuthUser}=useAuthContext();
  const [categories, setCategories] = useState(authUser.dashboard.totalCategories);
  const [newCategory, setNewCategory] = useState('');
  const [slugCategory, setSlugCategory] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
   
    const res= await fetch(`${apiUrl}/api/v1/category/addcategory`,{
      method:"POST",
      credentials:"include",
      headers:{"Content-Type":"application/json"},

      body: JSON.stringify({
        category: newCategory,
        slug: slugCategory
      })
    })
    const data= await res.json();
    
    if(data.err) {
      toast.error(data.err);
      console.log(data.err)
      return;

    }
    if(data.message){
      toast.success(data.message);
      setCategories((prev)=>([
          ...prev,
        {
          _id: `new${newCategory}`,
          name: newCategory,
          slug: slugCategory
        }
      ]))
      setNewCategory('');
      
      navigate('/dashboard');
    }
  };

  

  return (
    <div className="categories">
      <h2>श्रेणी प्रबंधन</h2>
      
      <motion.div 
        className="add-category"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3>नई श्रेणी जोड़ें</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={newCategory}
            onChange={(e) => {setNewCategory(e.target.value)
              setSlugCategory(e.target.value)
            }}
            placeholder="श्रेणी नाम"
            required
          />
          <input 
            disabled
            value={newCategory.replace(/\s+/g, '')}
            placeholder="श्रेणी स्लग"
            required
          />
          <motion.button 
            type="submit" 
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            जोड़ें
          </motion.button>
        </form>
      </motion.div>
      
      <motion.div 
        className="category-list"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h3>सभी श्रेणियाँ ({categories.length})</h3>
        <div className="category-grid">
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              className="category-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span>{category.name}</span>
              
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Categories;