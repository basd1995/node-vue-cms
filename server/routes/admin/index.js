module.exports = app => {
  const express = require("express");
  const Category = require('../../models/Category');
  const Hero = require('../../models/Hero');
  const Item = require('../../models/Item');
  const Topic = require('../../models/Topic');
  const modelList = [Category, Hero, Item, Topic];
  const router = express.Router({
    mergeParams: true
  });

  //save
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  //update
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  //delete
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id);
    res.send(model);
  });

  //get list
  router.get('/', async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent';
    } else if (req.Model.modelName === 'Hero') {
      queryOptions.populate = 'categories';
    } else if (req.Model.modelName === 'Article') {
      queryOptions.populate = 'category';
    }
    const items = await req.Model.find().setOptions(queryOptions);
    res.send(items)
  });

  //get item by id
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model)
  });

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource);
    req.Model = require(`../../models/${modelName}`);
    next();
  }, router);

  const multer = require('multer');
  const upload = multer({ dest: __dirname + '/../../uploads' });
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  })

}