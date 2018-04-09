import React from 'react'
import SideBar from '../SideBar';
import { Redirect } from 'react-router-dom';

const Home = (props) => {
	return (
		<div className='Home'>
			{props.currentUser
				? (
				<SideBar />
				)	:	(
					<Redirect to='/login' />
				)}
		</div>
	)
}

export default Home