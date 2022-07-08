import { hash } from 'bcrypt';
import PasswordHash from '../../Aplications/security/PasswordHash';

export default class BcryptPasswordHash extends PasswordHash {
  private bcrypt: typeof hash;

  private saltRound: number;

  constructor(bcrypt: typeof hash, saltRound = 10) {
    super();
    this.bcrypt = bcrypt;
    this.saltRound = saltRound;
  }

  async hash(password: string): Promise<string> {
    return this.bcrypt(password, this.saltRound);
  }
}
