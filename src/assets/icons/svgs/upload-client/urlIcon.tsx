'use client';
import React from 'react';
import { useTheme } from 'next-themes';

const UrlIcon = () => {
  const { theme } = useTheme();

  // Set color based on the theme
  const fillColor = theme === 'dark' ? '#ffffff' : '#163B45';

  return (
    <svg
      className="h-full w-auto"
      viewBox="0 0 33 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1330_26323)">
        <path
          d="M28.1356 2.90387C25.2531 0.0213005 20.5607 0.0213005 17.6781 2.90387L13.9467 6.63536C13.7352 6.84992 13.5393 7.07381 13.3589 7.30702C14.5307 7.0118 15.752 6.97013 16.9412 7.18482C17.1819 7.22711 17.4213 7.27997 17.6595 7.3434L17.6679 7.40124L19.9264 5.14276C20.318 4.75013 20.7833 4.43863 21.2956 4.22608C21.8078 4.01354 22.357 3.90413 22.9115 3.90413C23.4661 3.90413 24.0153 4.01354 24.5275 4.22608C25.0398 4.43863 25.5051 4.75013 25.8967 5.14276C27.5386 6.79394 27.5479 9.47128 25.8967 11.1131L22.1653 14.8446C21.4563 15.5536 20.5514 15.9361 19.6278 16.0387C18.4058 16.1693 17.1277 15.7868 16.1949 14.8446C15.5862 14.2301 15.1822 13.4427 15.0381 12.5899C14.3741 12.671 13.7555 12.9695 13.2787 13.4388L12.2656 14.4528C12.6344 15.4405 13.2108 16.3376 13.956 17.0835C15.0234 18.1529 16.395 18.8664 17.8834 19.1265C19.0566 19.331 20.2618 19.2513 21.3979 18.8943C22.5341 18.5372 23.5681 17.9131 24.4135 17.0742L28.145 13.3427C31.0182 10.4788 31.0182 5.78644 28.1356 2.90387Z"
          fill={fillColor}
        />
        <path
          d="M20.6729 20.8337C20.8906 20.6123 21.0915 20.3816 21.2756 20.1415C20.1007 20.4377 18.8766 20.4832 17.6831 20.2749C17.4224 20.2293 17.1631 20.1714 16.9078 20.1014L14.6923 22.317C14.3006 22.7096 13.8353 23.0211 13.3231 23.2336C12.8108 23.4462 12.2617 23.5556 11.7071 23.5556C11.1525 23.5556 10.6034 23.4462 10.0911 23.2336C9.57887 23.0211 9.11359 22.7096 8.72191 22.317C8.32928 21.9253 8.01777 21.46 7.80523 20.9478C7.59268 20.4355 7.48328 19.8864 7.48328 19.3318C7.48328 18.7772 7.59268 18.228 7.80523 17.7158C8.01777 17.2036 8.32928 16.7383 8.72191 16.3466L12.4534 12.6151C13.1624 11.9061 14.0673 11.5237 14.9908 11.421C16.2129 11.2904 17.4909 11.6729 18.4238 12.6151C19.0329 13.2291 19.4376 14.0162 19.5824 14.8689C20.2461 14.7876 20.8644 14.4892 21.3409 14.02L22.354 13.006C21.9852 12.0183 21.4087 11.1212 20.6636 10.3753C19.5962 9.30592 18.2246 8.59239 16.7362 8.3323C15.2827 8.07166 13.7845 8.25366 12.4357 8.85471C11.6334 9.2092 10.8778 9.71295 10.2154 10.3753L6.48395 14.1068C3.60138 16.9893 3.60138 21.6817 6.48395 24.5643C9.36652 27.4468 14.0589 27.4468 16.9414 24.5643L20.6729 20.8337Z"
          fill={fillColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_1330_26323">
          <rect
            width="32.274"
            height="27.4833"
            fill="white"
            transform="translate(0.575439 0.376343)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default UrlIcon;
