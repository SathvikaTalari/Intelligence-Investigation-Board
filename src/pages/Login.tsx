import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);
  const [opening, setOpening] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSealBroken(true);
    setTimeout(() => {
      setOpening(true);
      setTimeout(() => navigate('/dashboard'), 1400);
    }, 900);
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative flex items-center justify-center select-none font-inter">
      {/* === PHOTOREALISTIC BACKGROUND SCENE === */}
      <div className="absolute inset-0 z-0 bg-[#0c0804]">
        {/* Background image asset */}
        <img
          src="/detective_bg.png"
          alt="Detective Office Desk"
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.15] sepia-[0.25]"
        />

        {/* Ambient lighting overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_20%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />

        {/* Film grain noise filter */}
        <div
          className="absolute inset-0 z-10 opacity-20 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '160px 160px',
          }}
        />
      </div>

      {/* === CENTRAL VINTAGE INVESTIGATION ARCHIVE LOGIN CARD === */}
      <motion.div
        className="relative z-30 w-full max-w-[440px] px-4 my-auto"
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Outer Stitched Leather Book Frame */}
        <div
          className="relative rounded-sm p-[14px]"
          style={{
            background: 'linear-gradient(135deg, #3d2612 0%, #28180a 50%, #1e1106 100%)',
            boxShadow: '0 30px 90px rgba(0,0,0,0.95), 0 0 0 1px rgba(90,59,28,0.7), inset 0 2px 4px rgba(255,255,255,0.1)',
          }}
        >
          {/* Leather Stitching Line */}
          <div
            className="absolute inset-[6px] border border-dashed rounded-sm opacity-40 pointer-events-none"
            style={{ borderColor: '#c89b3c' }}
          />

          {/* 4 Brass Metallic Corner Brackets */}
          {/* Top Left */}
          <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-20">
            <div className="w-full h-full border-t-[4px] border-l-[4px] border-[#c89b3c] rounded-tl-sm shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]" />
            <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#8b6a20] border border-[#3a2510]" />
          </div>
          {/* Top Right */}
          <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-20">
            <div className="w-full h-full border-t-[4px] border-r-[4px] border-[#c89b3c] rounded-tr-sm shadow-[inset_-1px_1px_2px_rgba(0,0,0,0.8)]" />
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#8b6a20] border border-[#3a2510]" />
          </div>
          {/* Bottom Left */}
          <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none z-20">
            <div className="w-full h-full border-b-[4px] border-l-[4px] border-[#c89b3c] rounded-bl-sm shadow-[inset_1px_-1px_2px_rgba(0,0,0,0.8)]" />
            <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#8b6a20] border border-[#3a2510]" />
          </div>
          {/* Bottom Right */}
          <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-20">
            <div className="w-full h-full border-b-[4px] border-r-[4px] border-[#c89b3c] rounded-br-sm shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.8)]" />
            <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#8b6a20] border border-[#3a2510]" />
          </div>

          {/* Inner Parchment Document Sheet */}
          <div
            className="relative px-7 py-8 rounded-sm overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #dfc69f 0%, #d5b88c 35%, #cca878 70%, #c49d68 100%)',
              boxShadow: 'inset 0 0 40px rgba(90,59,28,0.4), 0 2px 8px rgba(0,0,0,0.6)',
              border: '1px solid rgba(90,59,28,0.6)',
            }}
          >
            {/* Fine Paper Noise Overlay */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundSize: '120px',
              }}
            />

            {/* Vintage Vignette & Coffee Watermark Stains */}
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#5a3b1c]/10 blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#3a2510]/15 blur-lg pointer-events-none" />

            {/* === EMBLEM & HEADER === */}
            <div className="relative z-10 flex flex-col items-center mb-6">
              {/* Detailed Crest Seal Emblem */}
              <div className="w-14 h-16 mb-2 relative flex items-center justify-center">
                <svg viewBox="0 0 60 70" className="w-full h-full drop-shadow-md">
                  {/* Outer Shield Shield Shape */}
                  <path
                    d="M30 2 L54 10 L54 44 C54 58 30 68 30 68 C30 68 6 58 6 44 L6 10 Z"
                    fill="url(#shieldGrad)"
                    stroke="#5a3b1c"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4a3016" />
                      <stop offset="100%" stopColor="#241306" />
                    </linearGradient>
                  </defs>
                  {/* Inner Gold Shield Border */}
                  <path
                    d="M30 6 L49 13 L49 42 C49 53 30 62 30 62 C30 62 11 53 11 42 L11 13 Z"
                    fill="none"
                    stroke="#c89b3c"
                    strokeWidth="1.2"
                    opacity="0.8"
                  />
                  {/* Eagle & Scales Emblem Design */}
                  <path d="M30 16 L34 22 L40 20 L36 26 L42 30 L34 31 L30 38 L26 31 L18 30 L24 26 L20 20 L26 22 Z" fill="#c89b3c" />
                  <circle cx="30" cy="46" r="3" fill="#c89b3c" />
                </svg>
              </div>

              {/* Title & Tagline */}
              <p className="font-cinzel text-[#4a2e14] text-[10px] tracking-[0.35em] uppercase font-bold mb-0.5">THE</p>
              <h1 className="font-cinzel text-[#2d1808] text-3xl font-extrabold leading-none tracking-[0.18em] text-center text-shadow-sm">
                DETECTIVE<br />BUREAU
              </h1>

              {/* Est. 1947 with horizontal rules */}
              <div className="flex items-center gap-3 w-full max-w-[220px] my-2">
                <div className="flex-1 h-[1px] bg-[#5a3b1c]/35" />
                <span className="font-cinzel text-[#4a2e14] text-[9px] font-bold tracking-[0.25em] uppercase">EST. 1947</span>
                <div className="flex-1 h-[1px] bg-[#5a3b1c]/35" />
              </div>

              <p className="font-inter text-[#4a2e14]/90 text-[8px] font-bold tracking-[0.15em] uppercase text-center mt-0.5">
                ORGANIZE. CONNECT. ANALYZE. UNCOVER THE TRUTH.
              </p>
            </div>

            {/* === FORM INPUTS === */}
            <form onSubmit={handleLogin} className="relative z-10 space-y-3.5">
              {/* Detective ID / Email */}
              <div
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-sm border transition-all"
                style={{
                  background: 'rgba(60,35,14,0.07)',
                  borderColor: 'rgba(90,59,28,0.5)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)',
                }}
              >
                <User className="w-4 h-4 text-[#5a3b1c] flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Detective ID / Email"
                  className="flex-1 bg-transparent text-[#2d1808] placeholder-[#5a3b1c]/65 font-inter text-xs font-medium focus:outline-none"
                  required
                />
              </div>

              {/* Password Input */}
              <div
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-sm border transition-all"
                style={{
                  background: 'rgba(60,35,14,0.07)',
                  borderColor: 'rgba(90,59,28,0.5)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)',
                }}
              >
                <Lock className="w-4 h-4 text-[#5a3b1c] flex-shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="flex-1 bg-transparent text-[#2d1808] placeholder-[#5a3b1c]/65 font-inter text-xs font-medium focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#5a3b1c]/80 hover:text-[#2d1808] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between items-center pt-0.5 px-0.5">
                <label className="flex items-center gap-2 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-3.5 h-3.5 rounded-sm border-[#5a3b1c] accent-[#5a3b1c] cursor-pointer"
                  />
                  <span className="font-inter text-[11px] text-[#4a2e14] font-medium group-hover:text-[#2d1808]">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  className="font-inter text-[11px] font-bold text-[#8b2e2e] hover:text-[#a81c1c] transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* === ACCESS ARCHIVE BUTTON WITH 3D WAX SEAL === */}
              <div className="relative pt-2">
                <button
                  type="submit"
                  disabled={sealBroken}
                  className="w-full py-3.5 px-6 rounded-sm font-cinzel font-bold tracking-[0.25em] text-[#e8d9b5] text-xs uppercase flex items-center justify-center relative overflow-hidden transition-transform active:scale-[0.99]"
                  style={{
                    background: 'linear-gradient(180deg, #3d2612 0%, #261608 50%, #3a220f 100%)',
                    border: '1px solid #5a3b1c',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
                  }}
                >
                  <span className="pr-6">ACCESS ARCHIVE</span>
                </button>

                {/* 3D Wax Seal Attached to Button Right Edge */}
                <motion.div
                  className="absolute -right-3 -top-1 w-16 h-16 cursor-pointer z-30 drop-shadow-xl"
                  animate={sealBroken ? {
                    scale: [1, 1.35, 0],
                    opacity: [1, 0.8, 0],
                    rotate: [0, -25, 45],
                  } : {}}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  onClick={() => {
                    if (!sealBroken) {
                      setSealBroken(true);
                      setTimeout(() => {
                        setOpening(true);
                        setTimeout(() => navigate('/dashboard'), 1400);
                      }, 900);
                    }
                  }}
                >
                  <div
                    className="w-full h-full rounded-full relative flex items-center justify-center"
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #b82828 0%, #8b1818 60%, #5a0c0c 100%)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.25), 0 0 0 2px #4a0808',
                      border: '2px solid #7a1212',
                    }}
                  >
                    {/* Inner Gold Ring */}
                    <div className="absolute inset-1.5 rounded-full border border-[#c89b3c]/60" />
                    {/* Wax Seal DB Crest */}
                    <span className="font-cinzel text-[#f5e6c8] text-xs font-extrabold z-10 relative drop-shadow">
                      DB
                    </span>
                    {/* Wax Melt Drips */}
                    <div className="absolute -bottom-1.5 left-3 w-2 h-3 rounded-full bg-[#8b1818]" style={{ transform: 'rotate(-10deg)' }} />
                    <div className="absolute -bottom-1 right-4 w-1.5 h-2 rounded-full bg-[#7a1212]" />
                  </div>
                </motion.div>
              </div>
            </form>

            {/* === FOOTER RESTRICTED ACCESS === */}
            <div className="relative z-10 mt-6 pt-3 border-t border-[#5a3b1c]/30 text-center space-y-0.5">
              <p className="font-inter text-[#4a2e14] text-[9px] font-bold tracking-[0.2em] uppercase">
                Restricted Access
              </p>
              <p className="font-inter text-[#4a2e14]/80 text-[8.5px] tracking-[0.15em] uppercase">
                Authorized Personnel Only
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* === TRANSITION DOOR ANIMATION === */}
      <AnimatePresence>
        {opening && (
          <motion.div
            className="fixed inset-0 bg-black z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {/* === BOTTOM COPYRIGHT TEXT === */}
      <div className="absolute bottom-3 left-0 right-0 text-center z-30 pointer-events-none">
        <p className="font-inter text-[#f5e6c8]/60 text-[10px] tracking-[0.2em] font-medium drop-shadow-md">
          © 1947 The Detective Bureau. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
