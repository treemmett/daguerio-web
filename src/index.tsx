import './index.scss';
import React, { FC } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Photos from './views/Photos/Photos';
import Uploader from './components/Uploader/Uploader';
import { render } from 'react-dom';

const client = new ApolloClient({
  credentials: 'same-origin',
  uri: `${window.location.origin}/api/graphql`,
});

const App: FC = () => (
  <ApolloProvider client={client}>
    <Photos />
    <Uploader />
  </ApolloProvider>
);

render(<App />, document.getElementById('app'));
