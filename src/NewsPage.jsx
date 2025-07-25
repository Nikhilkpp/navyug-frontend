import React from 'react';
import { useParams } from 'react-router-dom';
import { FiClock, FiShare2, FiBookmark, FiArrowLeft } from 'react-icons/fi';
import './NewsPage.css';

const NewsPage = () => {
  const { id } = useParams();
  
  // Mock data - in real app you would fetch this based on the ID
  const article = {
    id: 1,
    title: 'केंद्र सरकार ने घोषित की नई शिक्षा नीति, 2023',
    category: 'राष्ट्रीय',
    content: `
      <p>नई दिल्ली: केंद्र सरकार ने आज नई शिक्षा नीति की घोषणा की जिसमें 5वीं कक्षा तक मातृभाषा में पढ़ाई पर जोर दिया गया है। शिक्षा मंत्री ने बताया कि यह नीति 21वीं सदी की आवश्यकताओं को ध्यान में रखकर बनाई गई है।</p>
      
      <p>मुख्य बिंदु:</p>
      <ul>
        <li>5वीं तक मातृभाषा में शिक्षा</li>
        <li>10+2 प्रणाली को 5+3+3+4 में बदला गया</li>
        <li>उच्च शिक्षा में बहु-विषयक दृष्टिकोण</li>
        <li>विद्यार्थियों को कला, विज्ञान और वाणिज्य स्ट्रीम के बीच स्विच करने की स्वतंत्रता</li>
      </ul>
      
      <p>शिक्षा मंत्री ने कहा, "यह नीति भारत को ज्ञान आधारित अर्थव्यवस्था बनाने की दिशा में महत्वपूर्ण कदम है। हमने शिक्षा प्रणाली में लचीलापन लाने पर विशेष ध्यान दिया है।"</p>
      
      <p>नई नीति के तहत स्कूलों में कोडिंग और आर्टिफिशियल इंटेलिजेंस जैसे नए विषयों को भी शामिल किया जाएगा। विशेषज्ञों का मानना है कि यह नीति भारतीय शिक्षा प्रणाली में क्रांतिकारी बदलाव लाएगी।</p>
    `,
    author: 'रमेश कुमार',
    date: '15 जुलाई 2023',
    time: '2 घंटे पहले',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    views: '1.2 लाख',
    isBreaking: true,
    tags: ['शिक्षा', 'नीति', 'सरकार']
  };

  const relatedArticles = [
    {
      id: 2,
      title: 'नई शिक्षा नीति पर राज्यों की प्रतिक्रिया',
      category: 'राष्ट्रीय',
      time: '1 घंटे पहले',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      title: 'शिक्षकों के लिए नई ट्रेनिंग योजना',
      category: 'राष्ट्रीय',
      time: '3 घंटे पहले',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 4,
      title: 'केंद्रीय बजट में शिक्षा को मिला रिकॉर्ड आवंटन',
      category: 'अर्थव्यवस्था',
      time: '1 दिन पहले',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    }
  ];

  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing article...');
  };

  const handleBookmark = () => {
    // Implement bookmark functionality
    console.log('Bookmarking article...');
  };

  return (
    <div className="news-page">
      {/* Article Header */}
      <header className="article-header">
        <button className="back-button" onClick={() => window.history.back()}>
          <FiArrowLeft /> वापस
        </button>
        <div className="header-actions">
          <button className="share-button" onClick={handleShare}>
            <FiShare2 /> साझा करें
          </button>
          <button className="bookmark-button" onClick={handleBookmark}>
            <FiBookmark /> बुकमार्क
          </button>
        </div>
      </header>

      {/* Main Article Content */}
      <main className="article-content">
        <div className="article-meta">
          <span className="article-category">{article.category}</span>
          {article.isBreaking && <span className="breaking-badge">ताजा खबर</span>}
          <span className="article-date"><FiClock /> {article.date} • {article.time}</span>
        </div>
        
        <h1 className="article-title">{article.title}</h1>
        
        <div className="article-author">रिपोर्टर: {article.author}</div>
        
        <div className="article-image-container">
          <img src={article.image} alt={article.title} className="article-image" />
          <div className="image-caption">नई शिक्षा नीति पर बोलते शिक्षा मंत्री</div>
        </div>
        
        <div 
          className="article-text" 
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
        
        <div className="article-tags">
          {article.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        
        <div className="article-views">पढ़े गए: {article.views}</div>
      </main>

      {/* Related Articles */}
      <section className="related-articles">
        <h2 className="section-title">संबंधित खबरें</h2>
        <div className="related-articles-grid">
          {relatedArticles.map(article => (
            <div key={article.id} className="related-article-card">
              <img src={article.image} alt={article.title} className="related-article-image" />
              <div className="related-article-content">
                <span className="related-article-category">{article.category}</span>
                <h3 className="related-article-title">{article.title}</h3>
                <span className="related-article-time"><FiClock /> {article.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comments Section */}
      <section className="comments-section">
        <h2 className="section-title">टिप्पणियाँ</h2>
        <div className="comment-form">
          <textarea placeholder="अपनी टिप्पणी लिखें..." className="comment-input"></textarea>
          <button className="comment-submit">टिप्पणी सबमिट करें</button>
        </div>
        <div className="comments-list">
          {/* Comments would be rendered here */}
          <p className="no-comments">अभी तक कोई टिप्पणी नहीं। पहली टिप्पणी करने वाले बनें!</p>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;