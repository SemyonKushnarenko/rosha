import { FC } from 'react';
import './index.css'
import { IButtonProps } from './button.interface';

const Button: FC<IButtonProps> = ({children, ...props}) => {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
};

export default Button;
