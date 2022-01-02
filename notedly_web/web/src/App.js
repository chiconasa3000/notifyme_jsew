// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDOM from 'react-dom';

//import Apollo Client libraries
import {ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


//import global styles
import GlobalStyle from '/components/GlobalStyle';

//import routes
import Pages from '/pages';

//Configure API URI & cache
const uri = process.env.API_URI;
const cache = new InMemoryCache();

//configure Apollo Client
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true
});


//ApolloProvider encapsulates the app with the client respectevely
const App = () => {
  return(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Pages />
  </ApolloProvider>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));
