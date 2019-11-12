import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import './css/AddNote.css';

class AddNote extends Component {

  static contextType = UserContext;

  state = {
    note: {
      note_name: '',
      content: '',
      folder_id: '',
      date_created: ''
    },
    validateFolder: false,
    validateName: false
  };

  setNoteName = (input) => {
    const newNote = this.state.note
    newNote.note_name = input
    newNote.date_created = new Date()
    this.setState({ note: newNote })
  };

  setNoteContent = (input) => {
    const newNote = this.state.note
    newNote.content = input
    this.setState({ note: newNote })
  };

  setNoteFolderId = (input) => {
    const newNote = this.state.note
    newNote.folder_id = input
    this.setState({ note: newNote })
  };

  handleCreateNote = (addNote) => {
    console.log(this.state.note.folder_id)
    const input = this.state.note
    const data = {
      note_name: input.note_name,
      content: input.content,
      folder_id: input.folder_id,
      date_created: input.date_created
  }
    console.log(JSON.stringify(data))
    fetch(`http://localhost:8000/api/notes`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => {
      if(!res.ok){
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => {
      this.context.addNote(data.note_name, data.content, data.date_created, data.folder_id, data.id)
      return data
    })
    .catch(error => {
      console.error(error)
    })
    };

    validateName = () => {
      let name = this.state.note.note_name;
      if(name.length === 0) {
        return 'Note Name Must Be Created';
      }
    }
    
    validateFolder = () => {
      let folder = this.state.note.folder_id
      if(folder.length === 0) {
        return 'Please choose a folder...'
      }
    }
    
  render() {
    console.log(this.context)
    return(
      <div className='add-note-form'>
        <form className='folder-form'>
          <label htmlFor='note'>Note Name
          <p className='error'>{this.validateName()}</p></label>
          <input placeholder='Note Name' id='name' type='text' value={this.state.note.note_name} required
            onChange={e =>  {
              this.setNoteName(e.target.value)
            }} 
            />
          <textarea placeholder='Note Content' id='content' type='text' value={this.state.note.content} 
            onChange={e => this.setNoteContent(e.target.value)}/>
            <p className='error'>{this.validateFolder()}</p>
          <select id='folderId'
            onChange={e => this.setNoteFolderId(e.target.value)}>
              
              <option value=''>Choose a Folder</option>
            {this.context.folders.map(index => 
              <option key={index.id} value={index.id}>{index.folderName}</option>  
            )}
          </select>
            <Link className='note-create-button' to='/' type='submit' 
              onClick={e => {
                e.preventDefault()
                if(this.state.note.note_name.length > 0 && this.state.note.folder_id.length > 0){
                this.handleCreateNote(
                  this.context.addNote
                )
                this.props.history.push('/')}  
              }
            }>
                  Submit
            </Link>
        </form>
      </div>
    )
  }
}

export default AddNote