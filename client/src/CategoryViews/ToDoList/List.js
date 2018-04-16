import React from 'react';

const List = props => {
    return (
        <ul className='List'>
            {
                props.items.map((item) => {
                    return <li key={item._id}><input type='checkbox' /><span> </span>{item.item}</li>
                })
            }
        </ul>
    )
}

export default List