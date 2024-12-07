import express from 'express';
import bootstrap from './src/modules/app.controller.js';
const app = express();
const port = 2000;


bootstrap(app, express);


app.listen(port, () => console.log(`Social app listening on port ${port}!`));