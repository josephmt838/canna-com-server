import { app } from './app.ts';
import { config } from './config/index.ts';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
