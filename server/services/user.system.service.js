const db = require('../db');

class UserSystemService {

  async insertActivationLink(userId, activationLink){
    const sql = 'INSERT INTO gjsm.mxuser.mxuser_system (mxuser, activationlink) VALUES ($1, $2) RETURNING *';
    const user_system = await db.query(sql, [userId, activationLink]);
    return user_system;
  }

}

module.exports = new UserSystemService();