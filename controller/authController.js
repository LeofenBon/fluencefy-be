const models = require("./../models/index");
const jwt = require("jsonwebtoken");
const util = require("node:util");

const { brand_profile, influencer_profile } = models;

const signToken = (id, type) =>
  jwt.sign({ id, type }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });

exports.authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  let token;

  if (authorization && authorization.startsWith("bearer")) {
    token = authorization.split(" ")[1];
  }

  if (!token) {
    const error = new Error("You are not logged in");
    error.status = "fail";
    error.statusCode = 401;
    next(err);
  }

  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.SECRET_STR
  );

  const { id, type, iat } = decodedToken;

  const user =
    type === "influencer"
      ? await influencer_profile.findOne({ where: { id } })
      : await brand_profile.findOne({ where: { id } });

  if (!user) {
    const error = new Error("The user does not exists");
    error.status = "fail";
    error.statusCode = 404;
    return next(error);
  }

  // check if password has changed since this jwt is issued
  const passChanged = user.isPasswordChanged(iat);
  if (passChanged) {
    console.log("password changed");
    const error = new Error(
      "Password has been changed recently. Please login again"
    );
    error.statusCode = 401;
    error.status = "fail";
    return next(error);
  }

  console.log("pass", passChanged);

  req.user = user;

  next();
};

exports.createBrand = async (req, res, next) => {
  const { brand_name, email, password, password_changed_at } = req.body;

  if (!brand_name || !email || !password)
    return res.status(401).json({
      status: "fail",
      message: "fields are required",
    });

  try {
    // creating new user and removing password field from returned user object
    let brand = await brand_profile.create({
      brand_name,
      email,
      password,
      password_changed_at,
    });
    brand = brand.toJSON();
    delete brand.password;
    delete brand.password_changed_at;

    // create a jwt token for auth
    const token = signToken(brand.id, "brand");

    //sending response
    res.status(201).json({
      status: "success",
      token,
      data: { brand },
    });
  } catch (err) {
    const error = new Error(err);
    error.status = "fail";
    error.statusCode = 404;
    next(err);
  }
};

exports.createInfluencer = async (req, res, next) => {
  const { first_name, last_name, email, password, password_changed_at } =
    req.body;

  if (!first_name || !last_name || !email || !password)
    return res.status(401).json({
      status: "fail",
      message: "fields are required",
    });

  try {
    // creating new user and removing password field from returned user object
    let influencer = await influencer_profile.create({
      first_name,
      last_name,
      email,
      password,
      password_changed_at,
    });
    influencer = influencer.toJSON();
    delete influencer.password;
    delete influencer.password_changed_at;

    // create a jwt token for auth
    const token = signToken(influencer.id, "influencer");

    //sending response
    res.status(201).json({
      status: "success",
      token,
      data: { influencer },
    });
  } catch (err) {
    const error = new Error(err);
    error.status = "fail";
    error.statusCode = 404;
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password, isInfluencer } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ status: "fail", message: "Please provide email and password" });

  try {
    const user = isInfluencer
      ? await influencer_profile.findOne({ where: { email } })
      : await brand_profile.findOne({ where: { email } });

    // if the user does not exist or the password is incorrect
    if (!user || (await user.validatePassword(password))) {
      const error = new Error("Incorrect Email or password");
      error.status = "fail";
      error.statusCode = 404;
      return next(err);
    }

    // create a jwt token for auth
    const userType = isInfluencer ? "influencer" : "brand";
    const token = signToken(user.id, userType);

    //sending response
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    const error = new Error(err);
    error.status = "fail";
    error.statusCode = 404;
    next(err);
  }
};
