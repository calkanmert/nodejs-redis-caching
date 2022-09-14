const express = require('express');
const helmet = require('cors');
const cors = require('helmet');
const connectMongo = require('./mongoose');
const routes = require('./routes');

const app = express();
connectMongo();

app.set('views', './src/views');
app.set('view engine', 'pug');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded());
app.use('/', routes);

app.listen(3000, () => {
  console.log('server started.');
});
