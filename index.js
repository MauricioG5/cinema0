const express = require('express');
const cors = require('cors');
const { config } = require('./config/config')
const mainRouter = require('./routes/index');
const { errorLogger, boomErrorHandler, errorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const json = express.json();

const port = config.port;
const app = express();
app.use(json)
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

app.use(cors(options));

console.log('Starting my cinema')
mainRouter(app);

app.use(errorLogger);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running on port ' + port)
})
