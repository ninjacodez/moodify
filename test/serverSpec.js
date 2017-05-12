// var requestHandlers = require('../server/requestHandlers.js');
// var expect = require('chai').expect;
// var stubs = require('./Stubs');

// // Conditional async testing, akin to Jasmine's waitsFor()
// // Will wait for test to be truthy before executing callback
// var waitForThen = function (test, cb) {
//   setTimeout(function() {
//     test() ? cb.apply(this) : waitForThen(test, cb);
//   }, 5);
// };

// describe('Node Server Request Listener Function', function() {
//   it('Should accept posts to /search', function() {
//     // This is a fake server request. Normally, the server would provide this,
//     // but we want to test our function's behavior totally independent of the server code
//     var stubMsg = {
//       title: 'test',
//       artist: 'test'
//     };
//     var req = new stubs.request('/search', 'POST', stubMsg);
//     var res = new stubs.response();
//     return requestHandlers.searchRequestHandler(req, res)
//     .then((res) => {
//       console.log('*************', res);
//       // expect(res._responseCode).to.equal(200);
//       expect(res._ended).to.equal(true);
//     });
//   });
// });