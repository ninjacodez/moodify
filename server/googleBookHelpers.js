const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));

const getBookDescriptionByTitleAndAuthor = (title, author) => {
  const rootURL = 'https://www.googleapis.com/books/v1/volumes?q=';
  let titleURL = ''
  let authorURL = ''

  if (title !== ''){
  	titleURL = '+intitle:' + title;
	}
  else if(author !== ''){
	authorURL = '+inauthor:' + author;
	  }
  let completeURL = rootURL + titleURL + authorURL + '&maxResults=5';
  console.log(completeURL);
  	return request.getAsync(completeURL)
 
  .then(data => {
    let parsedData = JSON.parse(data.body);
    console.log(parsedData);
    return parsedData;
  })
  .catch(err => { console.log(err); });
};

module.exports.getBookDescriptionByTitleAndAuthor = getBookDescriptionByTitleAndAuthor;
