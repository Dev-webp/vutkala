import { useEffect, useRef, useState } from "react";

function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);

  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;

    let current = 0;

    const duration = 2000;

    const fps = 60;

    const totalFrames = Math.round((duration / 1000) * fps);

    const increment = end / totalFrames;

    const timer = setInterval(() => {
      current += increment;

      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [start, end]);

  return (
    <h2 ref={counterRef}>
      {count}
      {suffix}
    </h2>
  );
}

export default Counter;