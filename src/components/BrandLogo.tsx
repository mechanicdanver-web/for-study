import { motion } from 'motion/react';

interface BrandLogoProps {
  variant?: 'full' | 'horizontal' | 'compact' | 'text-only';
  className?: string;
  primaryColor?: string; // Default 'currentColor' to adapt to container text color
  accentColor?: string;  // Default '#F7A000' (brand gold/orange)
  tealColor?: string;    // Default '#6C9A9F' (brand teal)
}

export default function BrandLogo({
  variant = 'full',
  className = '',
  primaryColor = '#FFFFFF',
  accentColor = '#FFFFFF',
  tealColor = '#FFFFFF',
}: BrandLogoProps) {

  // Helper to render three stacked point-up chevrons exactly matching the original logo
  const renderTripleChevron = (cx: number, cy: number, scale = 1, fill = accentColor) => {
    return (
      <g transform={`translate(${cx}, ${cy}) scale(${scale})`} className="opacity-95">
        {/* Top Chevron */}
        <path d="M -5,-13 L 0,-17 L 5,-13 L 5,-11 L 0,-15 L -5,-11 Z" fill={fill} />
        {/* Middle Chevron */}
        <path d="M -5,-8 L 0,-12 L 5,-8 L 5,-6 L 0,-10 L -5,-6 Z" fill={fill} />
        {/* Bottom Chevron */}
        <path d="M -5,-3 L 0,-7 L 5,-3 L 5,-1 L 0,-5 L -5,-1 Z" fill={fill} />
      </g>
    );
  };

  // Helper to render a perfect rotated diamond polygon
  const renderDiamond = (x: number, y: number, r = 3.5, fill = primaryColor) => {
    return (
      <polygon
        key={`d-${x}-${y}`}
        points={`${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`}
        fill={fill}
      />
    );
  };

  if (variant === 'text-only') {
    return (
      <div className={`flex flex-col items-center select-none ${className}`}>
        {/* FREE */}
        <div className="text-3xl font-extrabold font-display tracking-[0.1em] leading-none text-current">
          FREE
        </div>
        
        {/* RIDE with stacked chevrons over "I" */}
        <div className="text-3xl font-extrabold font-display tracking-[0.1em] flex items-center leading-none mt-2.5 relative">
          <span>R</span>
          <div className="relative inline-flex flex-col items-center px-1">
            <span className="absolute -top-[11px] left-1/2 -translate-x-1/2">
              {/* Stacked chevrons */}
              <svg width="10" height="14" viewBox="-6 -18 12 18">
                {renderTripleChevron(0, 0, 1, accentColor)}
              </svg>
            </span>
            <span>I</span>
          </div>
          <span>DE</span>
        </div>
      </div>
    );
  }

  if (variant === 'compact' || variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3.5 select-none ${className}`}>
        {/* Miniature SVG block embodying the icon geometry with curves and diamonds */}
        <svg width="42" height="42" viewBox="0 0 100 100" className="shrink-0 overflow-visible">
          {/* Waves background */}
          <path
            d="M 10,25 C 25,35 35,15 50,25 C 65,35 75,15 90,25"
            fill="none"
            stroke={primaryColor}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 10,37 C 25,47 35,27 50,37 C 65,47 75,27 90,37"
            fill="none"
            stroke={tealColor}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 10,49 C 25,59 35,39 50,49 C 65,59 75,39 90,49"
            fill="none"
            stroke={accentColor}
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Grid diamonds on top */}
          <g opacity="0.8">
            {renderDiamond(25, 10, 2.5, primaryColor)}
            {renderDiamond(41, 10, 2.5, primaryColor)}
            {renderDiamond(57, 10, 2.5, primaryColor)}
            {renderDiamond(73, 10, 2.5, primaryColor)}
            {renderDiamond(33, 15, 2.5, tealColor)}
            {renderDiamond(49, 15, 2.5, tealColor)}
            {renderDiamond(65, 15, 2.5, tealColor)}
          </g>

          {/* Bottom row of diamonds */}
          <g opacity="0.9">
            {renderDiamond(32, 70, 2.5, primaryColor)}
            {renderDiamond(44, 70, 2.5, primaryColor)}
            {renderDiamond(56, 70, 2.5, primaryColor)}
            {renderDiamond(68, 70, 2.5, primaryColor)}
            {renderDiamond(38, 76, 2.5, accentColor)}
            {renderDiamond(50, 76, 2.5, accentColor)}
            {renderDiamond(62, 76, 2.5, accentColor)}
          </g>
        </svg>

        {/* Brand typography layout with authentic original text labels */}
        <div className="flex flex-col justify-center leading-tight">
          <span className="text-[8px] font-black text-white/80 tracking-[0.22em] uppercase leading-none mb-1.5 font-sans">
            S N W B O A R D &nbsp; W E A R
          </span>
          <div className="flex items-center text-lg font-bold font-display tracking-[0.05em] text-current">
            <span>FREE R</span>
            <span className="relative inline-flex flex-col items-center px-0.5">
              <span className="absolute -top-[10px] left-1/2 -translate-x-1/2">
                <svg width="10" height="14" viewBox="-6 -18 12 18">
                  {renderTripleChevron(0, 0, 1, accentColor)}
                </svg>
              </span>
              <span>I</span>
            </span>
            <span>DE</span>
          </div>
        </div>
      </div>
    );
  }

  // default: 'full' layout. Tall sticker print representation matching the 5th user screenshot precisely!
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-transparent p-5 flex flex-col items-center text-current w-[230px] select-none ${className}`}
    >
      {/* 1. Upper graphic segment: Diamond Matrix & curving lines */}
      <div className="w-full flex flex-col items-center justify-center relative min-h-[140px] select-none">
        
        {/* Diamond Matrix on top with diagonal crop */}
        <svg width="100%" height="55" viewBox="0 0 200 55" className="overflow-visible select-none">
          <g opacity="0.9">
            {/* Row 1 */}
            {renderDiamond(40, 6, 2.8, primaryColor)}
            {renderDiamond(56, 6, 2.8, primaryColor)}
            {renderDiamond(72, 6, 2.8, primaryColor)}
            {renderDiamond(88, 6, 2.8, primaryColor)}
            {renderDiamond(104, 6, 2.8, primaryColor)}
            {renderDiamond(120, 6, 2.8, primaryColor)}
            {renderDiamond(136, 6, 2.8, primaryColor)}
            {renderDiamond(152, 6, 2.8, primaryColor)}
            {renderDiamond(168, 6, 2.8, primaryColor)}
            
            {/* Row 2 */}
            {renderDiamond(48, 14, 2.8, primaryColor)}
            {renderDiamond(64, 14, 2.8, primaryColor)}
            {renderDiamond(80, 14, 2.8, primaryColor)}
            {renderDiamond(96, 14, 2.8, primaryColor)}
            {renderDiamond(112, 14, 2.8, primaryColor)}
            {renderDiamond(128, 14, 2.8, primaryColor)}
            {renderDiamond(144, 14, 2.8, primaryColor)}
            {renderDiamond(160, 14, 2.8, primaryColor)}

            {/* Row 3 */}
            {renderDiamond(56, 22, 2.8, tealColor)}
            {renderDiamond(72, 22, 2.8, tealColor)}
            {renderDiamond(88, 22, 2.8, tealColor)}
            {renderDiamond(104, 22, 2.8, tealColor)}
            {renderDiamond(120, 22, 2.8, tealColor)}
            {renderDiamond(136, 22, 2.8, tealColor)}
            {renderDiamond(152, 22, 2.8, tealColor)}

            {/* Row 4 */}
            {renderDiamond(64, 30, 2.8, accentColor)}
            {renderDiamond(80, 30, 2.8, accentColor)}
            {renderDiamond(96, 30, 2.8, accentColor)}
            {renderDiamond(112, 30, 2.8, accentColor)}
            {renderDiamond(128, 30, 2.8, accentColor)}
            {renderDiamond(144, 30, 2.8, accentColor)}
          </g>
        </svg>

        {/* Elegant top waves flowing dynamically */}
        <div className="w-full h-12 my-2 relative overflow-visible">
          <svg width="100%" height="100%" viewBox="0 0 200 48" className="overflow-visible select-none">
            <path
              d="M -10,8 C 30,12 40,36 90,28 C 140,20 150,44 210,32"
              fill="none"
              stroke={primaryColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M -10,18 C 30,22 40,46 90,38 C 140,30 150,54 210,42"
              fill="none"
              stroke={tealColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M -10,-2 C 30,2 40,26 90,18 C 140,10 150,34 210,22"
              fill="none"
              stroke={accentColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Central Label Separator: S N W B O A R D   W E A R */}
        <div className="text-center font-bold tracking-[0.22em] text-[9.5px] uppercase text-current font-sans my-1.5 border-y border-white/25 py-2.5 w-full select-none">
          S N W B O A R D &nbsp; W E A R
        </div>

        {/* Lower parallel wave system flowing bottomwards */}
        <div className="w-full h-14 relative overflow-visible">
          <svg width="100%" height="100%" viewBox="0 0 200 52" className="overflow-visible select-none">
            <path
              d="M -10,30 C 40,34 50,10 100,18 C 150,26 160,5 215,10"
              fill="none"
              stroke={primaryColor}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M -10,40 C 40,44 50,20 100,28 C 150,36 160,15 215,20"
              fill="none"
              stroke={tealColor}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M -10,20 C 40,24 50,0 100,8 C 150,16 160,-5 215,0"
              fill="none"
              stroke={tealColor}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            
            {/* Small diamond accents embedded lower-right precisely */}
            {renderDiamond(165, 38, 2.5, primaryColor)}
            {renderDiamond(175, 30, 2.5, tealColor)}
            {renderDiamond(175, 40, 2.5, accentColor)}
            {renderDiamond(185, 30, 2.5, primaryColor)}
            {renderDiamond(185, 42, 2.5, primaryColor)}
          </svg>
        </div>
      </div>

      {/* 2. Bold Brand Text Segment: FREE RIDE */}
      <div className="w-full text-center flex flex-col items-center justify-center my-6 select-none">
        {/* FREE */}
        <div className="text-4xl font-extrabold font-display tracking-[0.08em] text-current leading-none">
          FREE
        </div>

        {/* RIDE with triple stacked chevrons over "I" */}
        <div className="text-4xl font-extrabold font-display tracking-[0.08em] text-current flex items-center justify-center leading-none mt-2 relative">
          <span>R</span>
          <div className="relative inline-flex flex-col items-center px-0.5">
            <span className="absolute -top-[13px] left-1/2 -translate-x-1/2">
              <svg width="12" height="16" viewBox="-6 -18 12 18">
                {renderTripleChevron(0, 0, 1.1, accentColor)}
              </svg>
            </span>
            <span>I</span>
          </div>
          <span>DE</span>
        </div>
      </div>

      {/* 3. Bottom Footer Segment: Elegant row of diamonds */}
      <div className="w-full border-t border-white/25 pt-3.5 pb-1 mt-auto select-none">
        <div className="flex justify-between w-full opacity-90">
          {Array.from({ length: 11 }).map((_, i) => (
            <svg key={i} width="7" height="7" viewBox="0 0 10 10" className="inline-block select-none pointer-events-none">
              <polygon
                points="5,1 9,5 5,9 1,5"
                fill={i === 5 ? accentColor : primaryColor}
              />
            </svg>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
