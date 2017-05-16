const app = require('./app.js');

const PORT = 8080;//process.env.PORT || 4568;

app.listen(PORT, () => {
  console.log('server listening on port: ', PORT);
});
