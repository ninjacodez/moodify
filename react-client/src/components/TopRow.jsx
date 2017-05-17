import React from 'react';

const TopRow = (props) => {
	return (
		<li  className='searchText' onClick={() => {props.newReleaseClick(props.rows.artists[0].uri)}}><span>{props.rows.name}</span>&nbsp;-{props.rows.artists[0].name}</li>
	)
}

export default TopRow