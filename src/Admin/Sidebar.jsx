import React, { forwardRef } from 'react';
import { FiPlus, FiUsers, FiFileText, FiPieChart, FiCalendar, FiUser } from 'react-icons/fi';
import '../Styles/Sidebar.css';



 const Sidebar = forwardRef(({ activeTab, setActiveTab, visible }, ref) => {
  return (
    <div ref={ref} className={`admin-sidebar ${visible ? 'visible' : ''}`}>
      <div className="sidebar-header">
        <h2>समाचार प्रशासन</h2>
      </div>
      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FiUser  /> Profile
        </button>
        <button 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <FiPieChart /> डैशबोर्ड
        </button>
        <button 
          className={`nav-item ${activeTab === 'add-news' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-news')}
        >
          <FiPlus /> समाचार जोड़ें
        </button>
        <button 
          className={`nav-item ${activeTab === 'news-list' ? 'active' : ''}`}
          onClick={() => setActiveTab('news-list')}
        >
          <FiFileText /> समाचार सूची
        </button>
        <button 
          className={`nav-item ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          <FiPlus /> श्रेणियाँ
        </button>
        <button 
          className={`nav-item ${activeTab === 'authors' ? 'active' : ''}`}
          onClick={() => setActiveTab('authors')}
        >
          <FiUsers /> लेखक/संपादक
        </button>
        <button 
          className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <FiCalendar /> विश्लेषण
        </button>
      </nav>
    </div>
  );
});
export default Sidebar;
