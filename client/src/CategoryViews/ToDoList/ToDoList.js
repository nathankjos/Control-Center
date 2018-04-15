import React, { Component } from 'react';
import List from './List'

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
        this.setState({
            input: '',
            items: [...this.state.items, this.state.input]
        });
    }

    render() {
        return (
            <div>To Do List
                <List items={this.state.items} />
                <form className="toDoList" onSubmit={this.onSubmit}>
                    <input value={this.state.input} onChange={this.onChange} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default ToDoList