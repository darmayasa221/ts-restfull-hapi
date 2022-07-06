import RegisteredUser from '../RegisteredUser';

interface ValidPayload {
  id: string;
  username: string;
  fullname: string;
}

interface InvalidPayload extends Omit<ValidPayload, 'id'> { }
interface InvalidDataTypePayload extends InvalidPayload {
  id: number | symbol | boolean
}

describe('RgisteredUser Entities', () => {
  it('should throw error when payload did not conatian needed property', () => {
    // Arrange
    const payload: InvalidPayload = {
      username: 'jhon',
      fullname: 'jhon test',
    };

    // Acction and Assert
    expect(() => new RegisteredUser(payload as any)).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload: InvalidDataTypePayload = {
      id: 123,
      username: 'jhon',
      fullname: 'jhon test',
    };

    expect(() => new RegisteredUser(payload as any)).toThrowError('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create RegisteredUser correctly', () => {
    // Arrange
    const payload: ValidPayload = {
      id: 'user-0001',
      username: 'jhon',
      fullname: 'jhon',
    };
    // Action
    const { id, username, fullname } = new RegisteredUser(payload);
    // Assert
    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
  });
});
