module.exports = app => {
  const express = require("express");

  const router = express.Router();

  //save
  router.post('/', async (req, res) => {
    const model = await req.model.create(req.body);
    res.send(model);
  });

  //update
  router.put('/:id', async (req, res) => {
    const model = await req.model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  //delete
  router.delete('/:id', async (req, res) => {
    const model = await req.model.findByIdAndDelete(req.params.id);
    res.send(model);
  });

  //get list
  router.get('/', async (req, res) => {
    const items = await req.model.find().limit(10)
    res.send(items)
  });

  //get item by id
  router.get('/:id', async (req, res) => {
    const model = await req.model.findById(req.params.id);
    res.send(model)
  });

  app.use('/admin/api/rest/:resource', async (req, res) => {
    const modelName = require('inflection').classify(req.params.resource);
    req.model = require(`../../models/${modelName}`)
  }, router);
}