'use client';

import React from 'react';

import { Link } from '@/i18n/routing';
import Logo from '@/assets/icons/svgs/Logo';

const LogoButton = () => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/'; // Navigate to home
    // window.location.reload(); // Reload the page to reset everything
  };

  return (
    <Link
      href="/"
      className="text-xl font-semibold text-blue-600 dark:text-white leading-none"
      onClick={handleLogoClick} // Add the click handler to refresh the page
    >
      <Logo />
    </Link>
  );
};

export default LogoButton;
