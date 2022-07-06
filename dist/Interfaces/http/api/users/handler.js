"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsersHandler {
    constructor(container) {
        this.container = container;
        this.postUserHandler = this.postUserHandler.bind(this);
    }
    async postUserHandler({ payload }, h) {
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
exports.default = UsersHandler;
