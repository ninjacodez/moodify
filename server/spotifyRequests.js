import request from 'request';

// const Client_ID = '17af2e7d17c94de6b602b7ae29b1a7c0';
// const Client_Secret = 'e87dca1ab2094afd84f33f19fa73bef6';
// const baseURL = 'https://api.spotify.com/v1/';


const findSong = (songName) => {
  request('https://api.spotify.com/v1/search/?q=name:' + songName + '&type=track', (err, response, data) => {
	  console.log(data);
	  res.json(data);
	  res.end()
  })
}

const findArtist = (artistName) => {
  request('https://api.spotify.com/v1/search/?q=name:' + artistName + '&type=artist', (err, response, data) => {
	  console.log(data);
	  res.json(data);
	  res.end()
  })
}

const findAlbum = (albumName) => {
  request('https://api.spotify.com/v1/search/?q=name:' + albumName + '&type=album', (err, response, data) => {
	  console.log(data);
	  res.json(data);
	  res.end()
  })
}
//use/refactor with query-parser??
//can adjust API call with field filters, currently all functions search via name 
  //ex. track named, artist named, album named, etc. 
//add other functions based on what to search on API
//use URI retrieved from API request
  //can embed on front-end via iframes (look into)