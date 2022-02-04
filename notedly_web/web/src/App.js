// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDOM from 'react-dom';

//import Apollo Client libraries
import {
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache,
  createHttpLink
} from '@apollo/client';

import {setContext} from 'apollo-link-context';

//import global styles
import GlobalStyle from '/components/GlobalStyle';

//import routes
import Pages from '/pages';

//Configure API URI & cache
const uri = process.env.API_URI;
const cache = new InMemoryCache();

//create link from main url http://localhost:4000
const httpLink = createHttpLink({uri});

//setcontext with the jwt like as autorization header
const authLink = setContext((_, {headers}) => {
  return{
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});

//with the new httpLink and respective context in authLink
//it does not require uri address

//check preexisting token when page loads and update the state when a token is found
//empty resolvers inr oder t do queries on out local cache


//configure Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

//check token on the initial page load
const data = {
  isLoggedIn: !!localStorage.getItem('token')
};

//write the cache data on initia load
cache.writeData({data});

//write the cache data after cache is reset event on client
client.onResetStore(()=>cache.writeData({data}));


//ApolloProvider encapsulates the app with the client respectively
const App = () => {
  return(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Pages />
  </ApolloProvider>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));
