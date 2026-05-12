import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

const MagneticButton = ({ 
  children, 
  className = "", 
  onClick, 
  href, 
  download, 
  target, 
  rel, 
  pullStrength = 0.25 
}) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Spring physics for smooth snap back
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Move the button slightly towards the cursor
    x.set(middleX * pullStrength);
    y.set(middleY * pullStrength);
  };

  const reset = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const onMouseEnter = () => setIsHovered(true);

  // If href is provided, render an anchor tag. Otherwise, a button.
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={onMouseEnter}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      style={{ x: springX, y: springY }}
      className={className}
      onClick={onClick}
      href={href}
      download={download}
      target={target}
      rel={rel}
      data-cursor-hover="true"
    >
      {children}
    </Component>
  );
};

export default MagneticButton;
