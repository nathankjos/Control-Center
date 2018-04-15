import React, { Component } from 'react';
import httpClient from '../../httpClient'
import LinksList from './LinksList'

class Links extends Component {
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
        })
        httpClient.saveToDoList(this.state.items).then(
            
        )
    }

    render() {
        return (
            <div>Links
                <LinksList items={this.state.items} />
                <form className="Links" onSubmit={this.onSubmit}>
                    <input value={this.state.input} onChange={this.onChange} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default Links