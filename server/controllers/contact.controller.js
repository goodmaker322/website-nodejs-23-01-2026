const Contact = require("../models/Contact");

exports.submit = async (req, res) => res.json(await Contact.create(req.body));

exports.getAll = async (req, res) =>
  res.json(await Contact.find().sort({ createdAt: -1 }));
