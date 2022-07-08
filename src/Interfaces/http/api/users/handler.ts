import {
  RequestQuery, ResponseToolkit,
} from '@hapi/hapi';
import { Container } from 'instances-container';
import AddUserUseCase from '../../../../Aplications/use_case/AddUserUseCase';

export default class UsersHandler {
  private container: Container;

  constructor(container : Container) {
    this.container = container;
    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler({ payload }: RequestQuery, h:ResponseToolkit) {
    const addUserUseCase = this.container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(payload);
    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }
}
