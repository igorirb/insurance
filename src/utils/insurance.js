const _ = require('lodash');

const ruler = require('./ruler');

const utils = exports;

const processRiskProfile = (riskProfile) => {
  const result = {};
  _.forOwn(riskProfile, (value, key) => {
    if (value <= 0) {
      result[key] = 'economic';
    } else if (_.includes([1, 2], value)) {
      result[key] = 'regular';
    } else if (value >= 3) {
      result[key] = 'responsible';
    } else {
      result[key] = 'ineligible';
    }
  });
  return result;
};

const getRiskProfile = (args) => {
  const {
    age,
    dependents,
    house,
    income,
    marital_status,
    risk_questions,
    vehicle,
  } = args;

  const baseScore = _.sum(risk_questions);
  const riskProfile = {
    auto: baseScore,
    disability: baseScore,
    home: baseScore,
    life: baseScore,
  };

  ruler.applyIneligibilityRules(riskProfile, {
    income,
    vehicle,
    house,
  });
  ruler.applyAgeRules(riskProfile, age);
  ruler.applyIncomeRules(riskProfile, income);
  ruler.applyHouseRules(riskProfile, house);
  ruler.applyDependentsRules(riskProfile, dependents);
  ruler.applyMaritalStatusRules(riskProfile, marital_status);
  ruler.applyVehicleRules(riskProfile, vehicle);

  return utils.processRiskProfile(riskProfile);
};

Object.assign(exports, {
  getRiskProfile,
  processRiskProfile,
});
