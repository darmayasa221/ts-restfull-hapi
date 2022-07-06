import RegisterUser from '../RegisterUser';

interface ValidPayload {
  username: string,
  password: string,
  fullname: string,
}
interface InvalidPayload extends Omit<ValidPayload, 'fullname'>{ }
interface InvalidDataTypePayload extends InvalidPayload{
  fullname: boolean | number | symbol
}

describe('RegisterUser Entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload: InvalidPayload = {
      username: 'jhon test',
      password: 'secret',
    };
    // Action and Assert
    expect(() => new RegisterUser(payload as any)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should thorw error when payload did not meet data type specification', () => {
    // Arrange
    const payload: InvalidDataTypePayload = {
      username: 'jhon test',
      password: 'secret',
      fullname: true,
    };
    // Action and Assert
    expect(() => new RegisterUser(payload as any)).toThrowError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create RegisterUser object correctly', () => {
    // Arrange
    const payload: ValidPayload = {
      username: 'jhon',
      password: 'secret',
      fullname: 'jhon yes',
    };
    // Action
    const {
      username,
      password,
      fullname,
    } = new RegisterUser(payload);
    // Assert
    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
    expect(fullname).toEqual(payload.fullname);
  });
});
