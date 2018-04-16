import React from 'react';

const LinksList = props => (
    <ul className='LinksList'>
        {
            props.items.map((item) => {
                return <li><span> </span><a href={`http://www.${item.toString()}   `} key={item._id}>{item.item}</a></li>
            })
        }
    </ul>
)

export default LinksList