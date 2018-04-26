import React from 'react';

const LinksList = props => (
    <ul className='LinksList'>
        {
            props.items.map((item) => {
                return <li key={item._id}><span> </span><a href={`http://${item.item.toString()}`} key={item._id}>{item.item}</a></li>
            })
        }
    </ul>
)

export default LinksList