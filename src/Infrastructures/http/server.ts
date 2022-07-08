import Hapi from '@hapi/hapi';
import { Container } from 'instances-container';
import users from '../../Interfaces/http/api/users/index';

const createServer = async (container: Container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });
  await server.register([
    {
      plugin: users,
      options: {
        container,
      },
    },
  ]);
  return server;
};
export default createServer;
