import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../Styles/AddNews.css';
import ThreeImageUploader from '../components/ThreeImageUploader';
import SimpleEditor from '../components/myEditor';
import { caption } from 'framer-motion/client';
import useCreateArticle from '../Hooks/useCreateArticle';
import { useAuthContext } from '../contexts/AuthContext';

const AddNews = () => {
  const [images, setImages] = useState([]);
  const [cations,setCaptions]=useState([]);
  const {loading, CreateArticle}=useCreateArticle();
  const {authUser}=useAuthContext();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    state: '',

    image1: null,
    caption1: null,
    image2: null,
    caption2: null,
    image3: null,
    caption3: null,

    content: [],

    freshness: false
  });

  const categories = authUser.dashboard.totalCategories;
  const states = [
    "आंध्र प्रदेश",
    "अरुणाचल प्रदेश",
    "असम",
    "बिहार",
    "छत्तीसगढ़",
    "गोवा",
    "गुजरात",
    "हरियाणा",
    "हिमाचल प्रदेश",
    "झारखंड",
    "कर्नाटक",
    "केरल",
    "मध्य प्रदेश",
    "महाराष्ट्र",
    "मणिपुर",
    "मेघालय",
    "मिजोरम",
    "नगालैंड",
    "ओडिशा",
    "पंजाब",
    "राजस्थान",
    "सिक्किम",
    "तमिलनाडु",
    "तेलंगाना",
    "त्रिपुरा",
    "उत्तर प्रदेश",
    "उत्तराखंड",
    "पश्चिम बंगाल",

    // Union Territories (केंद्र शासित प्रदेश)
    "अंडमान और निकोबार द्वीपसमूह",
    "चंडीगढ़",
    "दादरा और नगर हवेली और दमन और दीव",
    "दिल्ली",
    "जम्मू और कश्मीर",
    "लद्दाख",
    "पुडुचेरी",
    "लक्षद्वीप"
  ];

  const handleGetImages = (arrayOfImages) => {
    setImages(arrayOfImages);

    const updatedImages = {};

    arrayOfImages.forEach((image, index) => {
      if (image.file !== null) {
        updatedImages[`image${index + 1}`] = image.file; // This creates image1, image2, etc.
      }
    });

    setFormData((prev) => ({
      ...prev,
      ...updatedImages
    }));

  }
  const handleGetCaptions=(arrayOfCaptions)=>{
    setCaptions(arrayOfCaptions);
    const updatedCaptions ={};
    arrayOfCaptions.forEach((caption,index)=>{
      if(caption.length > 0){
        updatedCaptions[`caption${index+1}`]=caption
      }
    })
    setFormData((prev)=>({
      ...prev,
      ...updatedCaptions
    }))

  }
  const handleGetContent = (editorContent) => {
    setFormData((prev) => ({
      ...prev,
      content: editorContent
    }));
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Payload is: ',formData)
    const success = await CreateArticle(formData);
    
    // if(success){
    //   setFormData({
    //     title: '',
    //     category: '',
    //     state: '',

    //     image1: '',
    //     caption1: '',
    //     image2: '',
    //     caption2: '',
    //     image3: '',
    //     caption3: '',

    //     content: [],

    //     freshness: false
    // })
    // }
    window.location.reload();
    
    // Add your form submission logic here
  };

  return (
    <div className="news-add">
      <h2>नया समाचार जोड़ें</h2>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="form-group">
          <label>शीर्षक</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>श्रेणी</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">श्रेणी चुनें</option>
            {categories.map(category => (
              <option key={category._id} value={category.slug}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>राज्य</label>
          <select
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            required
          >
            <option value="">राज्य  चुनें</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <ThreeImageUploader handleGetImages={handleGetImages} handleGetCaptions={handleGetCaptions} />

        {/* <div className="form-group">
          <label>समाचार विवरण</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            required
            rows="10"
          ></textarea>
        </div> */}
        <SimpleEditor handleGetContent={handleGetContent} />

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={formData.freshness}
              onChange={(e) => setFormData({ ...formData, freshness: e.target.checked })}
            />
            ताजा खबर
          </label>
        </div>

        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          प्रकाशित करें
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AddNews;