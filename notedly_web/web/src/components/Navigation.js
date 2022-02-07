
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  padding: 1em;
  /*background: #f5f4f0;*/
  background: #c0bdb0;
  
  @media (max-width: 700px){
    padding-top: 64px;
  }

  @media (min-width: 700px){
    /* fija los componentes en caso exista sobrelapamiento*/
    position: fixed;
    width: 220px;
    height: calc(100% - 64px);
    overflow-y: scroll;
  }
`;

const NavList = styled.ul`
  /*reset del posisionamiento*/
  margin: 0;
  padding: 0;
  list-style: none;
  /*separacion entre texto y texto*/
  line-height: 2;

  /*We can nest styles in styled-components*/
  /*the following styles will apply to links within the NavList component*/
  a{
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
  }

  a:visited {
    color: #333;
  }
  
  a:hover,
  a:focus{
    color: #0077cc;
  }

  span{
    font-size:32.0pt;
  } 
`;

const Navigation = () => {

  return(
    <Nav>
      <NavList>
        <li>
          <span aria-hidden="true" role="img">
            🛖   
          </span>
          <Link to="/">Main Notes</Link>
        </li>
        <li>
          <span aria-hidden="true" role="img">
            📔
          </span>
          <Link to="/mynotes">My Notes</Link>
        </li>
        <li>
          <span aria-hidden="true" role="img">
            🏷
          </span>
          <Link to="/favorites">Favorites</Link>
        </li>
        <li>
          <span aria-hidden="true" role="img">
            📝
          </span>
          <Link to="/new">New</Link>
        </li>
      </NavList>
    </Nav>
  );
};

export default Navigation;


