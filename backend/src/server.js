import app from './app.js';
import { PORT } from './constants/base.js';

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}...`);
});
