const Project = require("../models/Project");

exports.getAll = async (req, res) =>
  res.json(await Project.find().sort({ createdAt: -1 }));

exports.getOne = async (req, res) =>
  res.json(await Project.findOne({ slug: req.params.slug }));

exports.create = async (req, res) => res.json(await Project.create(req.body));

exports.update = async (req, res) =>
  res.json(
    await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }),
  );

exports.remove = async (req, res) =>
  res.json(await Project.findByIdAndDelete(req.params.id));
