import React, { useEffect, useRef, useState } from 'react';

interface CustomXScrollbarProps {
  divId: string;
}

const CustomXScrollbar: React.FC<CustomXScrollbarProps> = ({ divId }) => {
  const scrollbarRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const [scrollThumbWidth, setScrollThumbWidth] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollStartLeft, setScrollStartLeft] = useState<number>(0);
  const [isScrollbarVisible, setIsScrollbarVisible] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(window.devicePixelRatio); // Track zoom level

  const sensitivity = 2; // Sensitivity for scroll dragging

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX); // Store the starting mouse X position
    setScrollStartLeft(scrollLeft); // Store the current scroll position
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollbarRef.current || !thumbRef.current) return;

    const container = document.getElementById(divId);
    if (container) {
      const deltaX = (e.clientX - startX) * sensitivity; // Apply sensitivity factor
      const scrollBarWidth = scrollbarRef.current.offsetWidth;
      const containerScrollWidth =
        container.scrollWidth - container.clientWidth;

      // Calculate the new scroll position and ensure it's within the bounds
      const newScrollLeft = Math.max(
        0,
        Math.min(
          scrollStartLeft + (deltaX / scrollBarWidth) * containerScrollWidth,
          containerScrollWidth
        )
      );

      container.scrollLeft = newScrollLeft;
    }
  };

  const handleScroll = () => {
    const container = document.getElementById(divId);
    if (container && scrollbarRef.current) {
      // Calculate the ratio of the visible area to the total scrollable content
      const ratio = container.clientWidth / container.scrollWidth;
      const calculatedThumbWidth = Math.max(
        ratio * scrollbarRef.current.offsetWidth,
        20
      ); // Ensure a minimum thumb width

      setScrollThumbWidth(calculatedThumbWidth);

      // If thumb width is almost the same as the container width, hide the scrollbar
      if (
        Math.abs(scrollbarRef.current.offsetWidth - calculatedThumbWidth) <= 0.5
      ) {
        setIsScrollbarVisible(false); // Hide scrollbar
      } else {
        setIsScrollbarVisible(true); // Show scrollbar
      }

      // Calculate the thumb position
      const thumbPosition =
        (container.scrollLeft / container.scrollWidth) *
        scrollbarRef.current.offsetWidth;
      setScrollLeft(thumbPosition);
    }
  };

  const handleResizeOrZoom = () => {
    handleScroll(); // Recalculate the scrollbar when the window is resized or zoomed
    setZoomLevel(window.devicePixelRatio); // Track changes in zoom level
  };

  useEffect(() => {
    const container = document.getElementById(divId);
    if (container) {
      handleScroll();

      container.addEventListener('scroll', handleScroll);
    }

    window.addEventListener('resize', handleResizeOrZoom);
    window.addEventListener('resize', handleScroll); // Recalculate on window resize

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResizeOrZoom);
      window.removeEventListener('resize', handleScroll);
    };
  }, [divId, zoomLevel]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX, scrollStartLeft]);

  return (
    <div className="w-full">
      {isScrollbarVisible && ( // Conditionally render the scrollbar based on visibility
        <div
          ref={scrollbarRef}
          className={`relative w-[60%] h-[12px] bg-[#e4e4e4] dark:bg-[#a5a5a5] rounded-lg mt-2 block mx-auto`}
        >
          <div
            role="button"
            ref={thumbRef}
            tabIndex={0} // Make the element focusable
            className="absolute h-full bg-[#8b8b8b] dark:bg-[#535353] rounded-lg cursor-pointer"
            style={{
              width: `${scrollThumbWidth}px`,
              left: `${scrollLeft}px`,
            }}
            onMouseDown={handleMouseDown}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleMouseDown(e as never); // Trigger onMouseDown when pressing Enter or Space
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CustomXScrollbar;
