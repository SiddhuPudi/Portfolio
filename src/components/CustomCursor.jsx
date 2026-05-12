import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* ── Mouse tracking ── */
    const onMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      // Inner dot follows instantly
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const onMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMouseEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    /* ── Hover detection for interactive elements ── */
    const onMouseOver = (e) => {
      const el = e.target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      if (el && !hovering.current) {
        hovering.current = true;
        ring.style.borderColor = "rgba(123, 47, 255, 0.7)";
        ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(1.6)`;
      }
    };

    const onMouseOut = (e) => {
      const el = e.target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      if (el && hovering.current) {
        hovering.current = false;
        ring.style.borderColor = "rgba(0, 240, 255, 0.45)";
      }
    };

    /* ── RAF loop for outer ring lerp ── */
    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, target.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, target.current.y, 0.12);

      const scale = hovering.current ? 1.6 : 1;
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${scale})`;

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "radial-gradient(circle, #00f0ff 0%, #7b2fff 100%)",
          boxShadow: "0 0 8px #00f0ff, 0 0 16px #7b2fff",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform, opacity",
          transition: "opacity 0.3s",
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(0, 240, 255, 0.45)",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform, opacity, border-color",
          transition: "opacity 0.3s, border-color 0.25s",
        }}
      />
    </>
  );
};

export default CustomCursor;
