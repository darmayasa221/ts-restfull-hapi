import { config } from 'dotenv';
import container from './Infrastructures/container';
import createServer from './Infrastructures/http/server';

config();
const start = async () => {
  const server = await createServer(container);
  await server.start();
  // eslint-disable-next-line no-console
  console.log(`server start at${server.info.uri}`);
};

start();
