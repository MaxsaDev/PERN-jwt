const db = require("../db");
const ApiError = require("../error/ApiError");


class UserService {
  async getAll(){
    const sql = 'SELECT * FROM gjsm.mxuser.mxuser';
    const user = await db.query(sql);
    return user.rows;
  }
}

module.exports = new UserService();