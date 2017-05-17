import React from 'react';
import TopRow from './TopRow.jsx'

class TopTen extends React.Component  {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className='new-releases'>
				<h5>U.S. New Releases</h5>
	        {this.props.spotifyHomePage.map((item, idx) =>{
	          return <TopRow key={idx}rows={item} />
	        })}
      </div>
		)
	}
}

export default TopTen;