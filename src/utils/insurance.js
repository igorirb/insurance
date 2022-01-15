const _ = require('lodash');
const moment = require('moment');

const deductIfNumber = (object, parameter, number) => {
  if (_.isNumber(object[parameter])) {
    object[parameter] -= number;
  }
};

const addIfNumber = (object, parameter, number) => {
  if (_.isNumber(object[parameter])) {
    object[parameter] += number;
  }
};

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

  if (!income) {
    riskProfile.disability = 'ineligible';
  }
  if (!vehicle) {
    riskProfile.auto = 'ineligible';
  }
  if (!house) {
    riskProfile.home = 'ineligible';
  }

  if (age >= 60) {
    riskProfile.disability = 'ineligible';
  } else if (age <= 30) {
    deductIfNumber(riskProfile, 'auto', 2);
    deductIfNumber(riskProfile, 'disability', 2);
    deductIfNumber(riskProfile, 'home', 2);
    deductIfNumber(riskProfile, 'life', 2);
  } else if (age <= 40) {
    deductIfNumber(riskProfile, 'auto', 1);
    deductIfNumber(riskProfile, 'disability', 1);
    deductIfNumber(riskProfile, 'home', 1);
    deductIfNumber(riskProfile, 'life', 1);
  }

  if (income > 200000) {
    deductIfNumber(riskProfile, 'auto', 1);
    deductIfNumber(riskProfile, 'disability', 1);
    deductIfNumber(riskProfile, 'home', 1);
    deductIfNumber(riskProfile, 'life', 1);
  }

  if (house && house.ownership_status === 'mortgaged') {
    addIfNumber(riskProfile, 'disability', 1);
    addIfNumber(riskProfile, 'home', 1);
  }

  if (dependents > 0) {
    addIfNumber(riskProfile, 'disability', 1);
    addIfNumber(riskProfile, 'life', 1);
  }

  if (marital_status && marital_status === 'married') {
    deductIfNumber(riskProfile, 'disability', 1);
    addIfNumber(riskProfile, 'life', 1);
  }

  if (vehicle) {
    const { year } = vehicle;
    if (moment().year() - _.parseInt(year) <= 5) {
      addIfNumber(riskProfile, 'auto', 1);
    }
  }

  return processRiskProfile(riskProfile);
};

module.exports = {
  getRiskProfile,
  deductIfNumber,
  addIfNumber,
  processRiskProfile,
};
