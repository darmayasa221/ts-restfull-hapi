export interface UserRegister {
  username: string;
  password: string;
  fullname: string
}

export default class RegisterUser {
  public username: string;

  public password: string;

  public fullname: string;

  constructor(payload: UserRegister) {
    this.verifyPayload(payload);
    const {
      username,
      password,
      fullname,
    } = payload;
    this.username = username;
    this.password = password;
    this.fullname = fullname;
  }

  private verifyPayload({ username, password, fullname }: UserRegister): void {
    if (!username || !password || !fullname) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof username !== 'string' || typeof password !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
