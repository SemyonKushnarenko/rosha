import loaderIcon from './loader.svg';
import './index.css';
import { FC } from 'react';

const Loader: FC = () => {
  return (
    <div className="rosha-loader">
      <img src={loaderIcon} alt='loading...' />
    </div>
  );
};

export default Loader;
