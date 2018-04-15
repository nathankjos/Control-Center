import React from 'react';

const List = props => (
    <ul className='toDoList'>
        {
            props.items.map((item) => {
                return <li key={item.toString()}>{item}</li>
            })
        }
    </ul>
)

export default List