module.exports = app => {
  const express = require("express");

  const router = express.Router();

  const categroy = require('../../models/Category');

  router.post('/categories', async (req, res) => {
    const model = await categroy.create(req.body);
    console.log(req.body);
    res.send(model);
  });

  app.use('/admin/api', router);
}