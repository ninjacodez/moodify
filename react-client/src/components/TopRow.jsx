import React from 'react';

const TopRow = (props) => {
	console.log(props)
	return (
		<iframe className='new-iframe' src={'https://open.spotify.com/embed?uri=' + props.rows.artists[0].uri}
      frameBorder="0" width="80%" height="auto"/>
	)
}

export default TopRow