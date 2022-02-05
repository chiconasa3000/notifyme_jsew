
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import Button from './Button';


const Wrapper = styled.div`
  height: 100%;
`;

const Form = styled.form`
  height: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
`;

//include the props passed to the component for later use
const NoteForm = props => {
  
  //Set the default state of the form
  //Adds property content: which is assigned by props.content of textarea else it is empty
  const [value, setValue] = useState({content: props.content || ''});

  //update the state when a user types in the form
  const onChange = event => {
    //produce tuples of name and value properties when is updating every field of form
    //in this updating is click on submit button
    //...values means for all values received
    setValue({
      ...value,
      [event.target.name]: event.target.value
    });
  };

  //JSX attribute htmlFor instead of "for" in order to avoid collisions 
  return (
    <Wrapper>
      {/* perform the mutation when a user submits the form */}
      <Form
        onSubmit={e =>{
          e.preventDefault();
          props.action({
            variables: {
              ...value
            }
          });

        }}
      >
        {/*access to property content from returned value
          thanks to props.content*/} 
        <TextArea
          required
          type="text"
          name="content"
          placeholder="here your Note content"
          value={value.content}
          onChange={onChange}
        />
        
        <Button type="submit">Submit</Button>   
      </Form>
    </Wrapper>
  );
};

export default NoteForm;



