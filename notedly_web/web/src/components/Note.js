
import React from 'react';
import ReactMarkdown from 'react-markdown';

//for date style
import {format} from 'date-fns';
//for styled components
import styled from 'styled-components';

//Keep notes from extending wider than 800px
const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

//Align every note with blocks as a stack
const MetaData = styled.div`
  @media (min-width: 500px){
    display: flex;
    align-items: top;
  }
`;

//add some space between the avatar and meta info
//It joint two div and separate by its own padding
const MetaInfo = styled.div`
  padding-right: 1em;
`;

//align 'UserActions' to the right on large screens
//In this using for favorites parts in the future
//it will be a button in order to add favorites or discount favorites notes
const UserActions = styled.div`
  margin-left: auto;
`;

//manage individual notes
//the parameter note receives the isolated note and access all its attributes
const Note = ({note}) => {
  return(
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
            src={note.author.avatar}
            alt="{note.author.username} avatar"
            height="50px"
          />{' '}
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {note.author.username}<br/>
          {format(note.createdAt,"MMM Do YYYY")}
        </MetaInfo>
        <UserActions>
          <em>Favorites:</em>{note.favoriteCount}
        </UserActions>
      </MetaData>
      <ReactMarkdown children={'**'+ note.content+'**'}/>
    </StyledNote>
  );
};

export default Note;
