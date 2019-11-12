import React, { Component } from 'react';
import Note from './Note';
import UserContext from './UserContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/NoteList.css';

export default class NoteList extends Component {
  static contextType = UserContext

  render() {
    let notes = this.context.notes

    if(this.props.selectedNote){
      notes = notes.filter(note => note.id === parseInt(this.props.selectedNote))

    }else {
    if(this.props.selectedId){
      notes = notes.filter(note => note.folder_id === parseInt(this.props.selectedId))
    }
    else{
      notes = this.context.notes
    }
  }
    return (
      <div className="notelist">
        <div>
          {
            notes.map(note => 
              <Note key={note.id}
              id={note.id.toString()}
              name={note.note_name}
              modified={note.date_created}
              folderId={note.folder_id.toString()}
              content={note.content}
              selectedNote={this.props.selectedNote} />)
            }
        </div>
        {this.props.selectedNote ? <></> : <Link to='/addNote' className='add-note'>Add Note</Link>}
      </div>
    )
  }
}

NoteList.propTypes = {
  selectedId: PropTypes.string,
  selectedNote: PropTypes.string
}
