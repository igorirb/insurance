const dotenv = require('dotenv')
const app = require('./src/app');

dotenv.config()

const port = process.env.PORT || '3000';
app.listen(port, function () {
  console.log(`app listening on port ${port}`)
});
