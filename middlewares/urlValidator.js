const HttpStatusCode = require('http-status-codes');
const joi = require('joi');
class urlValidator {
  constructor() {}


  static async validateUrl(req, res, next) {
    try {
        await joi
        .object({
          originalUrl: joi
          .string().uri().required(),

          urlId: joi
          .string().max(6),
        })
        .validateAsync(req.body);
        next();
      
    } catch (err) {
      res.status(HttpStatusCode.StatusCodes.EXPECTATION_FAILED).send(err.message);
    }
  }
}

module.exports = urlValidator;