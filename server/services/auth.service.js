const ApiError = require("../error/ApiError");
const db = require('../db');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail.service');
const tokenService = require('./token.service');
const userSystemService = require('./user.system.service');
const UserDto = require('../dtos/user.dto');

class AuthService {

  async registration(email, password){
      let sql;
      sql = 'SELECT * FROM gjsm.mxuser.mxuser WHERE email = $1';
      const candidate = await db.query(sql, [email]);
    if (candidate.rowCount > 0){
      throw ApiError.forbidden(`Користувач з поштовою скринькою ${email} вже існує`);
    }
    const hashPassword = await bcrypt.hash(password, 7);
    sql = `INSERT INTO gjsm.mxuser.mxuser (email, password) VALUES ($1, $2) RETURNING *`;
    const user = await db.query(sql, [email, hashPassword]);
    const userDto = new UserDto(user.rows[0]);
    const activationLink = uuid.v4();
    await userSystemService.insertActivationLink(userDto.id, activationLink);
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    }

  }

  async login(email, password){

    let sql;
    sql = 'SELECT * FROM gjsm.mxuser.mxuser WHERE email = $1';
    const user = await db.query(sql, [email]);
    if (user.rowCount === 0){
      throw ApiError.forbidden(`Користувач з поштовою скринькою ${email} не знайдений`);
    }

    const isPassEquals = await bcrypt.compare(password, user.rows[0].password);
    if (!isPassEquals){
      throw ApiError.forbidden(`Логін або пароль не вірний`);
    }

    const userDto = new UserDto(user.rows[0]);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken){
    const token = await tokenService.removeToken(refreshToken)
    return token;
  }

  async activate(activateLink){
    let sql, result;

    sql = 'SELECT * FROM gjsm.mxuser.mxuser_system WHERE activationlink = $1';
    result = await db.query(sql, [activateLink]);
    if(result.rows.count === 0) {
      throw ApiError.forbidden('Некоректне посилання для активації');
    }

    sql = 'UPDATE gjsm.mxuser.mxuser_system SET is_activated = true WHERE mxuser = $1 RETURNING *';
    result = await db.query(sql, [result.rows[0].mxuser]);
    return {
      user: result.rows[0]
    }
  }

  async refresh(refreshToken){
    if(!refreshToken){
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const sql = 'SELECT * FROM gjsm.mxuser.mxuser WHERE id = $1';
    const user = await db.query(sql, [userData.id]);

    const userDto = new UserDto(user.rows[0]);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    }
  }

  async check(){


  }

}

module.exports = new AuthService();