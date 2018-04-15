import React, { Component } from 'react';
import NotesList from './NotesList'

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            items: []
        }
    }
    onChange = (evt) => {
        this.setState({input: evt.target.value});
    }

    onSubmit = (evt) => {
        evt.preventDefault()
        this.setState({
            input: '',
            items: [...this.state.items, this.state.input]
        });
    }

    render() {
        return (
            <div>Notes
                <NotesList items={this.state.items} />
                <form className="Notes" onSubmit={this.onSubmit}>
                    <input value={this.state.input} onChange={this.onChange} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default Notes