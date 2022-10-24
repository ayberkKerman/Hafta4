const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const HttpStatusCode = require('http-status-codes');
const { errorSender } = require('../utils');
const urlSaveTransaction = TransactionsFactory.creating('urlSaveTransaction')
const validators = require('../middlewares');
let url = require('../models/urls');
const urlValidator = validators.urlValidator;
const nanoid = require("nanoid");

router.post('/shortening',urlValidator.validateUrl ,async (req, res) => {
  try {
    
    if(req.body.urlId==undefined){
      const randomUrlId = nanoid.nanoid(6)
      req.body.urlId = randomUrlId;
    }
    
    url.shortUrl = await urlSaveTransaction.getNewUrl(req.body);

    if(url.shortUrl=="errorUrl"){
      throw errorSender.errorObject(
        HttpStatusCode.BAD_REQUEST,
        'Url önceden alınmış.'
      );
    }

    url.originalUrl = req.body.originalUrl;
    res.redirect('/'+ url.shortUrl);
    
  } catch (error) {
    res
    .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
    .send(error.message);
  }
});


router.get('/:shortUrl', (req,res) =>{

  if(url.shortUrl == null) return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR)
  res.redirect(url.originalUrl)
})

module.exports = router;