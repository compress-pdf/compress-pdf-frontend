import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: 'reset' | 'submit' | 'button' | undefined;
  disabled?: boolean;
  title?: string;
};

export const Button = ({
  onClick,
  className,
  children,
  type = 'button',
  disabled = false,
  title = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'bg-gradient-to-tl from-[#ff8224] to-[#b33f40] text-white font-semibold px-[40px] py-[13px] text-[12px] md:text-[14px] flex items-center rounded-[10px] cursor-pointer',
        'w-max disabled:bg-slate-400 disabled:text-slate-100 disabled:cursor-not-allowed',
        'transition-all duration-500 ease-in-out bg-[length:100%_100%] hover:bg-[length:180%_180%] bg-gradient-pos',
        className
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
      title={title}
    >
      {children}
    </button>
  );
};
