const express = require('express');
const app = express();
const routers = require('./routers');


app.use(routers.shortUrlRouter);


app.use((req, res, next) => {
  res.send('404 NOT FOUND');
});

module.exports = app;