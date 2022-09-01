const express = require('express');
const mainRouter = require('./routes/index');
const { errorLogger, boomErrorHandler, errorHandler} = require('./middlewares/errorHandler');

const port = 3000;
const app = express();

mainRouter(app);
app.use(errorLogger);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running on port ' + port)
})
