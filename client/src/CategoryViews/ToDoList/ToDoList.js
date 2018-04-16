import React, { Component } from 'react';
import List from './List'
import httpClient from '../../httpClient';

class ToDoList extends Component {
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
        const data = { item: this.state.input }
        console.log(this.state.input)
        console.log(this.props)
        httpClient.saveToDoList(data, this.props).then((serverResponse) => {
            this.setState({
                input: '',
                items: [...this.state.items, serverResponse.data]
            })
        })
    }

    render() {
        return (
            <div className='panelDiv'>
                <div className='ListDiv'>
                    <span className='notesLabel'>To Do</span>
                    <div className='clearfix' />
                        <form className="ListForm" onSubmit={this.onSubmit} label='toDoList'>
                            <input value={this.state.input} onChange={this.onChange} />
                            <button>Submit</button>
                        </form>
                </div>
                <List items={this.state.items} />
            </div>
        )
    }
}

export default ToDoList