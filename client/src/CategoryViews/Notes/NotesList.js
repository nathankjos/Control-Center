import React from 'react';

const NotesList = props => (
    <ul className='NotesList'>
        {
            props.items.map((item) => {
                return <li key={item.toString()}>{item}</li>
            })
        }
    </ul>
)

export default NotesList