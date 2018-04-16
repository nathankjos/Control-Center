import React from 'react';

const List = props => (
    <ul className='List'>
        {
            props.items.map((item) => {
                return <li key={item._id}>{item}</li>
            })
        }
    </ul>
)

export default List