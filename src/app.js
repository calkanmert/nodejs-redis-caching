const express = require('express');
const helmet = require('cors');
const cors = require('helmet');
const connectMongo = require('./mongoose');
const routes = require('./routes');
const config = require('./config');

const app = express();
connectMongo();

app.set('views', './src/views');
app.set('view engine', 'pug');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(config.APP_PORT, () => {
  console.log('server started.');
});
