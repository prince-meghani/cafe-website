import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

const images = [
  "https://assets.codepen.io/16327/portrait-pattern-1.jpg",
  "https://assets.codepen.io/16327/portrait-image-12.jpg",
  "https://assets.codepen.io/16327/portrait-image-8.jpg",
  "https://assets.codepen.io/16327/portrait-pattern-2.jpg",
  "https://assets.codepen.io/16327/portrait-image-4.jpg",
  "https://assets.codepen.io/16327/portrait-image-3.jpg",
  "https://assets.codepen.io/16327/portrait-pattern-3.jpg",
  "https://assets.codepen.io/16327/portrait-image-1.jpg"
];

const BentoGallery = () => {
  const galleryRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const galleryElement = galleryRef.current;
      const galleryItems = galleryElement.querySelectorAll(".gallery__item");

      // Reset any previous state
      galleryElement.classList.remove("gallery--final");

      // Temporarily add the final class to capture the final state
      galleryElement.classList.add("gallery--final");
      const flipState = Flip.getState(galleryItems);
      galleryElement.classList.remove("gallery--final");

      const flip = Flip.to(flipState, {
        simple: true,
        ease: "expoScale(1, 5)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryElement,
          start: "center center",
          end: "+=150%",
          scrub: true,
          pin: containerRef.current,
        },
      });

      tl.add(flip);

      return () => {
        gsap.set(galleryItems, { clearProps: "all" });
      };
    }, containerRef); // Scope to container

    const handleResize = () => {
      ctx.revert();
      ctx.add(() => {
        const galleryElement = galleryRef.current;
        const galleryItems = galleryElement.querySelectorAll(".gallery__item");
  
        galleryElement.classList.remove("gallery--final");
  
        galleryElement.classList.add("gallery--final");
        const flipState = Flip.getState(galleryItems);
        galleryElement.classList.remove("gallery--final");
  
        const flip = Flip.to(flipState, {
          simple: true,
          ease: "expoScale(1, 5)",
        });
  
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: galleryElement,
            start: "center center",
            end: "+=150%",
            scrub: true,
            pin: containerRef.current,
          },
        });
  
        tl.add(flip);
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="gallery-wrap bg-cream">
      <div ref={galleryRef} className="gallery gallery--bento gallery--switch" id="gallery-8">
        {images.map((src, index) => (
          <div key={index} className="gallery__item">
            <img src={src} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BentoGallery;
