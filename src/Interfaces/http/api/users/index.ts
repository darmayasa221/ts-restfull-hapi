/* eslint-disable import/no-cycle */
import { Server } from '@hapi/hapi';
import AddUserUseCase from '../../../../Aplications/use_case/AddUserUseCase';
import UsersHandler from './handler';
import routes from './routes';

export = {
  name: 'users',
  register: async (server: Server, container: {addUserUseCase: AddUserUseCase}) => {
    const usersHandler = new UsersHandler(container);
    server.route(routes(usersHandler));
  },
};
