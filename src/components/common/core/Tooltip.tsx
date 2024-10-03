import { useState, useRef, ReactNode } from 'react';
import {
  useFloating,
  offset,
  shift,
  flip,
  arrow,
  autoUpdate,
  Placement,
} from '@floating-ui/react-dom-interactions';
import { twMerge } from 'tailwind-merge';

type TooltipProps = {
  content: string;
  placement?: Placement;
  className?: string;
  children: ReactNode;
  withArrow?: boolean;
  hide?: boolean;
};

const Tooltip = ({
  content,
  placement = 'bottom',
  className,
  children,
  withArrow = true,
  hide = false,
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    middlewareData,
    placement: currentPlacement,
  } = useFloating({
    placement,
    middleware: [offset(10), shift(), flip(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  });

  // Determine the arrow's styles based on the placement
  const arrowStyles = {
    top: currentPlacement.startsWith('bottom') ? '-4px' : '',
    bottom: currentPlacement.startsWith('top') ? '-4px' : '',
    left: currentPlacement.startsWith('right') ? '-4px' : '',
    right: currentPlacement.startsWith('left') ? '-4px' : '',
    transform:
      currentPlacement.startsWith('top') ||
      currentPlacement.startsWith('bottom')
        ? 'rotate(45deg)'
        : 'rotate(-45deg)',
  };

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
            pointerEvents: 'none',
          }}
          className={`bg-[#163b45] dark:bg-[#F2F2F2] text-[#fafafa] dark:text-[#000000] w-[182px] font-normal leading-tight text-left text-sm px-[10px] py-2 rounded shadow-lg z-50 border border-slate-500 ${
            hide && 'hidden'
          }`}
        >
          <p>{content}</p>
          {withArrow && (
            <div
              ref={arrowRef}
              className="absolute w-2 h-2 bg-[#163b45] dark:bg-[#F2F2F2]"
              style={{
                ...arrowStyles,
                top: middlewareData.arrow?.y ?? arrowStyles.top,
                left: middlewareData.arrow?.x ?? arrowStyles.left,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
