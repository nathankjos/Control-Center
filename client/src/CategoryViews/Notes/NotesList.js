import React from 'react';

const NotesList = props => {
    return(
        <ul className='List'>
            {
                props.notes.map((item) => {
                    return <li key={item._id}><span> </span>{item.item}</li>
                })
            }
        </ul>
    )
}

export default NotesList