import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { GiSightDisabled } from "react-icons/gi";
import { IoIosEye } from "react-icons/io";

import '../Styles/ManageEditors.css';
import { useAuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import useAddUser from '../Hooks/useAddUser';

const apiUrl = import.meta.env.VITE_API_URI;
const ManageEditors = () => {
  const { authUser , setAuthUser} = useAuthContext();
  const [authors, setAuthors] = useState(authUser.dashboard.totalAuthors);
  const {loading, AddUser}=useAddUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'reporter',
    password: '',
    gender: 'null',
    isActive: false,
    bio:''
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newAuthor = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      password: formData.password,
      gender: formData.gender,
      isActive: formData.isActive,
      bio: formData.bio
    };
    console.log(newAuthor)
    const added=await AddUser(newAuthor);
    if(!added) return;
    
    setAuthors([...authors, newAuthor]);
    setAuthUser((prev)=>({
        ...prev,
        dashboard: {
          ...prev.dashboard,
          totalAuthors:[
            ...(prev.dashboard?.totalAuthors || []),
             newAuthor        
          ]
        }
      }))
    setFormData({
      name: '',
      email: '',
      role: 'reporter',
      gender:'null',
      password:''
    });
  };

 
  const disableEnableUser = async (email, name, currStatus) => {
    const currStatusString = currStatus ? 'डिसेबल' : 'अनेबल';

    const confirm = window.confirm(`क्या आप ${name} को ${currStatusString} करना चाहते हैं`);
    if (!confirm) return;

    //operation is being done.
    const res = await fetch(`${apiUrl}/api/v1/users/changeactivenessuser`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email
      })

    });
    const data = await res.json();
    if (data.err) {
      toast.error(data.err)
      return
    }
    //updating the state for instant view
    if (data.message) {
      setAuthors((prev) =>
        prev.map(eachAuthor =>
          eachAuthor.email === email ? { ...eachAuthor, isActive: !eachAuthor.isActive } : eachAuthor
        )
      )
    }
    toast.success(data.message);
    return

  }

  return (
    <div className="manage-editors">
      <h2>लेखक/संपादक प्रबंधन</h2>

      <motion.div
        className="add-author"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3>नया लेखक जोड़ें</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="नाम"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="ईमेल"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="पासवर्ड "
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="बायो"
              // required
            />
          </div>
          <div className="form-group">
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="null">चुनें  </option>
              <option value="male">पुरुष </option>
              <option value="female">स्त्री</option>
            </select>
          </div>          


          <div className="form-group">
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="reporter">लेखक / इंटर्न </option>
              <option value="editor">संपादक</option>
            </select>
          </div>


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
        className="author-list"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h3>सभी लेखक/संपादक ({authors?.length})</h3>
        <div className="authors-table">
          <table>
            <thead>
              <tr>
                <th>नाम</th>
                <th>ईमेल</th>
                <th>भूमिका</th>
                <th>समाचार</th>
                <th>डिसेबल / अनेबल करें</th>
              </tr>
            </thead>
            <tbody>
              {authors?.map((author) => (
                <motion.tr
                  key={author._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td>{author.name}</td>
                  <td>{author.email}</td>
                  <td>{author.role === 'author' ? 'लेखक' : 'संपादक'}</td>
                  <td>{author.articles}</td>
                  <td className="actions">
                    <motion.button
                      className="action-btn edit relative group p-2 "
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => disableEnableUser(author.email, author.name, author.isActive)}
                    >

                      {author.isActive ? <GiSightDisabled /> : <IoIosEye />}
                      <div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                   px-2 py-1 rounded text-xs text-white bg-black 
                   whitespace-nowrap opacity-0 group-hover:opacity-100 
                   transition-opacity duration-200 z-50 pointer-events-none"
                      >
                        {author.isActive ? "Disable User" : "Enable User"}
                      </div>


                    </motion.button>

                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageEditors;