import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface CustomXScrollbarProps {
  divId: string;
  className?: string;
}

const CustomXScrollbar: React.FC<CustomXScrollbarProps> = ({
  divId,
  className = '',
}) => {
  const scrollbarRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLButtonElement | null>(null);
  const [scrollThumbWidth, setScrollThumbWidth] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollStartLeft, setScrollStartLeft] = useState<number>(0);
  const [, setIsScrollbarVisible] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(window.devicePixelRatio); // Track zoom level

  const sensitivity = 2; // Sensitivity for scroll dragging

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX); // Store the starting mouse X position
    setScrollStartLeft(scrollLeft); // Store the current scroll position
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX); // Store the starting touch X position
    setScrollStartLeft(scrollLeft); // Store the current scroll position
  };

  const handleMouseUpOrTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseMoveOrTouchMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !scrollbarRef.current || !thumbRef.current) return;

    const container = document.getElementById(divId);
    if (container) {
      const clientX =
        'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const deltaX = (clientX - startX) * sensitivity; // Apply sensitivity factor
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
    document.addEventListener('mousemove', handleMouseMoveOrTouchMove);
    document.addEventListener('mouseup', handleMouseUpOrTouchEnd);
    document.addEventListener('touchmove', handleMouseMoveOrTouchMove);
    document.addEventListener('touchend', handleMouseUpOrTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveOrTouchMove);
      document.removeEventListener('mouseup', handleMouseUpOrTouchEnd);
      document.removeEventListener('touchmove', handleMouseMoveOrTouchMove);
      document.removeEventListener('touchend', handleMouseUpOrTouchEnd);
    };
  }, [isDragging, startX, scrollStartLeft]);

  return (
    <div className={twMerge('w-full', className)}>
      <div
        ref={scrollbarRef}
        className={`relative w-[60%] h-[10px] bg-[#e4e4e4] rounded-lg mt-2 block mx-auto`}
      >
        <button
          ref={thumbRef}
          type="button"
          className="absolute h-full bg-[#8b8b8b] rounded-lg cursor-pointer"
          style={{
            width: `${scrollThumbWidth}px`,
            left: `${scrollLeft}px`,
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
      </div>
    </div>
  );
};

export default CustomXScrollbar;
