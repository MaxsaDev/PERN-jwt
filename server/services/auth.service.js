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

    console.log('----------------');
    console.log('user', user.rows);
    console.log('user.id', user.rows[0].id);
    console.log('----------------');

    const userDto = new UserDto(user.rows[0]);
    const activationLink = uuid.v4();
    await userSystemService.insertActivationLink(userDto.id, activationLink);
    await mailService.sendActivationMail(email, activationLink);

    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    }

  }

  async login(){


  }

  async logout(){


  }

  async activate(){


  }

  async refresh(){


  }

  async check(){


  }

}

module.exports = new AuthService();