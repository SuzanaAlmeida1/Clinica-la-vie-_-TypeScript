import express from 'express';
import routes from './routes';
import db from './database';
const app = express();
import handlerError from './middlewares/handlerError';
const port = 3000;

db.hasConnection();
app.use(express.json());
app.use(routes);
app.use(handlerError);

app.listen(port, () => {
    console.log('listening on port ' + port);
})