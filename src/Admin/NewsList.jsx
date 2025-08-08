import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEdit, FiTrash2, FiChevronDown, FiChevronUp, FiEyeOff } from 'react-icons/fi';
import '../Styles/NewsList.css';
import useFetchArticles from '../Hooks/useFetchArticles';
import { useAuthContext } from '../contexts/AuthContext';
import RedSpinner from '../components/RedSpinner';
import RedPulseSpinner from '../components/RedSpinner';

const NewsList = () => {
  const [page, setPage] = useState(1)
  const { loading, FetchArticles } = useFetchArticles();
  const { authUser, setAuthUser } = useAuthContext();
  const totalNews = authUser.dashboard.totalNews;
  // const maxPage= Math.ceil( totalNews/30);
  const maxPage = 4

  // const [articles, setArticles] = useState([
  //   {
  //     id: 1,
  //     title: 'केंद्र सरकार ने घोषित की नई शिक्षा नीति',
  //     category: 'राष्ट्रीय',
  //     date: '15 जुलाई 2023',
  //     views: 1250,
  //     status: 'published',
  //     content: 'नई दिल्ली: केंद्र सरकार ने आज नई शिक्षा नीति की घोषणा की जिसमें 5वीं कक्षा तक मातृभाषा में पढ़ाई पर जोर दिया गया है।'
  //   },
  //   {
  //     id: 2,
  //     title: 'महंगाई दर में गिरावट',
  //     category: 'अर्थव्यवस्था',
  //     date: '14 जुलाई 2023',
  //     views: 980,
  //     status: 'published',
  //     content: 'मुंबई: भारतीय रिजर्व बैंक के ताजा आंकड़ों के अनुसार महंगाई दर में 0.5% की गिरावट दर्ज की गई है।'
  //   }
  // ]);

  const [articles, setArticles] = useState([])
  useEffect(() => {
    const fetchAction = async () => {
      const fetchedArticles = await FetchArticles(page - 1);
      console.log(fetchedArticles);
      setArticles(fetchedArticles);


    }
    fetchAction();

  }, [page])
  const handlePublishUnpublish=async(id,publishedStatus)=>{
    const string = publishedStatus ? 'अनपब्लिश' : 'पब्लिश' ;
    const respond= window.confirm(`यह खबर ${string} कर दी जायेगी, कृपया दुबारा जांच लें `);
    console.log(respond)
    if(respond){
      setArticles((prev)=> prev.map((each)=> each._id===id ? {...each,published:!each.published}:each))
    }


  }
  const [expandedArticle, setExpandedArticle] = useState(null);


  const toggleExpandArticle = (id) => {
    setExpandedArticle(expandedArticle === id ? null : id);
  };

  const deleteArticle = (id) => {
    setArticles(articles.filter(article => article.id !== id));
  };
  if (loading) {
    return (
      <RedPulseSpinner />
    )
  }
  else {

    return (
      <div className="news-list">
        <h2>समाचार सूची</h2>

        <div className="articles-container">
          <AnimatePresence>
            {articles.map((article) => (
              <motion.div
                key={article._id}
                className="article-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <div
                  className="article-card-header"
                  onClick={() => toggleExpandArticle(article._id)}
                >
                  <h3>{article.title}</h3>
                  <motion.span
                    animate={{ rotate: expandedArticle === article._id ? 180 : 0 }}
                  >
                    {expandedArticle === article._id ? <FiChevronUp /> : <FiChevronDown />}
                  </motion.span>
                </div>

                <AnimatePresence>
                  {expandedArticle === article._id && (
                    <motion.div
                      className="article-card-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="detail-row">
                        <span>श्रेणी:</span>
                        <span>{article.category.name}</span>
                      </div>
                      <div className="detail-row">
                        <span>तिथि:</span>
                        {/* <span>{article.updatedAt}</span> */}
                        <span>{new Intl.DateTimeFormat('hi-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        }).format(new Date(article.updatedAt))}</span>
                      </div>
                      <div className="detail-row">
                        <span>पाठक:</span>
                        <span>{article.views.toLocaleString('hi-IN')}</span>
                      </div>
                      <div className="detail-row">
                        <span>स्थिति:</span>
                        <span className={`status-badge ${article.published ?' bg-green-300' :'bg-red-300'} `}>
                          {article.published  ? 'प्रकाशित' : 'ड्राफ्ट'}
                        </span>
                      </div>
                      <div className="article-content">
                        {article.content}
                      </div>
                      <div className="article-actions">
                        <motion.button
                          className="action-btn view"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePublishUnpublish(article._id, article.published)}
                        >
                          {article.published ? (
                            <>
                              <FiEyeOff className="inline mr-1" />
                              अनपब्लिश करें
                            </>
                          ) : (
                            <>
                              <FiEye className="inline mr-1" />
                              पब्लिश करें
                            </>
                          )}
                        </motion.button>
                        <motion.button
                          className="action-btn edit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FiEdit /> संपादित
                        </motion.button>
                        <motion.button
                          className="action-btn delete"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => deleteArticle(article.id)}
                        >
                          <FiTrash2 /> हटाएं
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* page buttons */}
        <div className="fixed bottom-0 left-0 w-full flex justify-center py-4  z-10">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 bg-gray-300 rounded disabled:opacity-50 ${page !== 1 ?
              'cursor-pointer' : 'cursor-not-allowed'} `}
          >
            {'<<'}
          </button>

          &nbsp;&nbsp;&nbsp;
          <span>Page {page}</span>
          &nbsp;&nbsp;&nbsp;

          <button
            onClick={() => setPage((prev) => prev + 1)}
            className={`px-4 py-2 bg-gray-300 rounded disabled:opacity-50 ${maxPage !== page ?
              'cursor-pointer' : 'cursor-not-allowed'} `}
            disabled={maxPage === page}

          >
            {'>>'}
          </button>
        </div>

      </div>
    );
  }
};

export default NewsList;