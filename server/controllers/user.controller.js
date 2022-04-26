const ApiError = require('../error/ApiError');
const userService = require('../services/user.service');

class UserController {
  async getAll(req, res, next){
    try {
      const users = await userService.getAll();
      return res.json(users);
    }catch(e){
        next(e);
    }
  }

  async getOne(req, res){
    try {

    }catch(e){
      console.log(e)
    }
  }

  async insert(req, res){
    try {

    }catch(e){
      console.log(e)
    }
  }

  async update(req, res){
    try {

    }catch(e){
      console.log(e)
    }
  }

  async delete(req, res){
    try {

    }catch(e){
      console.log(e)
    }
  }
}

module.exports = new UserController();