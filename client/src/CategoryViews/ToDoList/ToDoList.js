import React, { Component } from 'react';
import httpClient from '../../httpClient';
import List from './List'

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = { input: '' }
    }
    onChange = (evt) => {
        this.setState({input: evt.target.value});
    }

    onSubmit = (evt) => {
        evt.preventDefault()
        const data = { item: this.state.input }
        console.log(data)
        httpClient.saveToDoList(data, this.props.categoryId).then((serverResponse) => {
            this.props.onAddTodo(serverResponse.data.category.toDoListItems)
            this.setState({
                input: ''
            })
        })
    }

    render() {
        return (
            <div className='panelDiv'>
                <div className='ListDiv'>
                    <span className='notesLabel'>To Do List</span>
                    <div className='clearfix' />
                        <form className="ListForm" onSubmit={this.onSubmit} label='toDoList'>
                            <input value={this.state.input} onChange={this.onChange} />
                            <button>Submit</button>
                        </form>
                </div>
                <List items={this.props.toDoList} />
            </div>
        )
    }
}

export default ToDoList