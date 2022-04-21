const ApiError = require('../error/ApiError');
const authService = require('../services/auth.service')

class AuthController {

  async registration(req, res, next){
    try {
      const {email, password} = req.body;
      const authData = await authService.registration(email, password);
      res.cookie('refreshToken', authData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      //https
      //res.cookie('refreshToken', authData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true});
      return res.json(authData);
    }catch(e){
        console.log(e)
    }
  }

  async login(req, res, next){
    try {

    }catch(e){
      console.log(e)
    }
  }

  async logout(req, res, next){
    try {

    }catch(e){
      console.log(e)
    }
  }

  async activate(req, res, next){
    try {

    }catch(e){
      console.log(e)
    }
  }

  async refresh(req, res, next){
    try {

    }catch(e){
      console.log(e)
    }
  }

  async check(req, res, next){
    const {id} = req.query;
    if(!id){
      return next(ApiError.badRequest('не заданий ID'));
    }
    res.json(id);
  }

}

module.exports = new AuthController();