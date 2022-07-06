export interface UserRegistered {
  id: string;
  username: string;
  fullname: string;
}

export default class RegisteredUser {
  public id: string;

  public username: string;

  public fullname: string;

  constructor(payload: UserRegistered) {
    this.verifyPaylod(payload);
    const { id, username, fullname } = payload;
    this.id = id;
    this.username = username;
    this.fullname = fullname;
  }

  private verifyPaylod({
    id,
    username,
    fullname,
  }: UserRegistered) {
    if (!id || !username || !fullname) {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
