const proposalModel = require("./../models").proposal;

exports.createProposal = async (req, res, next) => {
  const { influencerProfileId, projectId } = req.body;

  if ((!influencerProfileId, !projectId))
    return res
      .status(401)
      .json({ status: "fail", message: "fields are missing" });

  try {
    const proposal = await proposalModel.create({
      influencerProfileId,
      projectId,
    });
    res.status(201).json(proposal.toJSON());
  } catch (err) {
    const error = new Error(err);
    error.status = "fail";
    error.statusCode = 404;
    next(err);
  }
};
