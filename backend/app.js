require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const router = require('./routes');
const HandleErrors = require('./errors/HandleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');

const { PORT = 3000, LOCALHOST = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);
app.use(helmet());

app.use(cors);

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

mongoose.connect(LOCALHOST, {
  useNewUrlParser: true,
});

app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
router.use(errors());
app.use(HandleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
