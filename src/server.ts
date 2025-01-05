import * as dotenv from 'dotenv'
dotenv.config()

import app from './app';
import l from './utils/logger';

const port = process.env.PORT;

const server = app.listen(port, () => {
  l.info(`Server running on port ${port}`);
});

