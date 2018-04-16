import React, { Component } from 'react';
import httpClient from '../../httpClient'
import LinksList from './LinksList'

class Links extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }
    onChange = (evt) => {
        this.setState({input: evt.target.value});
    }

    onSubmit = (evt) => {
        evt.preventDefault()
        const data = { item: this.state.input }
        httpClient.saveLinks(data, this.props.categoryId).then((serverResponse) => {
            this.props.onAddLink(serverResponse.data.category.links)
            this.setState({
                input: ''
            })
        })
    }

    render() {
        return (
            <div className='panelDiv'>
                <div className='ListDiv'>
                    <span className='notesLabel'>Links</span>
                    <div className='clearfix' />
                    <form className="ListForm" onSubmit={this.onSubmit}>
                        <input value={this.state.input} onChange={this.onChange} />
                        <button>Submit</button>
                    </form>
                </div>
                    <LinksList items={this.props.links} />
            </div>
        )
    }
}

export default Links