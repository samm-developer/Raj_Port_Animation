import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let finished = false;
    const progressObj = { val: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (finished) return;
          gsap.to(overlayRef.current, {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
            delay: 0.3,
            onComplete: () => {
              if (!finished) {
                finished = true;
                onCompleteRef.current?.();
              }
            },
          });
        },
      });

      tl.to(progressObj, {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (!finished) {
            setProgress(Math.ceil(progressObj.val));
          }
        },
      })
        .to(barRef.current, { scaleX: 1, duration: 2.2, ease: 'power2.inOut' }, 0)
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          0.3
        )
        .to(textRef.current, { opacity: 0, y: -20, duration: 0.5 }, 2.5);
    });

    return () => {
      finished = true;
      ctx.revert();
    };
  }, []);

  return (
    <div className="preloader" ref={overlayRef}>
      <div className="preloader-content">
        <div className="preloader-counter">
          <span>{progress}</span>
          <span className="preloader-percent">%</span>
        </div>
        <div className="preloader-bar-track">
          <div className="preloader-bar" ref={barRef} />
        </div>
        <p className="preloader-text" ref={textRef}>
          Loading Experience
        </p>
      </div>
      <div className="preloader-noise" />
    </div>
  );
}
