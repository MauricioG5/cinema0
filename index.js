const express = require('express');
const { config } = require('./config/config')
const mainRouter = require('./routes/index');
const { errorLogger, boomErrorHandler, errorHandler, ormErrorHandler} = require('./middlewares/error.handler');
const json = express.json();

const port = config.port;
const app = express();
app.use(json)

mainRouter(app);

app.use(errorLogger);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running on port ' + port)
})
