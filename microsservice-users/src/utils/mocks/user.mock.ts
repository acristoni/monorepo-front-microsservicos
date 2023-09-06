import { UserEntity } from 'src/user.entity';

const UserMock: UserEntity = {
  id: '123asd123asd',
  first_name: 'Jéssica Evelyn',
  last_name: 'Cecília Aparício',
  document: '32532681870',
  email: 'jessica.evelyn.aparicio@band.com',
  phone_number: '9535651263',
  birth_date: new Date('1990-01-01'),
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  password: '',
  setPassword: function (): void {
    throw new Error('Function not implemented.');
  },
  checkPassword: function () {
    throw new Error('Function not implemented.');
  },
};

export default UserMock;
