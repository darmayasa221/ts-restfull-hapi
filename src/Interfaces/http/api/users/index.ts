import { Server } from '@hapi/hapi';
import UsersHandler from './handler';
import routes from './routes';

export = {
  name: 'users',
  register: async (server: Server, { container }: any) => {
    const usersHandler = new UsersHandler(container);
    server.route(routes(usersHandler));
  },
};
