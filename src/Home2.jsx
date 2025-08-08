import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMenu, FiX, FiClock, FiShare2, FiBookmark } from 'react-icons/fi';
import './Home2.css';
import logo from './assets/logo.png'; 
import { SocialIcon } from 'react-social-icons'


const Home2 = () => {
  const [activeCategory, setActiveCategory] = useState('मुख्य समाचार');
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in a real app, you would fetch this from an API
  useEffect(() => {
    const fetchNews = async () => {
      // Simulate API call
      setTimeout(() => {
        setNewsData([
          {
            id: 1,
            title: 'केंद्र सरकार ने घोषित की नई शिक्षा नीति, 2023',
            category: 'राष्ट्रीय',
            excerpt: 'नई दिल्ली: केंद्र सरकार ने आज नई शिक्षा नीति की घोषणा की जिसमें 5वीं कक्षा तक मातृभाषा में पढ़ाई पर जोर दिया गया है।',
            time: '2 घंटे पहले',
            image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            views: '1.2k',
            isBreaking: false
          },
          {
            id: 2,
            title: 'महंगाई दर में गिरावट, RBI के आंकड़ों में दिखा सुधार',
            category: 'अर्थव्यवस्था',
            excerpt: 'मुंबई: भारतीय रिजर्व बैंक के ताजा आंकड़ों के अनुसार महंगाई दर में 0.5% की गिरावट दर्ज की गई है।',
            time: '4 घंटे पहले',
            image: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            views: '856',
            isBreaking: false
          },
          {
            id: 3,
            title: 'आईपीएल 2023: मुंबई इंडियंस ने जीता खिताब',
            category: 'खेल',
            excerpt: 'चेन्नई: आईपीएल के फाइनल मुकाबले में मुंबई इंडियंस ने चेन्नई सुपर किंग्स को 5 विकेट से हराया।',
            time: '6 घंटे पहले',
            image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            views: '3.5k',
            isBreaking: true
          },
          {
            id: 4,
            title: 'हॉलीवुड अभिनेता की भारत यात्रा, बॉलीवुड के साथ प्रोजेक्ट पर चर्चा',
            category: 'मनोरंजन',
            excerpt: 'मुंबई: प्रसिद्ध हॉलीवुड अभिनेता XYZ भारत पहुंचे और कई बॉलीवुड निर्माताओं से मुलाकात की।',
            time: '8 घंटे पहले',
            image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            views: '2.1k',
            isBreaking: false
          },
          {
            id: 5,
            title: 'नई तकनीक से किसानों को मिलेगा फायदा, कृषि मंत्री ने किया ऐलान',
            category: 'कृषि',
            excerpt: 'नई दिल्ली: केंद्रीय कृषि मंत्री ने आज एक नई तकनीक का ऐलान किया जिससे किसानों की आय दोगुनी होने की उम्मीद है।',
            time: '10 घंटे पहले',
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            views: '723',
            isBreaking: false
          },
          {
            id: 6,
            title: 'वैज्ञानिकों ने खोजा नया ग्रह, पृथ्वी जैसी परिस्थितियों की संभावना',
            category: 'विज्ञान',
            excerpt: 'अंतरिक्ष: अंतर्राष्ट्रीय वैज्ञानिकों की टीम ने हमारे सौर मंडल से बाहर एक नए ग्रह की खोज की है जहां जीवन की संभावना हो सकती है।',
            time: '12 घंटे पहले',
            image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            views: '1.8k',
            isBreaking: true
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchNews();
  }, []);

  const categories = [
    'मुख्य समाचार',
    'राष्ट्रीय',
    'अंतर्राष्ट्रीय',
    'राज्य',
    'अर्थव्यवस्था',
    'खेल',
    'मनोरंजन',
    'विज्ञान',
    'टेक्नोलॉजी',
    'कृषि'
  ];

  const filteredNews = activeCategory === 'मुख्य समाचार' 
    ? newsData.filter(news => 
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : newsData.filter(news => 
        news.category === activeCategory && 
        (news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const categoryItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#d70000",
      color: "#fff"
    }
  };

  const mobileMenuVariants = {
    hidden: { x: '-100%' },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      x: '-100%',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (

    <>

    <div className="home-container">


    <header className="header">
      
        <div className="logo-container">
          <img src={logo} alt="समाचार भारत" className="site-logo" />
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="site-title"
          >
            {/* समाचार भारत */}
            नवयुग TV
          </motion.h1>
        </div>
        <div className="search-bar">
          {/* <p>हमसे जुड़े...</p> */}
          <div className='w-40 flex  justify-between'>
            <div className='w-15'>

            <SocialIcon url="https://twitter.com/123" />
            </div>
            <div className='w-15'>

            <SocialIcon url="https://instagram.com" />
            </div>
            <div className='w-15'>

            <SocialIcon url="https://facebook.com" />
            </div>

          </div>
        </div>
      </header>


      {/* Top Bar with Mobile Menu */}
      <div className="top-bar">
        <div className='cat-button'>
            <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FiMenu size={24} />
          </button>
        </div>
        <div className="logo-container">
          <img src={logo} alt="समाचार भारत" className="mobile-logo site-logo" />
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="site-title"
          >
            {/* समाचार भारत */}
            नवयुग TV
          </motion.h1>
        </div>       
        
        
        
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <button 
              className="close-menu-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiX size={24} />
            </button>
            
            <div className="mobile-search">
              <input 
                type="text" 
                placeholder="खोजें..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button><FiSearch /></button>
            </div>
            
            <nav className="mobile-categories">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`mobile-category-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(category);
                    setMobileMenuOpen(false);
                  }}
                >
                  {category}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      

      {/* Breaking News Ticker */}
      <div className="breaking-news">
        <div className="ticker-label">ताजा खबर:</div>
        <div className="ticker-content">
          <motion.div
            animate={{ x: [-100, -2000] }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="ticker-text"
          >
            • केंद्र सरकार ने नई शिक्षा नीति की घोषणा की • महंगाई दर में 0.5% की गिरावट • आईपीएल 2023 का खिताब मुंबई इंडियंस ने जीता • हॉलीवुड अभिनेता भारत पहुंचे • वैज्ञानिकों ने नए ग्रह की खोज की
          </motion.div>
        </div>
      </div>

      {/* Category Navigation */}
      <motion.nav 
        className="category-nav"
        initial="hidden"
        animate="visible"
        variants={categoryVariants}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
            variants={categoryItemVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.nav>

      {/* Main Content */}
      <main className="main-content">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>समाचार लोड हो रहे हैं...</p>
          </div>
        ) : (
          <>
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {activeCategory}
              {searchQuery && (
                <span className="search-results-text"> - "{searchQuery}" के लिए परिणाम</span>
              )}
            </motion.h2>

            {filteredNews.length === 0 ? (
              <div className="no-results">
                <p>कोई समाचार नहीं मिला</p>
              </div>
            ) : (
              <div className="news-grid">
                {filteredNews.map((news, index) => (
                  <motion.article
                    key={news.id}
                    className={`news-card ${news.isBreaking ? 'breaking' : ''}`}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    custom={index}
                  >
                    <div className="card-image">
                      <img src={news.image} alt={news.title} loading="lazy" />
                      <span className="category-badge">{news.category}</span>
                      {news.isBreaking && (
                        <span className="breaking-badge">ताजा खबर</span>
                      )}
                    </div>
                    <div className="card-content">
                      <h3>{news.title}</h3>
                      <p>{news.excerpt}</p>
                      <div className="card-footer">
                        <div className="meta-info">
                          <span className="time"><FiClock /> {news.time}</span>
                          <span className="views">देखे गए: {news.views}</span>
                        </div>
                        <div className="action-buttons">
                          <button className="share-btn"><FiShare2 /></button>
                          <button className="bookmark-btn"><FiBookmark /></button>
                          <button className="read-more">पढ़ें</button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>हमारे बारे में</h4>
            <p>समाचार भारत - सटीक और त्वरित समाचारों के लिए</p>
          </div>
          <div className="footer-section">
            <h4>संपर्क करें</h4>
            <p>ईमेल: contact@samacharbharat.com</p>
            <p>फोन: +91 1234567890</p>
          </div>
          <div className="footer-section">
            <h4>सोशल मीडिया</h4>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 समाचार भारत. सर्वाधिकार सुरक्षित.</p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Home2;