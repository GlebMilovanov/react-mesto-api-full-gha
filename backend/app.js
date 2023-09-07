/* const rateLimit = require('express-rate-limit'); */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const config = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
app.use(cors({
  origin: 'https://gleb.nomoredomainsicu.ru',
  credentials: true,
}));
/* const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
 */

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use(requestLogger);
/* app.use(limiter); */
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(config.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
