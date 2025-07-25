import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Loader, Search } from "lucide-react";

// Sample data
const allNews = [
  { id: 1, title: "प्रधानमंत्री ने नई योजना की घोषणा की", image: "https://source.unsplash.com/600x400/?india,politics", category: "राजनीति" },
  { id: 2, title: "बॉलीवुड अभिनेता की नई फ़िल्म रिलीज़", image: "https://source.unsplash.com/600x400/?bollywood,movie", category: "मनोरंजन" },
  { id: 3, title: "टीम इंडिया ने मैच में शानदार जीत दर्ज की", image: "https://source.unsplash.com/600x400/?cricket,india", category: "खेल" },
  { id: 4, title: "नए स्मार्टफोन की तकनीकी विशेषताएं लीक", image: "https://source.unsplash.com/600x400/?technology,smartphone", category: "तकनीक" },
];

const categories = ["सभी", "राजनीति", "मनोरंजन", "खेल", "तकनीक"];

export default function Home() {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("सभी");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate fetch delay
    setTimeout(() => {
      setNews(allNews);
      setLoading(false);
    }, 800);
  }, []);

  const filtered = news
    .filter(item => selectedCategory === "सभी" || item.category === selectedCategory)
    .filter(item => item.title.includes(searchTerm));

  return (
    <div className="bg-white text-red-700 min-h-screen antialiased">
      {/* Header & Search */}
      <header className="sticky top-0 bg-white z-10 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4">
          <h1 className="text-3xl font-extrabold text-red-800 drop-shadow-sm transition-transform transform hover:scale-105">
            📰 हिंदी समाचार
          </h1>
          <div className="relative mt-4 md:mt-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-300" />
            <input
              type="text"
              placeholder="खोजें..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full bg-red-50 text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 w-64"
            />
          </div>
        </div>
        {/* Categories Scroll */}
        <nav className="overflow-x-auto">
          <ul className="flex space-x-4 px-6 pb-2">
            {categories.map(cat => (
              <li key={cat}>
                <button
                  className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 border-2 ${
                    selectedCategory === cat
                      ? 'bg-red-700 text-white border-red-700 shadow-lg'
                      : 'bg-white text-red-700 border-red-700 hover:bg-red-700 hover:text-white'
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Featured Carousel */}
      <section className="px-6 py-8 bg-gradient-to-b from-red-50 to-white">
        <h2 className="text-2xl font-bold text-red-800 mb-4">फ़ीचर्ड</h2>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader className="animate-spin w-10 h-10 text-red-300" />
          </div>
        ) : (
          <div className="relative">
            <AnimatePresence initial={false} exitBeforeEnter>
              {filtered.slice(0, 1).map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: 'spring', stiffness: 80 }}
                  className="h-64 rounded-2xl overflow-hidden shadow-lg"
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-white/90 to-transparent p-4">
                    <h3 className="text-xl font-semibold text-red-800">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* News Grid */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-bold text-red-800 mb-4">समाचार</h2>
        {filtered.length === 0 && !loading ? (
          <p className="text-red-400">कोई समाचार नहीं मिला।</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-2 border-red-200 hover:border-red-400 hover:shadow-xl transition-all duration-300">
                  <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                  <CardContent>
                    <h3 className="font-semibold mb-2 text-red-800 hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
