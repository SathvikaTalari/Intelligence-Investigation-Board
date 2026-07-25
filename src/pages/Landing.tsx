import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function Landing() {
  const navigate = useNavigate();
  const [textIndex, setTextIndex] = useState(0);
  
  const text = "CLASSIFIED ARCHIVE // EST. 1947";
  
  useEffect(() => {
    if (textIndex < text.length) {
      const timeout = setTimeout(() => {
        setTextIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [textIndex, text.length]);

  return (
    <div className="h-screen w-screen bg-black relative overflow-hidden font-inter flex flex-col items-center justify-center">
      
      {/* Background Room */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519098901909-b1553a1190af?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-40 sepia contrast-125 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.2)_0%,_rgba(0,0,0,0.95)_100%)]"></div>
        
        {/* Animated Dust Particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full blur-[1px]"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{ 
              y: -100,
              x: `calc(${Math.random() * window.innerWidth}px + ${Math.random() * 200 - 100}px)`
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 15
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 2, ease: "easeOut" }}
           className="flex flex-col items-center"
         >
            <div className="w-20 h-24 border-2 border-gold/40 mb-8 flex items-center justify-center p-2 relative">
               <div className="absolute inset-0 border border-gold/20 m-1"></div>
               <span className="font-cinzel text-4xl text-gold font-bold">DB</span>
            </div>
            
            <h1 className="font-cinzel text-5xl md:text-7xl text-gold font-bold tracking-widest uppercase text-center mb-6 text-glow" style={{ textShadow: '0 0 20px rgba(200,155,60,0.3)' }}>
              The Detective<br/>Bureau
            </h1>
         </motion.div>
         
         <div className="h-6 mb-16 font-mono text-gold/60 tracking-widest uppercase text-sm">
            {text.substring(0, textIndex)}
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              _
            </motion.span>
         </div>

         <motion.button
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 2 }}
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           onClick={() => navigate('/login')}
           className="px-12 py-4 bg-transparent border border-gold/40 text-gold font-cinzel font-bold tracking-widest uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300 relative group overflow-hidden"
         >
           <div className="absolute inset-0 bg-gold/5 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
           <span className="relative z-10">Enter The Archive</span>
         </motion.button>
      </div>

    </div>
  );
}
