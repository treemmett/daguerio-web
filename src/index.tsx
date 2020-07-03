import './index.scss';
import React, { FC } from 'react';
import Apollo from './apollo';
import Photos from './views/Photos/Photos';
import Uploader from './components/Uploader/Uploader';
import { render } from 'react-dom';

const App: FC = () => (
  <Apollo>
    <Photos />
    <Uploader />
  </Apollo>
);

render(<App />, document.getElementById('app'));
