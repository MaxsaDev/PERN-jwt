const ApiError = require('../error/ApiError');
const authService = require('../services/auth.service')
const {validationResult} = require('express-validator');//функція для отримання результатів валідації запитів

class AuthController {

  async registration(req, res, next){
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return next(ApiError.badRequest('Помилка валідації', errors.array()));
      }
      const {email, password} = req.body;
      const authData = await authService.registration(email, password);
      res.cookie('refreshToken', authData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      //https
      //res.cookie('refreshToken', authData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true});
      return res.json(authData);
    }catch(e){
        next(e);
    }
  }

  async login(req, res, next){
    try {
      const { email, password } = req.body;
      const authData = await authService.login(email, password);
      res.cookie('refreshToken', authData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json(authData);
    }catch(e){
      next(e);
    }
  }

  async logout(req, res, next){
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    }catch(e){
      next(e);
    }
  }

  async activate(req, res, next){
    try {
      const activateLink = req.params.link;
      await authService.activate(activateLink);
      return res.redirect(process.env.CLIENT_URL);
    }catch(e){
      next(e);
    }
  }

  async refresh(req, res, next){
    try {
      const { refreshToken } = req.cookies;
      const authData = await authService.refresh(refreshToken);
      res.cookie('refreshToken', authData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json(authData);
    }catch(e){
      next(e);
    }
  }

  async check(req, res, next){
    try {

    }catch(e){
      next(e);
    }
  }

}

module.exports = new AuthController();