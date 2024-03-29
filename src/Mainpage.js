import React, { Component } from 'react';
import FolderList from './FolderList';
import NoteList from './NoteList';
import PropTypes from 'prop-types';
import './css/Mainpage.css';

export default class Mainpage extends Component {
  render() {
    return (
      <div className='main-elements'>
        <FolderList folders={this.props.folders}/>
        <NoteList notes={this.props.notes}/>
      </div>
    )
  }
}

Mainpage.propTypes = {
  folders: PropTypes.array,
  notes: PropTypes.array
}