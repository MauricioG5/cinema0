const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { config } = require('./config/config')
const { errorLogger, boomErrorHandler, errorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const mainRouter = require('./routes/index');

const port = config.port;
const app = express();

const whiteList = ['http://localhost:8080', 'https://myapp.co'];
const options = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed'))
        }
    }
}

const json = express.json();
app.use(json);
app.use(helmet());
app.use(cors(options));
require('./utils/auth');

console.log('Starting my cinema');
mainRouter(app);

app.use(errorLogger);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running on port ' + port);
})
