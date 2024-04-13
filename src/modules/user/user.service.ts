import User from '../../models/user.model';
import { MeshError } from '../../utils/error';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../../utils/jwt';
import { ValidateCustom } from '../../utils/validate-custom.';
import { AuthenticationDTO } from './dtos/authentication.dto';
import { RegistrationDTO } from './dtos/registration.dto';
import bcrypt from 'bcrypt';

export class UserService {
  async create(data: RegistrationDTO) {
    const password = bcrypt.hashSync(data.password, 5);

    const user = await User.create({ ...data, password });

    return user;
  }

  async authenticate(data: AuthenticationDTO) {
    await ValidateCustom(data, AuthenticationDTO);

    const { email, password } = data;

    const user = await User.findOne({ where: { email } });

    if (!bcrypt.compareSync(password, user.password)) {
      throw new MeshError('Invalid email or password', 403);
    }

    return { accessToken: generateAccessToken(user), refreshToken: generateRefreshToken(user) };
  }

  async refreshToken(token: string) {
    const { email, nickname, id, isAccessToken } = verifyToken(token);

    if (isAccessToken) throw new MeshError('Its not refresh token', 403);

    const user = { email, nickname, id, isAccessToken };

    return { accessToken: generateAccessToken(user), refreshToken: generateRefreshToken(user) };
  }
}
