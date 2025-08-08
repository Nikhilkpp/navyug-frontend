import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../Styles/Dashboard.css';
import toast from 'react-hot-toast';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import useFetchArticles from '../Hooks/useFetchArticles';
import RedPulseSpinner from '../components/RedSpinner';
const apiUrl=import.meta.env.VITE_API_URI;

const Dashboard = () => {
  const {authUser,setAuthUser}=useAuthContext()
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const [stats,setStats]=useState([
    { title: 'कुल पाठक', value: 0 },
    { title: 'कुल समाचार', value:0 },
    { title: 'कुल श्रेणियाँ', value:0 },
    { title: 'कुल लेखक', value: 0}
  ])
  const {FetchArticles}=useFetchArticles();
  const [recentArticles,setRecentArticles]=useState([])
  useEffect(()=>{
    const fetchData=async()=>{

      try {
        setLoading(true);
        //fethching articles for the recent news shown below
        const fetchedArticles = await FetchArticles(0);
        setRecentArticles(fetchedArticles)

        //this fetching is done to fetch the dashboard data and update the auth contexh accordingly
        const res = await fetch(`${apiUrl}/api/v1/users/dashboard`,{
          method:"GET",
          credentials:"include"
        })
        const data = await res.json();
        // console.log(data)
        if(data.notActive){
          toast.error("oops something went wrong try logging again");
          localStorage.removeItem('$xyz');
          localStorage.removeItem('$yxz');
          setAuthUser((prev)=>({
            ...prev,
            role:null,
            isActive:0
          }))
          // console.log(authUser)
          navigate('/login');
  
          return;
  
        }
        if (data.err){
          toast.error(data.err);
          return;
        }
        toast.success('Dashboard data fetched successfully')
        setAuthUser((prev)=>({
          ...prev,
          dashboard:data.data
        }))
        setStats([
          { title: 'कुल पाठक', value: data.data.totalViews ||0 },
          { title: 'कुल समाचार', value: data.data.totalNews ||0 },
          { title: 'कुल श्रेणियाँ', value: data.data.totalCategories.length ||0 },
          { title: 'कुल लेखक', value:data.data.totalAuthors.length ||0}
        ])
      } catch (error) {
        console.log('error at dashboard page',error)
        
      }finally{
        setLoading(false);
      }


    }
    fetchData();

  },[])
  
  
  if(loading){
    return (
      <RedPulseSpinner/>
    )
  }else{ 

    return (
      <div className="dashboard">
        <h2>डैशबोर्ड</h2>
        
        <div className="stats-grid-dashboard">
          {stats?.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3>{stat.title}</h3>
              <p>{stat.value.toLocaleString('hi-IN')}</p>
            </motion.div>
          ))}
        </div>

        <div className="recent-articles">
          <h3>हाल के समाचार</h3>
          <table>
            <thead>
              <tr>
                <th>शीर्षक</th>
                <th>श्रेणी</th>
                <th>तिथि</th>
                <th>पाठक</th>
                <th>स्थिति</th>
              </tr>
            </thead>
            <tbody>
              {recentArticles?.map((article) => (
                <tr key={article._id}>
                  <td>{article.title}</td>
                  <td>{article.category.name}</td>
                  <td>{new Intl.DateTimeFormat('hi-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        }).format(new Date(article.updatedAt))}</td>
                  <td>{article.views.toLocaleString('hi-IN')}</td>
                  <td>
                    <span className={`status-badge ${article.published ? 'bg-green-300':'bg-green-300'}`}>
                      {article.published ? 'प्रकाशित' : 'ड्राफ्ट'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}
};

export default Dashboard;
