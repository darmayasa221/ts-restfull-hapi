/* eslint-disable no-unused-vars */
import { PasswordHash } from '../../Aplications/security/PasswordHash';

interface Bcrypt {
  hash: (password:string, saltRound:number) => Promise<string>
}
export default class BcryptPasswordHash implements PasswordHash {
  private bcrypt: Bcrypt;

  private saltRound: number;

  constructor(bcrypt: Bcrypt, saltRound = 10) {
    this.bcrypt = bcrypt;
    this.saltRound = saltRound;
  }

  async hash(password: string): Promise<string> {
    return this.bcrypt.hash(password, this.saltRound);
  }
}
