import {
  RequestQuery, ResponseToolkit,
} from '@hapi/hapi';
import { Container } from '../../../../Infrastructures/http/server';

export default class UsersHandler {
  private container;

  constructor(container: Container) {
    this.container = container;
    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler({ payload }: RequestQuery, h:ResponseToolkit) {
    const addedUser = await this.container.addUserUseCase.execute(payload);

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
