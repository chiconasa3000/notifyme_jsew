
import React, {useEffect, useState} from 'react';
import {useMutation, useApolloClient, gql} from '@apollo/client';
import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!){
    signIn(email: $email, password:$password)
  }
`;


//include the props passed to the component for later use
const SignIn = props => {
  
  useEffect(() => {
    document.title = 'Sign In - Notedly';
  });

  //Apollo client in order to set general information for all components in the app
  //in this case a flag "isLoggedIn"
  const client = useApolloClient();

  //add the mutation hook
  const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
    //when signup operations is completed and return JWT
    onCompleted: data => {
      //console.log(data.signUp);
      localStorage.setItem('token',data.signIn);
      
      //update the local cache
      client.writeData({data: { isLoggedIn: true}});

      //using history properties of routes of our component
      //in order to redirect home page
      props.history.push('/');
    }
  });

  //JSX attribute htmlFor instead of "for" in order to avoid collisions 
  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signin"/>
      {/*if the data is loading, display a loading message*/}
      {loading && <p>Loading...</p>}
      {/*if there is an error, display a error message*/}
      {error && <p>Error signing in</p>}
    </React.Fragment>
  );
};

export default SignIn;
