module.exports = app => {
  const express = require("express");

  const router = express.Router({
    mergeParams: true
  });

  //save
  router.post('/', async (req, res) => {
    console.log(req.body)
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
    const queryOptions = {}
    console.log(req.model.modelName)
    if (req.model.modelName === 'Category') {
      queryOptions.populate = 'parent';
    }
    const items = await req.model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  });

  //get item by id
  router.get('/:id', async (req, res) => {
    const model = await req.model.findById(req.params.id);
    res.send(model)
  });

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    console.log(req.params.resource)
    const modelName = require('inflection').classify(req.params.resource);
    req.model = require(`../../models/${modelName}`);
    next();
  }, router);
}