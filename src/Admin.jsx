import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Admin/Sidebar';
import Dashboard from './Admin/Dashboard';
import AddNews from './Admin/AddNews';
import NewsList from './Admin/NewsList';
import Categories from './Admin/Categories';
import ManageEditors from './Admin/ManageEditors';
import Analytics from './Admin/Analytics';
import User from './Admin/User';
import './Styles/Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);
  const user = {
  name: "Nikhil Pathak",
  email: "nikhilpathak781@gmail.com",
  role: "admin", // could also be "editor", "reporter"
  avatar: "https://i.pravatar.cc/150?img=12", // or your own avatar URL
  createdAt: "2024-10-21T10:30:00.000Z",
  active: true
};



  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarVisible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setSidebarVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarVisible]);

  const renderTab = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'add-news': return <AddNews />;
      case 'news-list': return <NewsList />;
      case 'categories': return <Categories />;
      case 'authors': return <ManageEditors />;
      case 'analytics': return <Analytics />;
      case 'profile': return <User user={user} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="admin-container">
      {!sidebarVisible && <div className='side-area'> </div>  }
      
        {!sidebarVisible  && <button className="sidebar-toggle" onClick={() => setSidebarVisible(!sidebarVisible)}>
          {sidebarVisible ? `X` : `☰`}
        </button>}
     
    
      <Sidebar ref={sidebarRef}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSidebarVisible(false); // close sidebar on selection (optional)
        }}
        visible={sidebarVisible}
      />

      <div className="admin-content">
        {renderTab()}
      </div>
    </div>
  );
};

export default Admin;
