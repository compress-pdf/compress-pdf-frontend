// components/Tooltip.tsx
import { useState, useRef, ReactNode } from 'react';
import {
  useFloating,
  offset,
  shift,
  flip,
  arrow,
} from '@floating-ui/react-dom-interactions';
import { Placement } from '@floating-ui/core';
import { twMerge } from 'tailwind-merge';

type TooltipProps = {
  content: string;
  placement?: Placement;
  className?: string;
  children: ReactNode;
};

const Tooltip = ({
  content,
  placement = 'bottom',
  className,
  children,
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);

  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    placement,
    middleware: [offset(8), shift(), flip(), arrow({ element: arrowRef })],
  });

  return (
    <div
      className={twMerge('relative flex items-center', className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      ref={reference}
    >
      {children}
      {isOpen && (
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            pointerEvents: 'none', // Prevent tooltip from affecting layout
          }}
          className={`bg-[#163b45] text-[#fafafa] w-[120px] font-normal leading-tight text-center text-sm px-[10px] py-2 rounded shadow-lg z-50 `}
          data-testid="error-tooltip"
        >
          <p>{content}</p>
          <div
            ref={arrowRef}
            className={`absolute w-2 h-2 bg-gray-700 transform rotate-45 ${
              (content === '' || !content) && 'hidden'
            }`}
            style={{
              top: middlewareData.arrow?.y ?? '',
              left: middlewareData.arrow?.x ?? '',
              right: middlewareData.arrow?.x !== null ? '' : '0',
              bottom: middlewareData.arrow?.y !== null ? '100%' : '0', // Adjust arrow position for bottom placement
              transform:
                middlewareData.arrow?.y !== null
                  ? 'translateY(50%) rotate(45deg)'
                  : 'rotate(45deg)',
              backgroundColor: '#163b45',
              borderLeft: '1px solid #163b45',
              borderTop: '1px solid #163b45',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
