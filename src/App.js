import React, { Component } from 'react';
import logo from './logo.svg';
import fetch from 'node-fetch';
import './App.css';
import LeftBar from './MenuBar/LeftBar';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';

class App extends Component {

  constructor (props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.state = {
      loading: false,
      open: false,
      notes: [],
    }
  }

  addNote(note){
    const previousNotes = this.state.notes;
    previousNotes.push({noteId: previousNotes.length + 1, noteContent: note});

    this.setState({
      notes: previousNotes
    })
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    })
  }

  setStateNotes(notes) {
    this.setState({
      notes: notes,
    })
  }

  loadNotesFromServer(characterId){
    this.setStateNotes([]);
    const previousNotes = this.state.notes;
    const notesURL = new URL('http://localhost:8080/measures/characters/note/json');
    notesURL.searchParams.set("typeId", "G00001");
    notesURL.searchParams.set("characterId", characterId);
    console.log(notesURL.toString());
    fetch(notesURL.toString())
    .then(res => res.json())
    .then(resNoteJson => {
      this.setStateNotes(resNoteJson);
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  componentWillMount () {
    this.loadNotesFromServer("00001");
    const charactersURL = 'http://localhost:8080/measures/characters/json'
    fetch(charactersURL)
    .then(res => res.json())
    .then(resCharaJson => {
      this.setState({
        data: resCharaJson
      })
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  /* 子Componentに渡す用のメソッド */
  _reloadNotes(characterId){
    this.loadNotesFromServer(characterId);
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="LeftBar">
            <LeftBar
              onToggle={() => this.handleToggle()}
              open={this.state.open}
              jsonData={this.state.data}
              reloadNotes={this._reloadNotes.bind(this)}
            />
          </div>
        </div>
        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return (
                <Note noteContent={note.noteContent} noteId={note.noteId} key={note.noteId}/>
              )
            })
          }
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote}/>
        </div>
      </div>
    )
  }
}

export default App;
