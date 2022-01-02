
import React from 'react';
import Note from './Note';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

//It manages all notes but with every note maped
//it includes separation between notes and extend 800px
//and include some line solid between notes
const NoteWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 2px solid #f5f4f0;
`;

//Importing Note as new label

//manage group of notes
//parameter notes must be the data fetch from grapql
//map function unwrapped the notes and pass with the parameter note
const NoteFeed = ({notes}) => {
  return (
    <div>
      {notes.map(note => (
        <NoteWrapper key={note.id}>
          <Note note={note} />
          <Link to={`note/${note.id}`}>Isolated</Link>
        </NoteWrapper>
      ))}
    </div>
  );
}

export default NoteFeed;
