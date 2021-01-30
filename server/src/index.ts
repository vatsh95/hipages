import * as express from 'express';
import indexRouter from './routes/index';

const createError = require('http-errors');
const server = express();
const port = 8080;

server.use(express.json());
server.use('/api', indexRouter);

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

// catch 404 and forward to error handler
server.use(function (req, res, next) {
    next(createError(404));
});

// error handler
server.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});