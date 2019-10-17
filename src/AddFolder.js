import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

class AddFolder extends Component {

  static contextType = UserContext;

  state = {
    folder: {name: ''}
  };

  setFolder = name => {
    this.setState({folder: name})
  };

  handleCreateFolder = (addFolder) => {
    const input = this.state.folder
    const data = JSON.stringify({name: `${input}`})
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: data
    })
    .then(res => {
      if(!res.ok){
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => {
      console.log(data.name)
      console.log(data.id)
      addFolder(data.name, data.id)
      return data
    })
    .catch(error => {
      console.error(error)
    })
    };

  render() {
    return(
      <form>
        <label htmlFor="folder">Folder Name</label>
        <input id='folder' type='text' value={this.state.folder.name}
          onChange={e => this.setFolder(e.target.value)} />
        <Link to='/' type='submit' onClick={e => {
          e.preventDefault()
          this.handleCreateFolder(
            this.context.addFolder
          )
          this.props.history.push('/')}}>
            Submit
        </Link>
      </form>
    )
  }
}

export default AddFolder