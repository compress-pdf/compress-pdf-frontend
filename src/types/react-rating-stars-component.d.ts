declare module 'react-rating-stars-component' {
  import { ComponentType } from 'react';

  interface ReactStarsProps {
    count?: number;
    value?: number;
    onChange?: (newValue: number) => void;
    size?: number;
    color?: string;
    activeColor?: string;
    isHalf?: boolean;
    edit?: boolean;
  }

  const ReactStars: ComponentType<ReactStarsProps>;

  export default ReactStars;
}
