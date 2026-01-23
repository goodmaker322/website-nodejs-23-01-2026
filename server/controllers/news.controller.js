const News = require("../models/News");

exports.getAll = async (req, res) =>
  res.json(await News.find().sort({ createdAt: -1 }));

exports.getOne = async (req, res) =>
  res.json(await News.findOne({ slug: req.params.slug }));

exports.create = async (req, res) => res.json(await News.create(req.body));

exports.update = async (req, res) =>
  res.json(
    await News.findByIdAndUpdate(req.params.id, req.body, { new: true }),
  );

exports.remove = async (req, res) =>
  res.json(await News.findByIdAndDelete(req.params.id));
