const ApiError = require('../error/ApiError');

class DicController {

  async getAll(req, res){
    // try {
    //   const dic = req.params.dic;
    //   const result = await dicService.getAllRecordDic(dic);
    //   res.json(result.rows);
    // }catch(e){
    //   console.log('DicController, getAllRecordDic, error: ', e);
    // }
  }
}

module.exports = new DicController();