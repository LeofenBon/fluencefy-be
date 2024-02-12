const projectModal = require("./../models/index").project;

exports.createProject = async (req, res, next) => {
  const { brandProfileId, title, description, niche } = req.body;

  if (!brandProfileId || !title || !description)
    return res.status(401).json({
      status: "fail",
      message: "fields are required",
    });

  try {
    const project = await projectModal.create(req.body);
    res.status(201).json(project.toJSON());
  } catch (err) {
    const error = new Error(err);
    error.status = "fail";
    error.statusCode = 404;
    next(err);
  }
};
