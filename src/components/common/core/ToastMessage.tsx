'use client';
import Image from 'next/image';
import { toast, ToastOptions, ToastPosition } from 'react-toastify';

import { detectTheme } from '@/services/helpers';

import errorIcon from '@assets/icons/pngs/toast-icons/error.png';
import successIcon from '@assets/icons/pngs/toast-icons/success.png';
import warningIcon from '@assets/icons/pngs/toast-icons/warning.png';

// Enum for ToastType
enum ToastType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Default = 'default',
}

// Mapping string types to ToastType enum
const getToastTypeEnum = (type: string): ToastType => {
  switch (type) {
    case 'success':
      return ToastType.Success;
    case 'error':
      return ToastType.Error;
    case 'warning':
      return ToastType.Warning;
    case 'info':
      return ToastType.Info;
    default:
      return ToastType.Default;
  }
};

// ToastMessage logic using images for icons and TailwindCSS
const ToastMessage = (type: string, message: string) => {
  const commonOptions: ToastOptions = {
    position: 'top-center' as ToastPosition,
    icon: undefined,
    theme: detectTheme(),
  };

  // Map string type to enum type
  const toastType = getToastTypeEnum(type);

  // Define the icon element for each toast type
  let iconElement;
  switch (toastType) {
    case ToastType.Success:
      iconElement = (
        <Image src={successIcon} alt="success icon" className="w-7 h-7" />
      );
      break;
    case ToastType.Error:
      iconElement = (
        <Image src={errorIcon} alt="error icon" className="w-7 h-7" />
      );
      break;
    case ToastType.Warning:
      iconElement = (
        <Image src={warningIcon} alt="warning icon" className="w-7 h-7" />
      );
      break;
    case ToastType.Info:
      iconElement = (
        <span role="img" aria-label="info" className="w-7 h-7">
          ℹ️
        </span>
      );
      break;
    default:
      iconElement = (
        <span role="img" aria-label="bell" className="w-7 h-7">
          🔔
        </span>
      );
      break;
  }

  // Custom toast layout with header and body styling
  const CustomLayout = ({ message }: { message: string }) => (
    <div className="flex items-start">
      {iconElement}
      <div className="ml-3">
        <div className="text-sm font-bold">Notification</div>
        <div className="text-sm font-normal toast-message">{message}</div>
      </div>
    </div>
  );

  // Trigger the toast with the custom layout
  switch (toastType) {
    case ToastType.Success:
      toast.success(<CustomLayout message={message} />, commonOptions);
      break;
    case ToastType.Error:
      toast.error(<CustomLayout message={message} />, commonOptions);
      break;
    case ToastType.Warning:
      toast.warning(<CustomLayout message={message} />, commonOptions);
      break;
    case ToastType.Info:
      toast.info(<CustomLayout message={message} />, commonOptions);
      break;
    default:
      toast(<CustomLayout message={message} />, commonOptions);
      break;
  }
};

// Define prop types
type CustomToastProps = {
  type: string; // Accept strings, not enum directly
  message: string; // Only accept string now
};

const CustomToast = ({ type, message }: CustomToastProps) => {
  ToastMessage(type, message);
};

export default CustomToast;
