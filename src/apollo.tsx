import React, { FC } from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const Apollo: FC = ({ children }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      new HttpLink({
        credentials: 'same-origin',
        uri: `${window.location.origin}/api/graphql`,
      }),
    ]),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
