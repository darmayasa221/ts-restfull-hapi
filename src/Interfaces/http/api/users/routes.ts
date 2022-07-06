interface Users {
    postUserHandler:Function
}
const routes = (handler: Users) => ([
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
]);

export = routes;
