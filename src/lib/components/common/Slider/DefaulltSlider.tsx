import React, { Children, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface PropsDefaulSlider {
  children: React.ReactNode;
}

const DefaulltSlider: React.FC<PropsDefaulSlider> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleMove = () => {
    const element = containerRef.current;
    if (element) {
      element.scrollLeft += 300;
      if (
        element.scrollLeft + 10 >=
        element.scrollWidth - element.offsetWidth
      ) {
        setShowRightButton(false);
        setShowLeftButton(true);
      } else {
        setShowRightButton(true);
        setShowLeftButton(true);
      }
    }
  };

  const handleBack = () => {
    const element = containerRef.current;
    if (element) {
      element.scrollLeft -= 300;
      if (element.scrollLeft > 0) {
        setShowLeftButton(true);
        setShowRightButton(true);
      } else {
        setShowRightButton(true);
        setShowLeftButton(false);
      }
    }
  };
  return (
    <div className="flex max-w-full relative">
      <div
        className="w-full flex gap-4 overflow-x-auto smooth-scroll no-scrollbar scroll-smooth pb-4"
        ref={containerRef}
      >
        {children}
      </div>
      {/* Button Right  */}
      {showRightButton && (
        <div className="absolute z-9 right-[-20px] h-full flex items-center">
          <button
            className="p-3 bg-white shadow-12 rounded-full"
            onClick={handleMove}
          >
            <Image
              src="/incons/arrow-right.webp"
              width={30}
              height={30}
              alt="Arrow right"
            />
          </button>
        </div>
      )}
      {/* Button Left  */}
      {showLeftButton && (
        <div className="absolute z-9 left-[-20px] h-full flex items-center">
          <button
            className="p-3 bg-white shadow-12 rounded-full"
            onClick={handleBack}
          >
            <Image
              src="/incons/arrow-left.webp"
              width={30}
              height={30}
              alt="Arrow left"
            />
          </button>
        </div>
      )}
    </div>
  );
};
export default DefaulltSlider;
