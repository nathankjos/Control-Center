import React from 'react';

const LinksList = props => (
    <ul className='LinksList'>
        {
            props.items.map((item) => {
                return <a href={`http://www.${item.toString()}`} key={item.toString()}>{item}</a>
            })
        }
    </ul>
)

export default LinksList