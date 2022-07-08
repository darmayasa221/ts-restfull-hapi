/* eslint-disable no-unused-vars */
export default abstract class PasswordHash {
  abstract hash(password: string) : Promise<string>
}
