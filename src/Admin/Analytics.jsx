import React from 'react'
import { useState } from 'react';
import { motion } from "framer-motion";



const data = [
    { month: "Jan", revenue: 100, expense: 60, color: "bg-neutral-800" },
    { month: "Feb", revenue: 200, expense: 100, color: "bg-purple-500" },
    { month: "Mar", revenue: 90, expense: 50, color: "bg-neutral-800" },
    { month: "Apr", revenue: 564, expense: 188, color: "bg-orange-400", hot: true },
    { month: "May", revenue: 300, expense: 60, color: "bg-neutral-800" },
    { month: "Jun", revenue: 400, expense: 210, color: "bg-cyan-300", highlight: true },
    { month: "Jul", revenue: 500, expense: 40, color: "bg-neutral-800" },
    { month: "Aug", revenue: 200, expense: 100, color: "bg-yellow-300" },
  ];
function Chart() {
    const [hovered, setHovered] = useState(null);
  const maxRevenue = 564;

  return (
    <div className="p-6 bg-red-900 rounded-xl text-white max-w-4xl w-200 min-w-50 mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Analytics Chart</h2>
      <div className="flex items-end justify-between h-40 space-x-4 relative">
        {data.map((item, index) => {
          const barHeight = (item.revenue / maxRevenue) * 100;
          const isHovered = hovered === index;

          return (
            <div
              key={index}
              className="flex flex-col items-center relative"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-20 w-36 p-2 bg-black text-xs text-white rounded shadow text-center z-10">
                  <div className="font-semibold">{item.month}</div>
                  <div>Revenue: ${item.revenue}</div>
                  <div>Expense: ${item.expense}</div>
                </div>
              )}


              {/* Bar */}
              <motion.div
  initial={{ height: 0 }}
  animate={{ height: barHeight }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
  className="w-5 bg-green-600 rounded hover:bg-blue-400 transition-all duration-30"
/>

              {/* Label */}
              <div className="mt-2 text-sm">{item.month}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
  
}

export default Chart