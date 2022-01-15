const utils = require('../utils/insurance');

exports.post = (req, res) => {
  const riskProfile = utils.getRiskProfile(req.body);
  res.status(200).json(riskProfile);
};
