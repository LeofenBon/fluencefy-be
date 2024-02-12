const models = require("./../models/index");

const { brand_profile, influencer_profile } = models;

exports.createBrand = async (req, res, next) => {
  const { brand_name, email, password } = req.body;

  if (!brand_name || !email || !password)
    return res.status(401).json({
      status: "fail",
      message: "fields are required",
    });

  try {
    const brand = await brand_profile.create({ brand_name, email, password });
    res.status(201).json(brand.toJSON());
  } catch (err) {
    const error = new Error(err);
    error.status = "fail";
    error.statusCode = 404;
    next(err);
  }
};

exports.createInfluencer = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password)
    return res.status(401).json({
      status: "fail",
      message: "fields are required",
    });
  try {
    const influencer = await influencer_profile.create({
      first_name,
      last_name,
      email,
      password,
    });
    res.status(201).json(influencer.toJSON());
  } catch (err) {
    const error = new Error(err);
    error.status = "fail";
    error.statusCode = 404;
    next(err);
  }
};
