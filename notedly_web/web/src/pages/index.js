
import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {useQuery, gql} from '@apollo/client';

//import shared layout component
import Layout from '../components/Layout';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';
//first the name of component and then filename
import SignUp from './signup';
import SignIn from './signin';
import NewNote from './new';
import EditNote from './edit';

import {IS_LOGGED_IN} from '../gql/query';

const Pages = () => {
  return(
    <Router>
      {/*Wrap our routes within the Layout component*/}
      <Layout>
        <Route exact path="/" component={Home}/>
        <PrivateRoute path="/mynotes" component={MyNotes}/>
        <PrivateRoute path="/favorites" component={Favorites}/>
        <Route path="/note/:id" component={NotePage}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/signin" component={SignIn}/>
        <PrivateRoute path="/new" component={NewNote}/>
        <PrivateRoute path="/edit/:id" component={EditNote}/>
      </Layout>
    </Router>
  );
};


//Private Component
//In case of show some component but if some condition is committed
//change the component by signin so you need to use Private Component
//It is like alternative route
const PrivateRoute = ({component: Component, ...rest}) => {
  const {loading, error, data} = useQuery(IS_LOGGED_IN);
  //if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Private Component</p>;
  //if the user is logged in, route them to the request component (MyNotes,Favorites)
  //else redirect them to the sign-in page (Log in)
  return (
    <Route
      {...rest}
      render = {props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: {from: props.location}
            }}
          />
        )
      }
    />
  );
};

export default Pages;
