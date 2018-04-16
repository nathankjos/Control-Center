import React, { Component } from 'react';
import httpClient from '../../httpClient';
import NotesList from './NotesList'

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {input: ''}
    }
    onChange = (evt) => {
        this.setState({input: evt.target.value});
    }

    onSubmit = (evt) => {
        evt.preventDefault()
        const data = { item: this.state.input }
        httpClient.saveNotes(data, this.props.categoryId).then((serverResponse) => {
            this.props.onAddNote(serverResponse.data.category.notes)
            this.setState({
                input: ''
            })
        })
    }

    render() {
        return (
            <div className='panelDiv'>
                <div className='ListDiv'>
                    <span className='notesLabel'>Notes</span>
                    <div className='clearfix' />
                        <form className='ListForm' onSubmit={this.onSubmit}>
                            <input value={this.state.input} onChange={this.onChange} />
                            <button>Submit</button>
                        </form>
                </div>
                <NotesList notes={this.props.notes} />
            </div>
        )
    }
}

export default Notes