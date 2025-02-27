import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react'; // Import ArrowDown icon

const ScrollToTopBottom = () => {
  const [isTopVisible, setIsTopVisible] = useState(false);
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  // Show buttons when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsTopVisible(true);
    } else {
      setIsTopVisible(false);
    }

    // Show scroll to bottom button if near the bottom of the page
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 300) {
      setIsBottomVisible(false);
    } else {
      setIsBottomVisible(true);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll to bottom smoothly
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isTopVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-8 p-3 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
      {isBottomVisible && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-8 right-8 p-3 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-400 transition-all duration-300 z-50"
          aria-label="Scroll to bottom"
        >
          <ArrowDown size={24} />
        </button>
      )}
    </>
  );
};

export default ScrollToTopBottom;
