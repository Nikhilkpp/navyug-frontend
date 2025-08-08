const RedPulseSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative w-16 h-16">
        {/* Outer ring - smooth spin */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-600 border-r-red-600 animate-spin"
          style={{ 
            animationDuration: '2s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        ></div>
        
        {/* Middle ring - reverse spin */}
        <div 
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-red-400 border-l-red-400 animate-spin"
          style={{ 
            animationDuration: '1.5s', 
            animationDirection: 'reverse',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        ></div>
        
        {/* Inner pulsing dot */}
        <div 
          className="absolute inset-4 bg-red-500 rounded-full opacity-0 animate-ping"
          style={{ 
            animationDuration: '1.5s',
            animationIterationCount: 'infinite'
          }}
        ></div>
      </div>
    </div>
  );
};

export default RedPulseSpinner;