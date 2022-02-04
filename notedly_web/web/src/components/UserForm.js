import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import Button from './Button';


const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input{
    /*order from top to bottom every field of form*/
    display: block;
    /*separate every field or form*/
    line-height: 2em;
    /*increases the width field to entire page*/
    width: 100%;
    margin-bottom: 1em;
  }
`;

//include the props passed to the component for later use
const UserForm = props => {
  
  //Set the default state of the form
  const [values, setValues] = useState();

  //update the state when a user types in the form
  const onChange = event => {
    //produce tuples of name and value properties when is updating every field of form
    //in this updating is click on submit button
    //...values means for all values received
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  //JSX attribute htmlFor instead of "for" in order to avoid collisions 
  return (
    <Wrapper>
      {/*Display the appropiate form header*/}
      {props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
      {/* perform the mutation when a user submits the form */}
      <Form
        onSubmit={e =>{
          e.preventDefault();
          props.action({
            variables: {
              ...values
            }
          });

        }}
      >
        {props.formType === 'signup' && (  
          <React.Fragment>
            <label htmlFor="username">Username:</label>
            <input
              required
              type="text"
              id="username"
              name="username"
              placeholder="here your username"
              onChange={onChange}
            />
          </React.Fragment>
        )}

        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          placeholder="here your email"
          onChange={onChange}
        />
        
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          placeholder="here your password"
          onChange={onChange}
        />
        <Button type="submit">Submit</Button>   
      </Form>
    </Wrapper>
  );
};

export default UserForm;



