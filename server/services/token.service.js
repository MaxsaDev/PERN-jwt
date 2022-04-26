const jwt = require ('jsonwebtoken');
const db = require('../db');

class TokenService {

  generateTokens(payload){
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, refreshToken){
    let sql, token;
    sql = 'SELECT * FROM gjsm.mxuser.mxtoken WHERE mxuser = $1';
    token = await db.query(sql, [userId]);
    if (token.rowCount > 0) {
      sql = `UPDATE gjsm.mxuser.mxtoken SET refresh_token = $2 WHERE mxuser = $1  RETURNING *`;
    } else {
      sql = `INSERT INTO gjsm.mxuser.mxtoken (mxuser, refresh_token) VALUES ($1, $2)  RETURNING *`;
    }
    token = await db.query(sql, [userId, refreshToken]);
    return token;
  }

  async removeToken(refreshToken){
    const sql = 'DELETE FROM gjsm.mxuser.mxtoken WHERE refresh_token = $1 RETURNING *';
    const token = await db.query(sql, [refreshToken]);
    return token;
  }

  async findToken(refreshToken){
    const sql = 'SELECT * FROM gjsm.mxuser.mxtoken WHERE refresh_token = $1';
    const token = await db.query(sql, [refreshToken]);
    return token;
  }

  validateAccessToken(token){
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    }catch(e){
      return null;
    }
  }

  validateRefreshToken(token){
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    }catch(e){
      return null;
    }
  }

}

module.exports = new TokenService();