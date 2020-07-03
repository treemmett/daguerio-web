import React, { FC } from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

const Apollo: FC = ({ children }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      createUploadLink({
        credentials: 'same-origin',
        uri: `${window.location.origin}/api/graphql`,
      }),
    ]),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
