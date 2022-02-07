
import React from 'react';
import styled from 'styled-components';
import logo from '../img/notedly_svg.svg';
import {useQuery, gql} from '@apollo/client';
import {Link, withRouter} from 'react-router-dom';
import ButtonAsLink from './ButtonAsLink';

//localQuery
import {IS_LOGGED_IN} from '../gql/query';

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #ada097;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

//Now header can include props before it only has () empty props

const Header = props => {
  //query hook for user logged-in state,
  //including the client for referencing the Apollo store (saving your jwt or flag loggedin)
  const {data, client} = useQuery(IS_LOGGED_IN);
  return(
    <HeaderBar>
      <img src={logo} alt="Notedly Logo" height="40"/>
      <LogoText>NotifyMe</LogoText>
      {/*If logged in display a logout link, else display sign-in options*/}
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink
            onClick={()=>{

              //remove the token (jwt)
              localStorage.removeItem('token');
 
              //clear the application's cache (using apollo client) (cache)
              client.resetStore();
              
              //update local state (using apollo client) (flag)
              client.writeData({data:{isLoggedIn: false}});
              
              //redirect the user to the home page
              props.history.push('/');
            }}
          >
            Log Out
          </ButtonAsLink>
        ) : (
          <p>
            <Link to={'/signin'}>Sign In</Link> or{' '}
            <Link to={'/signup'}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};

export default withRouter(Header);


