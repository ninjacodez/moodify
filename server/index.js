const app = require('./app.js');
const PORT = process.env.PORT || 4568;

app.listen(PORT, () => {
  console.log('server listening on port: ', PORT);
});
