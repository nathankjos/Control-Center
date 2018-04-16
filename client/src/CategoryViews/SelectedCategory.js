import React from 'react'
import httpClient from '../httpClient'
import ToDoList from './ToDoList/ToDoList'
import Links from './Links/Links'
import Notes from './Notes/Notes'

class Categories extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        category: [],
        toDoList: [],
        notes: [],
        links: [],
        linksAndNotesPanel: false
      }
    }
    componentDidMount() {
        const categoryId = this.props.match.params.id
        httpClient.getCategory(categoryId).then((serverResponse) =>{
        const { toDoList, notes, links } = serverResponse.data
            this.setState({ 
                category: serverResponse.data,
                ToDoList: toDoList,
                notes: notes,
                links: links
            })
        })
    }

    toggleLinks() {
        this.setState({
            linksAndNotesPanel: true,
        })
    }

    toggleNotes(){
        this.setState({
            linksAndNotesPanel: false,
        })
    }
    
    saveToDoList(){
        httpClient.saveToDoList()
    }

    render() {
        return (
        <div className='content'>
            <div className='CategoryNameTitle'>
                <h1 className='categoryTitle'>{this.state.category.name}</h1>
                <div className='LinksAndNotesBtns'><button onClick={this.toggleLinks.bind(this)}>Links</button> <button onClick={this.toggleNotes.bind(this)}> Notes </button></div>
            </div>

            <div className='content3'>
                <div className='panel'>
                    <ToDoList onSaveToDoList={this.saveToDoList.bind(this)} />
                </div>

                <div className='panel'>
                    {this.state.linksAndNotesPanel?
                        <Links />
                        :
                        <Notes />
                    }
                </div>
            </div>
        </div>
        );
    }
}

export default Categories