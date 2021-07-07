require('dotenv').config();

import { app } from './app';

const { PORT: port = 1337 } = process.env;

app.listen(port, () => console.log(`listening at http://localhost:${port}`))
